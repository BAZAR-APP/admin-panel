import React from 'react'
import ManageChaletsItems from '@/components/shared/Chalets/ManageChaletsItems'

const ViewTypes = () => {
    return (
        <ManageChaletsItems
            endpoint="/viewTypes"
            ctaTitle="Create View Type"
            heading="View Type"
        />
    )
}

export default ViewTypes
