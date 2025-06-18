import {
    PiHouseLineDuotone,
    PiWrenchDuotone,
    PiBuildingsDuotone,
    PiUsersThreeDuotone,
    PiBookmarksSimpleDuotone,
    PiSealCheckDuotone,
    PiShoppingBagDuotone,
} from 'react-icons/pi'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    amentiy: <PiHouseLineDuotone />,
    customization: <PiWrenchDuotone />,
    chalets: <PiBuildingsDuotone />,
    viewtypes: <PiBookmarksSimpleDuotone />,
    badges: <PiSealCheckDuotone />,
    booking: <PiShoppingBagDuotone />,
    users: <PiUsersThreeDuotone />,
}

export default navigationIcon
