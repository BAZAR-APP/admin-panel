import React from 'react'
import ManageChaletsItems from '@/components/shared/Chalets/ManageChaletsItems'

const Badges = () => {
    return (
        <ManageChaletsItems
            endpoint="/badges"
            ctaTitle="Create Badges"
            isBadgeType
            heading="Badges"
        />
    )
}

export default Badges
