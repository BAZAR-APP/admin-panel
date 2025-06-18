import React from 'react'
import ManageChaletsItems from '@/components/shared/Chalets/ManageChaletsItems'

const Amenities = () => {
    return (
        <ManageChaletsItems
            endpoint="/amenity"
            ctaTitle="Create Ameneties"
            heading="Ameneties"
        />
    )
}

export default Amenities
