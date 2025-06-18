export type SignInCredential = {
    email?: string
    phoneNumber: string
    password: string
    callingCode: string
    countryCode: string
    authProvider: string
}

export type SignInResponse = {
    userId: string
    fullName: string
    accessToken: string
    refreshToken: string
}

export type SignUpResponse = {
    message: string
    userId: string
    accessToken: string
    refreshToken: string
    existing: boolean
}

export type SignUpCredential = {
    fullName: string
    email?: string
    phoneNumber: string
    callingCode?: string
    countryCode?: string
    password: string
    authProvider?: 'phone' | 'google' | 'apple'
    googleId?: string | null
    appleId?: string | null
}

export type ForgotPassword = {
    phoneNumber: string
}

export type ResetPassword = {
    password: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    userId?: string | null
    fullName?: string | null
    phoneNumber?: string | null
    email?: string | null
}

export type Token = {
    accessToken: string
    refreshToken: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
