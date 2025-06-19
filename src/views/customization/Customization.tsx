import React from 'react'
import useSWR from 'swr'
import { Container, AdaptiveCard, DataTable } from '@/components/shared'
import { Button, Badge } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import type { Customization } from '@/@types/auth'
import { fetcher } from '@/services/fetcher'
import useToggle from '@/utils/hooks/useToggle'
import CustomizationCategoryDialog from './components/CustomizationCategoryDialog'
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
    // {
    //     id: 'action',
    //     header: 'ACTION',
    //     cell: ({ row }) => (
    //         <Button
    //             className="bg-error-subtle"
    //             onClick={() => onUpdate(row.original.id)}
    //         >
    //             Edit
    //         </Button>
    //     ),
    // },
]
const Customization = () => {
    const { data: customizations = [], isLoading } = useSWR<Customization[]>(
        '/customizations',
        fetcher,
    )
    const navigate = useNavigate()
    const { isOpen, toggle } = useToggle(false)
    const handleUpdate = (id: string) => {
        navigate(`/customization/${id}`)
    }

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex items-center justify-between mb-6">
                    <h3>Customization</h3>
                    <div className="flex gap-3">
                        <Button onClick={toggle}>
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
                <CustomizationCategoryDialog
                    dialogIsOpen={isOpen}
                    onDialogClose={toggle}
                />
            </AdaptiveCard>
        </Container>
    )
}

export default Customization
