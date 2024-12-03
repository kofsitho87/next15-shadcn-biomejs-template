export type SeesionUserItemType = {
  id: number
  sid: string
  name: string
  role: string
}

export type SignType = {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: string
}

export type SignInResponseType = {
  me: {
    id: number
    sid: string
    name: string
    role: string
  }
  sign: SignType
} 