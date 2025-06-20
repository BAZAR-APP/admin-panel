import {
    PiHouseLineDuotone,
    PiWrenchDuotone,
    PiBuildingsDuotone,
    PiUsersThreeDuotone,
    PiBookmarksSimpleDuotone,
    PiSealCheckDuotone,
    PiShoppingBagDuotone,
    PiAcornDuotone,
} from 'react-icons/pi'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    amentiy: <PiHouseLineDuotone />,
    customization: <PiWrenchDuotone />,
    chalets: <PiBuildingsDuotone />,
    tiers: <PiAcornDuotone />,
    viewtypes: <PiBookmarksSimpleDuotone />,
    badges: <PiSealCheckDuotone />,
    booking: <PiShoppingBagDuotone />,
    users: <PiUsersThreeDuotone />,
}

export default navigationIcon
