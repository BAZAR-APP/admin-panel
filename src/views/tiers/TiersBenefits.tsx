import React from 'react'
import useSWR from 'swr'
import { Container, AdaptiveCard, DataTable } from '@/components/shared'
import { Button, Badge } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import { fetcher } from '@/services/fetcher'
import { TierBenefit } from '@/@types/modules'
import { useNavigate } from 'react-router-dom'

const getColumns = (): ColumnDef<TierBenefit>[] => [
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
        header: 'ICON',
        accessorKey: 'iconURL',
        cell: ({ row }) => (
            <img
                src={row.original.iconURL}
                alt={row.original.title}
                className="h-10 w-10 object-contain"
            />
        ),
    },
    {
        header: 'PLATINUM',
        accessorKey: 'isPlatinum',
        cell: ({ row }) => (
            <Badge
                content={row.original.isPlatinum ? 'Yes' : 'No'}
                className={`${
                    row.original.isPlatinum
                        ? 'bg-green-100 text-primary-mild'
                        : 'bg-gray-100 text-gray-800'
                } px-2 py-1 rounded-md`}
            />
        ),
    },
    {
        header: 'GOLD',
        accessorKey: 'isGold',
        cell: ({ row }) => (
            <Badge
                content={row.original.isGold ? 'Yes' : 'No'}
                className={`${
                    row.original.isGold
                        ? 'bg-yellow-100 text-primary-deep'
                        : 'bg-gray-100 text-gray-800'
                } px-2 py-1 rounded-md`}
            />
        ),
    },
    {
        header: 'DIAMOND',
        accessorKey: 'isDiamond',
        cell: ({ row }) => (
            <Badge
                content={row.original.isDiamond ? 'Yes' : 'No'}
                className={`${
                    row.original.isDiamond
                        ? 'bg-blue-100 text-primary'
                        : 'bg-gray-100 text-gray-800'
                } px-2 py-1 rounded-md`}
            />
        ),
    },
]

const TiersBenefits = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useSWR('/tiers', fetcher)
    const tiers: TierBenefit[] = data?.data ?? []

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-primary">Tiers Benefits</h3>
                    <Button onClick={() => navigate('/tiers/create')}>
                        Create Tiers Benefit
                    </Button>
                </div>

                <DataTable<TierBenefit>
                    columns={getColumns()}
                    data={tiers}
                    loading={isLoading}
                    selectable={false}
                />
            </AdaptiveCard>
        </Container>
    )
}

export default TiersBenefits
