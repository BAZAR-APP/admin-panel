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
    id?: string
    fullName?: string
    email?: string | null
    phoneNumber?: string
    authProvider?: 'phone' | 'email' | string
    callingCode?: string
    countryCode?: string
    status?: 'active' | 'inactive' | string
    roles?: string[]
    avatar?: string
}

export type Token = {
    accessToken: string
    refreshToken: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}

export interface Customization {
    id: string
    title: string
    titleInArabic: string
    costUnit: string
    costUnitInArabic: string
    costPerNight: number
    costPerNightInArabic: string
    iconTitle: string
    iconPhotoId: string
    is24HourNotice: boolean
    customizationCategoryId: string
    customizationCategory: {
        id: string
        title: string
    }
    createdAt: string
    updatedAt: string
}
export interface Chalet {
    id: string
    title: string
    city: string
    latitude: number
    longitude: number
    perHourCost: number
    perNightCost: number
    maxNoOfBeds: number
    noOfBaths: number
    noOfBedrooms: number
    maxNoOfGuests: number
    minNoOfGuests: number
    isEntireHomeAvailabe: boolean
    amenities: string[]
    viewTypes: string[]
}
export interface Room {
    id: string
    title: string
    noOfKingBedrooms: string
    noOfSingleBedrooms: string
    noOfDoubleBedrooms: string
    chaletId: string
    createdAt: string
    updatedAt: string
}
