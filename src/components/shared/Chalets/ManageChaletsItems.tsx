import { DataTable } from '@/components/shared'
import CreateItemForm from '@/components/shared/CreateItemForm'
import Loading from '@/components/shared/Loading'
import { Button, Dialog } from '@/components/ui'
import AxiosBase from '@/services/axios/AxiosBase'
import useToggle from '@/utils/hooks/useToggle'
import { ColumnDef } from '@tanstack/react-table'
import { FC, useMemo, useCallback } from 'react'
import useSWR, { mutate } from 'swr'
import { AdaptiveCard, Container } from '@/components/shared'
type RowType = {
    id: string
    title: string
    titleInArabic: string
    hasCustomizedIcon: boolean
    iconTitle: string | null
    iconPhotoId: string
    status: string
    description?: string
    descriptionInArabic?: string
}

const fetcher = async (url: string) => {
    const res = await AxiosBase.get(url)
    return res?.data
}

const ManageChaletsItems: FC<{
    endpoint: string
    ctaTitle: string
    heading?: string
    isBadgeType?: boolean
}> = ({ endpoint, isBadgeType = false, ctaTitle, heading }) => {
    const { isOpen, toggle } = useToggle()
    const { data, isLoading, error } = useSWR(endpoint, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // Cache for 1 minute
    })

    const columns: ColumnDef<RowType>[] = useMemo(
        () => [
            {
                header: 'Title',
                accessorKey: 'title',
                cell: ({ row }: { row: { original: RowType } }) =>
                    row.original.title,
            },
            {
                header: 'Arabic Title',
                accessorKey: 'titleInArabic',
                cell: ({ row }: { row: { original: RowType } }) =>
                    row.original.titleInArabic || '-',
            },
            {
                header: 'Icon',
                accessorKey: 'iconPhotoId',
                cell: ({ row }: { row: { original: RowType } }) => (
                    <img
                        src={row.original.iconPhotoId}
                        alt={row.original.title}
                        className="w-10 h-10 rounded object-cover"
                        loading="lazy"
                    />
                ),
            },
            ...(isBadgeType
                ? [
                      {
                          header: 'Description',
                          accessorKey: 'description',
                          cell: ({ row }: { row: { original: RowType } }) =>
                              row.original.description,
                      },
                      {
                          header: 'Arabic Description',
                          accessorKey: 'descriptionInArabic',
                          cell: ({ row }: { row: { original: RowType } }) =>
                              row.original.descriptionInArabic || '-',
                      },
                  ]
                : []),
        ],
        [isBadgeType],
    )

    const handleCreateSuccess = useCallback(() => {
        mutate(endpoint)
        toggle()
    }, [endpoint, toggle])

    const handleCreateSuccessOnly = useCallback(() => {
        mutate(endpoint)
    }, [endpoint])

    const pagingData = useMemo(
        () => ({
            total: data?.length || 0,
            pageIndex: 1,
            pageSize: 10,
        }),
        [data?.length],
    )

    if (isLoading) {
        return <Loading loading={true} />
    }

    if (error) {
        return <div>Error loading data. Please try again.</div>
    }

    const hasData = data && Array.isArray(data) && data.length > 0

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <Dialog isOpen={isOpen} onClose={toggle}>
                        <CreateItemForm
                            endpoint={endpoint}
                            onSuccess={handleCreateSuccess}
                            isBadgeType={isBadgeType}
                        />
                    </Dialog>

                    {!hasData ? (
                        <CreateItemForm
                            endpoint={endpoint}
                            onSuccess={handleCreateSuccessOnly}
                        />
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h3>{heading}</h3>
                                <div className="flex gap-4">
                                    <Button size="md" onClick={toggle}>
                                        {ctaTitle}
                                    </Button>
                                </div>
                            </div>

                            <DataTable<RowType>
                                columns={columns}
                                data={data}
                                pagingData={pagingData}
                                selectable={false}
                            />
                        </>
                    )}
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default ManageChaletsItems
