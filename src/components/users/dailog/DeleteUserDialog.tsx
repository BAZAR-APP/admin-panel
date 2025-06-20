import React from 'react'
import { Button, Dialog } from '@/components/ui'
import { User } from '@/@types/auth'
import AxiosBase from '@/services/axios/AxiosBase'
import toast from 'react-hot-toast'
import { extractErrorMessage } from '@/utils/helpers'

type DeleteUserDialogProps = {
    dialogIsOpen: boolean
    user: User | null
    fetchUsers: () => void
    onDialogClose: () => void
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
    dialogIsOpen,
    user,
    fetchUsers,
    onDialogClose,
}) => {
    const handleDelete = async () => {
        if (!user) return
        try {
            await AxiosBase.delete(`/users/${user?.id}`)
            toast.success('User deleted successfully')
            fetchUsers()
        } catch (error) {
            toast.error(extractErrorMessage(error))
        }
    }

    return (
        <Dialog
            closable={false}
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h3 className="text-center text-xl font-semibold">Delete User</h3>
            <p className="text-center text-sm text-neutral-600 my-4">
                Are you sure you want to delete{' '}
                <span className="font-semibold">{user?.fullName}</span>?
            </p>
            <div className="flex justify-center md:flex-nowrap flex-wrap gap-3 mt-5">
                <Button
                    onClick={onDialogClose}
                    className="w-full md:w-1/2"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-full md:w-1/2"
                    variant="solid"
                >
                    Confirm Delete
                </Button>
            </div>
        </Dialog>
    )
}

export default DeleteUserDialog
