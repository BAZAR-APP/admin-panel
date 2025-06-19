import React from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import { Container, AdaptiveCard, DataTable } from '@/components/shared'
import { Button, Badge } from '@/components/ui'
import AxiosBase from '@/services/axios/AxiosBase'
import type { ColumnDef } from '@tanstack/react-table'

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

const fetcher = async (url: string) => {
    const res = await AxiosBase.get(url)
    return res.data
}

const getColumns = (onUpdate: (id: string) => void): ColumnDef<Chalet>[] => [
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
        header: 'CITY',
        accessorKey: 'city',
        cell: ({ row }) => (
            <div className="text-gray-700">{row.original.city}</div>
        ),
    },
    {
        header: 'COST / NIGHT',
        accessorKey: 'perNightCost',
        cell: ({ row }) => (
            <div className="text-gray-700">{row.original.perNightCost} PKR</div>
        ),
    },
    {
        header: 'BEDS / BATHS',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.maxNoOfBeds} Beds / {row.original.noOfBaths} Baths
            </div>
        ),
    },
    {
        header: 'GUESTS',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.minNoOfGuests}–{row.original.maxNoOfGuests}
            </div>
        ),
    },
    {
        header: 'ENTIRE HOME',
        cell: ({ row }) => (
            <Badge
                content={row.original.isEntireHomeAvailabe ? 'Yes' : 'No'}
                className={`${
                    row.original.isEntireHomeAvailabe
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

const Chalets = () => {
    const navigate = useNavigate()
    const { data: chalets = [], isLoading } = useSWR<Chalet[]>(
        '/chalets',
        fetcher,
    )
    const handleUpdate = (id: string) => {
        navigate(`/chalet/${id}`)
    }

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex items-center justify-between mb-4">
                    <h3>Chalets</h3>
                    <Button onClick={() => navigate('/chalet/create')}>
                        Create Chalet
                    </Button>
                </div>

                <DataTable<Chalet>
                    columns={getColumns(handleUpdate)}
                    data={chalets}
                    loading={isLoading}
                    selectable={false}
                />
            </AdaptiveCard>
        </Container>
    )
}

export default Chalets
