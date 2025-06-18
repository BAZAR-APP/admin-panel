import React from 'react'
import useSWR from 'swr'
import { Container, AdaptiveCard, DataTable } from '@/components/shared'
import { Button, Badge } from '@/components/ui'
import AxiosBase from '@/services/axios/AxiosBase'
import type { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

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

const fetcher = async (url: string) => {
    const res = await AxiosBase.get(url)
    return res.data
}

const getColumns = (
    onUpdate: (id: string) => void,
): ColumnDef<Customization>[] => [
    {
        header: 'TITLE',
        accessorKey: 'title',
        cell: ({ row }) => (
            <div className="font-medium text-gray-900 max-w-xs truncate">
                {row.original.title}
            </div>
        ),
    },
    {
        header: 'CATEGORY',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.customizationCategory.title}
            </div>
        ),
    },
    {
        header: 'COST/NIGHT',
        accessorKey: 'costPerNight',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.costPerNight} {row.original.costUnit}
            </div>
        ),
    },
    {
        header: '24HR NOTICE',
        cell: ({ row }) => (
            <Badge
                content={row.original.is24HourNotice ? 'Yes' : 'No'}
                className={`${
                    row.original.is24HourNotice
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                } px-2 py-1 rounded-md`}
            />
        ),
    },
    {
        id: 'action',
        header: 'ACTION',
        cell: ({ row }) => (
            <Button
                className="bg-error-subtle"
                onClick={() => onUpdate(row.original.id)}
            >
                Update
            </Button>
        ),
    },
]
const Customization = () => {
    const { data: customizations = [], isLoading } = useSWR<Customization[]>(
        '/customizations',
        fetcher,
    )
    const navigate = useNavigate()
    const handleUpdate = (id: string) => {
        console.log('Update customization with ID:', id)
    }

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex items-center justify-between mb-4">
                    <h3>Customization</h3>
                    <div className="flex gap-3">
                        <Button
                            onClick={() =>
                                navigate('/customization/create-category')
                            }
                        >
                            Create Customization Category
                        </Button>
                        <Button
                            onClick={() => navigate('/customization/create')}
                        >
                            Create Customization
                        </Button>
                    </div>
                </div>

                <DataTable<Customization>
                    columns={getColumns(handleUpdate)}
                    data={customizations}
                    loading={isLoading}
                    selectable={false}
                />
            </AdaptiveCard>
        </Container>
    )
}

export default Customization
