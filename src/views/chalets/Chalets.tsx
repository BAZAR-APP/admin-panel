import React from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import { Container, AdaptiveCard, DataTable } from '@/components/shared'
import { Button, Badge, Dropdown } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import { fetcher } from '@/services/fetcher'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Chalet } from '@/@types/modules'

const getColumns = (
    onUpdate: (id: string) => void,
    onManageRooms: (id: string) => void,
    onChaletSubcription: (id: string) => void,
): ColumnDef<Chalet>[] => [
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
            <div>
                <div className="flex items-center cursor-pointer">
                    <Dropdown
                        placement="bottom-end"
                        renderTitle={<HiDotsHorizontal className="text-lg" />}
                    >
                        <Dropdown.Item
                            onClick={() => onUpdate(row.original.id)}
                        >
                            <span>Edit Chalets</span>
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => onManageRooms(row.original.id)}
                        >
                            <span>Manage Rooms</span>
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => onChaletSubcription(row.original.id)}
                        >
                            <span>Chalet Subscription</span>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
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
    const handleManageRooms = (id: string) => {
        navigate(`/chalet/rooms/${id}`)
    }
    const handleSubcription = (id: string) => {
        navigate(`/chalet/subcription/${id}`)
    }
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex items-center justify-between mb-4">
                    <h3 className='text-primary'>Chalets</h3>
                    <Button onClick={() => navigate('/chalet/create')}>
                        Create Chalet
                    </Button>
                </div>

                <DataTable<Chalet>
                    columns={getColumns(
                        handleUpdate,
                        handleManageRooms,
                        handleSubcription,
                    )}
                    data={chalets}
                    loading={isLoading}
                    selectable={false}
                />
            </AdaptiveCard>
        </Container>
    )
}

export default Chalets
