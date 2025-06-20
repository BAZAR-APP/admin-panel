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

export type TierBenefit = {
    id: string
    title: string
    description: string
    iconURL: string
    isPlatinum: boolean
    isGold: boolean
    isDiamond: boolean
    platinumPointsPerKwd: number
    goldPointsPerKwd: number
    diamondPointsPerKwd: number
    platinumMinPoints: number
    platinumMaxPoints: number
    goldMinPoints: number
    goldMaxPoints: number
    diamondMinPoints: number
    diamondMaxPoints: number
}
