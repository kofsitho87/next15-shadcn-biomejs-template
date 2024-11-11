"use server"

import { createSession, deleteSession } from "@/lib/session"
import type { SignInResponseType } from "@/types/user"
import { redirect } from "next/navigation"
import * as z from "zod"

const SignInSchema = z.object({
  sid: z.string().min(1, { message: "아이디를 입력해주세요." }),
  password: z.string().min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
})

type SignInType = z.infer<typeof SignInSchema>

const signIn = async (formData: SignInType) => {
  const endpoint = `${process.env.NEXT_PUBLIC_ADMIN_API_HOST}/v1/admins/sign-in`

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      sid: formData.sid,
      password: formData.password,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  if (data.success === false) {
    throw new Error(data.code)
  }

  return data.data
}

export async function signInAction(prevState: any, formData: FormData) {
  // TODO: 1. 유효성 검사
  const validationResult = SignInSchema.safeParse(Object.fromEntries(formData))
  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors }
  }

  const { sid, password } = validationResult.data

  // TODO: 2. 로그인 처리
  try {
    const signInResponse = await signIn({ sid, password })
    const seesionUserData = {
      id: signInResponse.me.id,
      sid: signInResponse.me.sid,
      name: signInResponse.me.name,
      role: signInResponse.me.role,
    }

    // TODO: 3. 세션 생성
    await createSession(seesionUserData, signInResponse.sign)
  } catch (error: any) {
    return {
      errors: {
        sid: ["아이디 또는 비밀번호를 확인해주세요."],
      },
    }
  }

  // TODO: 4. 리다이렉트
  redirect("/dashboard")
}

export async function signOutAction() {
  await deleteSession()
}

export async function refreshToken(sign: { accessToken: string; refreshToken: string }) {
  const endpoint = `${process.env.NEXT_PUBLIC_ADMIN_API_HOST}/v1/admins/sign/refresh`
  const response = await fetch(endpoint, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({
      accessToken: sign.accessToken,
      refreshToken: sign.refreshToken,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  if (data.success === false) {
    return null
  }

  return data.data as SignInResponseType
}
