import "server-only"

import { type JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { SignType, SeesionUserItemType } from "@/types/user"
import type { NextResponse } from "next/server"
import { refreshToken } from "@/app/auth/actions"
import { redirect } from "next/navigation"

type SessionPayload = {
  user: SeesionUserItemType
  sign: SignType
  expiresAt: Date
}

type DecryptedSession = JWTPayload & SessionPayload

const secretKey = process.env.AUTH_SECRET
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1hr").sign(key)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    })
    return payload as DecryptedSession
  } catch (error) {
    return null
  }
}

export async function createSession(user: SeesionUserItemType, sign: SignType) {
  const expiresAt = new Date(sign.accessTokenExpiresIn)
  expiresAt.setDate(expiresAt.getDate() + 1)
  const sessionValue = await encrypt({
    user,
    sign,
    expiresAt,
  })

  const cookieStore = await cookies()
  cookieStore.set("session", sessionValue, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function verifySession(nextResponse: NextResponse) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get("session")
  const session = await decrypt(cookie?.value)

  if (!session) {
    return { isAuth: false, user: null }
  }

  if (session) {
    const now = new Date()
    const tokenExpiresAt = new Date(session.sign.accessTokenExpiresIn)
    const isTokenExpired = now.getTime() >= tokenExpiresAt.getTime()

    // console.log('isTokenExpired', isTokenExpired);
    // console.log(now, tokenExpiresAt);

    if (isTokenExpired) {
      //refresh token
      const signinResponse = await refreshToken({
        accessToken: session.sign.accessToken,
        refreshToken: session.sign.refreshToken,
      })
      if (!signinResponse) {
        return { isAuth: false, user: null }
      }
      await updateSession(nextResponse, signinResponse.sign)
    }
  }

  return { isAuth: true, user: session.user }
}

export async function updateSession(nextResponse: NextResponse, sign: SignType) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get("session")
  const session = await decrypt(cookie?.value)

  if (!session) {
    return null
  }

  const expiresAt = new Date(sign.accessTokenExpiresIn)
  expiresAt.setDate(expiresAt.getDate() + 1)

  const newSession = await encrypt({
    user: session.user,
    sign,
    expiresAt,
  })

  nextResponse.cookies.set("session", newSession, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get("session")
  const session = await decrypt(cookie?.value)
  return session
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/auth")
}
