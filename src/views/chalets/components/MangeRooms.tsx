import React from 'react'
import useSWR from 'swr'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, AdaptiveCard, DataTable } from '@/components/shared'
import { Button } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import { fetcher } from '@/services/fetcher'
import { Room } from '@/@types/auth'

const getColumns = (): ColumnDef<Room>[] => [
    {
        header: 'TITLE',
        accessorKey: 'title',
        cell: ({ row }) => (
            <div className="font-medium text-gray-900">
                {row.original.title}
            </div>
        ),
    },
    {
        header: 'KING BEDROOMS',
        accessorKey: 'noOfKingBedrooms',
        cell: ({ row }) => (
            <div className="text-gray-700">{row.original.noOfKingBedrooms}</div>
        ),
    },
    {
        header: 'SINGLE BEDROOMS',
        accessorKey: 'noOfSingleBedrooms',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.noOfSingleBedrooms}
            </div>
        ),
    },
    {
        header: 'DOUBLE BEDROOMS',
        accessorKey: 'noOfDoubleBedrooms',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.noOfDoubleBedrooms}
            </div>
        ),
    },
]

const MangeRooms = () => {
    const navigate = useNavigate()
    const { chaletId } = useParams<{ chaletId: string }>()
    const { data, isLoading } = useSWR<{ data: Room[] }>(
        `/chaletRoom/readByChaletId/${chaletId}`,
        fetcher,
    )

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex items-center justify-between mb-4">
                    <h3>Manage Rooms</h3>
                    <Button
                        onClick={() =>
                            navigate(`/chalet/rooms/add/${chaletId}`)
                        }
                    >
                        Add Room
                    </Button>
                </div>

                <DataTable<Room>
                    columns={getColumns()}
                    data={data?.data ?? []}
                    loading={isLoading}
                    selectable={false}
                />
            </AdaptiveCard>
        </Container>
    )
}

export default MangeRooms
