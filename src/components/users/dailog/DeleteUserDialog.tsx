import React from 'react'
import { Dialog } from '@/components/ui'
import { User } from '@/@types/auth'

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
            // Example API call
            await fetch(`/api/users/${user.userId}`, {
                method: 'DELETE',
            })

            // Refresh users list
            fetchUsers()

            // Close the dialog
            onDialogClose()
        } catch (error) {
            console.error('Failed to delete user:', error)
        }
    }

    return (
        <Dialog
            closable={false}
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h3 className="text-center text-lg font-semibold">Delete User</h3>
            <p className="text-center text-sm text-neutral-600 my-4">
                Are you sure you want to delete{' '}
                <span className="font-semibold">{user?.fullName}</span>?
            </p>
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={onDialogClose}
                    className="bg-gray-200 px-4 py-2 rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Confirm Delete
                </button>
            </div>
        </Dialog>
    )
}

export default DeleteUserDialog
