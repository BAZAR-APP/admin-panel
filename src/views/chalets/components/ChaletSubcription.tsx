import React from 'react'
import useSWR from 'swr'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, AdaptiveCard, DataTable } from '@/components/shared'
import { Button, Badge } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import { fetcher } from '@/services/fetcher'

export interface ChaletSubscription {
    id: string
    title: string
    durationUnit: string
    durationValue: string
    type: string
    price: string
    priceUnit: string
    minimumTime: string
    minimumTimeUnit: string
    specialTags: string
    forMembersOnly: boolean
    isSplitPaymentAvailable: boolean
    chaletId: string
    createdAt: string
    updatedAt: string
}

const getColumns = (): ColumnDef<ChaletSubscription>[] => [
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
        header: 'DURATION',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.durationValue} {row.original.durationUnit}
            </div>
        ),
    },
    {
        header: 'TYPE',
        accessorKey: 'type',
        cell: ({ row }) => (
            <div className="text-gray-700 capitalize">{row.original.type}</div>
        ),
    },
    {
        header: 'PRICE',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.price} {row.original.priceUnit}
            </div>
        ),
    },
    {
        header: 'MINIMUM TIME',
        cell: ({ row }) => (
            <div className="text-gray-700">
                {row.original.minimumTime} {row.original.minimumTimeUnit}
            </div>
        ),
    },
    {
        header: 'SPECIAL TAGS',
        accessorKey: 'specialTags',
        cell: ({ row }) => (
            <div className="text-gray-700">{row.original.specialTags}</div>
        ),
    },
    {
        header: 'FOR MEMBERS ONLY',
        cell: ({ row }) => (
            <Badge
                content={row.original.forMembersOnly ? 'Yes' : 'No'}
                className={`${
                    row.original.forMembersOnly
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                } px-2 py-1 rounded-md`}
            />
        ),
    },
    {
        header: 'SPLIT PAYMENT',
        cell: ({ row }) => (
            <Badge
                content={row.original.isSplitPaymentAvailable ? 'Yes' : 'No'}
                className={`${
                    row.original.isSplitPaymentAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                } px-2 py-1 rounded-md`}
            />
        ),
    },
]

const ChaletSubscription = () => {
    const navigate = useNavigate()
    const { chaletId } = useParams<{ chaletId: string }>()

    const { data, isLoading } = useSWR<{ data: ChaletSubscription[] }>(
        `/chaletSubscription/readByChaletId/${chaletId}`,
        fetcher,
    )

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex items-center justify-between mb-4">
                    <h3>Chalet Subscriptions</h3>
                    <Button
                        onClick={() =>
                            navigate(`/chalet/subcription/add/${chaletId}`)
                        }
                    >
                        Add Subscription
                    </Button>
                </div>

                <DataTable<ChaletSubscription>
                    columns={getColumns()}
                    data={data?.data ?? []}
                    loading={isLoading}
                    selectable={false}
                />
            </AdaptiveCard>
        </Container>
    )
}

export default ChaletSubscription
