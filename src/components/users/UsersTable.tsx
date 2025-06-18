import React, { useCallback, useMemo, useState } from 'react'
import useSWR, { mutate } from 'swr'
import type { ColumnDef } from '@tanstack/react-table'
import Button from '@/components/ui/Button'
import { Dropdown } from '@/components/ui/Dropdown'
import { HiDotsHorizontal } from 'react-icons/hi'
import { BiEditAlt, BiTrash } from 'react-icons/bi'
import DeleteUserDialog from './dailog/DeleteUserDialog'
import { Badge } from '../ui'
import useToggle from '@/utils/hooks/useToggle'
import { DataTable } from '../shared'
import Loading from '@/components/shared/Loading'
import AxiosBase from '@/services/axios/AxiosBase'
import EditUserDialog from './dailog/EditUserDialog'
import { User } from '@/@types/auth'

interface UsersTableProps {
    onUserUpdated: () => void
}

const getColumns = (
    onEditClick: (user: User) => void,
    onDeleteClick: (user: User) => void,
): ColumnDef<User>[] => [
    {
        header: 'NAME',
        accessorKey: 'fullName',
        cell: ({ row }) => (
            <div className="text-gray-900 font-semibold capitalize max-w-xs truncate">
                {row.original.fullName || 'N/A'}
            </div>
        ),
    },
    {
        header: 'EMAIL',
        accessorKey: 'email',
        cell: ({ row }) => (
            <div className="text-gray-700 max-w-xs truncate">
                {row.original.email || 'N/A'}
            </div>
        ),
    },
    {
        header: 'PHONE',
        accessorKey: 'phone',
        cell: ({ row }) => (
            <div className="text-gray-700 max-w-xs truncate">
                {row.original.callingCode}
                {row.original.phoneNumber || 'N/A'}
            </div>
        ),
    },
    {
        header: 'ROLE',
        accessorKey: 'role.name',
        cell: ({ row }) => (
            <div className="text-gray-700 max-w-xs truncate capitalize">
                {row.original.roles?.join(', ') || 'N/A'}
            </div>
        ),
    },
    {
        header: 'STATUS',
        accessorKey: 'status',
        cell: ({ row }) => (
            <div className="w-full min-w-[70px]">
                <Badge
                    content={row.original.status || 'N/A'}
                    className="bg-green-100 text-gray-900 px-2 py-1 capitalize rounded-md"
                />
            </div>
        ),
    },
    {
        id: 'action',
        header: 'ACTION',
        cell: ({ row }) => (
            <div className="flex items-center cursor-pointer">
                <Dropdown
                    placement="bottom-end"
                    renderTitle={<HiDotsHorizontal className="text-lg" />}
                >
                    <Dropdown.Item onClick={() => onEditClick(row.original)}>
                        <Button
                            icon={<BiEditAlt className="text-lg" />}
                            variant="plain"
                            className="text-primary hover:text-blue-700 font-semibold"
                        >
                            <span className="pl-3">Edit</span>
                        </Button>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onDeleteClick(row.original)}>
                        <Button
                            icon={<BiTrash />}
                            variant="plain"
                            className="text-error hover:text-error font-semibold"
                        >
                            <span className="pl-3">Delete</span>
                        </Button>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        ),
    },
]
const fetcher = async (url: string) => {
    const res = await AxiosBase.get(url)
    return res.data
}

const UsersTable: React.FC<UsersTableProps> = ({ onUserUpdated }) => {
    const { data, error, isLoading } = useSWR('/users', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000,
    })

    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const { isOpen: isDeleteOpen, toggle: toggleDeleteDialog } =
        useToggle(false)
    const { isOpen: isEditOpen, toggle: toggleEditDialog } = useToggle(false)
    const { isOpen: isUpdateOpen, toggle: toggleUpdateDialog } =
        useToggle(false)

    const handleEditUser = useCallback(
        (user: User) => {
            setSelectedUser(user)
            toggleEditDialog()
        },
        [toggleEditDialog],
    )

    const handleDeleteUser = useCallback(
        (user: User) => {
            setSelectedUser(user)
            toggleDeleteDialog()
        },
        [toggleDeleteDialog],
    )

    const handleUpdateUser = useCallback(
        (user: User) => {
            setSelectedUser(user)
            toggleUpdateDialog()
        },
        [toggleUpdateDialog],
    )

    const handleUserDeleted = useCallback(() => {
        mutate('/users')
        onUserUpdated()
        toggleDeleteDialog()
    }, [onUserUpdated, toggleDeleteDialog])

    const pagingData = useMemo(
        () => ({
            total: data?.users?.length || 0,
            pageIndex: 1,
            pageSize: 10,
        }),
        [data?.users?.length],
    )

    if (isLoading) {
        return <Loading loading={true} />
    }

    if (error) {
        return (
            <div className="text-center">
                Error loading data. Please try again.
            </div>
        )
    }

    const users: User[] = data?.users || []

    return (
        <div className="w-full">
            <DataTable<User>
                columns={getColumns(handleEditUser, handleDeleteUser)}
                data={users}
                pagingData={pagingData}
                selectable={false}
            />

            <DeleteUserDialog
                dialogIsOpen={isDeleteOpen}
                user={selectedUser}
                fetchUsers={handleUserDeleted}
                onDialogClose={toggleDeleteDialog}
            />

            <EditUserDialog
                dialogIsOpen={isEditOpen}
                user={selectedUser}
                fetchUsers={() => mutate('/users')}
                onDialogClose={toggleEditDialog}
            />
        </div>
    )
}

export default UsersTable
