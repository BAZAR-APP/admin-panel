// types/user.ts
export interface User {
    id: string
    fullName: string
    email: string
    phoneNumber: string
    callingCode: string
    countryCode: string
    isPhoneNumberVerified: boolean
    roles: string[]
    authProvider: string[]
    status: string
    createdAt: string
    updatedAt: string
}

export interface GetUserListResponse {
    users: User[]
    total: number
    page: number
    limit: number
}
