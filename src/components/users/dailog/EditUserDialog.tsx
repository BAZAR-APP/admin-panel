import React, { useEffect, useState } from 'react'
import { Button, Dialog, Form, FormItem } from '@/components/ui'
import Input from '@/components/ui/Input'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, type ZodType } from 'zod'
import AxiosBase from '@/services/axios/AxiosBase'
import { mutate } from 'swr'
import type { User } from '@/@types/auth'
import toast from 'react-hot-toast'
import { extractErrorMessage } from '@/utils/helpers'

type EditUserDialogProps = {
    dialogIsOpen: boolean
    user: User | null
    fetchUsers: () => void
    onDialogClose: () => void
}

type EditUserSchema = {
    fullName: string
    email: string
}

const validationSchema: ZodType<EditUserSchema> = z.object({
    fullName: z.string().trim().min(3, 'Name is too short'),
    email: z.string().email('Invalid email address'),
})

const EditUserDialog: React.FC<EditUserDialogProps> = ({
    dialogIsOpen,
    user,
    fetchUsers,
    onDialogClose,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EditUserSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            fullName: '',
            email: '',
        },
    })

    useEffect(() => {
        if (user?.id) {
            reset({
                fullName: user?.fullName || '',
                email: user?.email || '',
            })
        }
    }, [user])

    const onSubmit = async (values: EditUserSchema) => {
        try {
            setIsSubmitting(true)
            const response = await AxiosBase.patch(`/users/${user?.id}`, values)
            if (response.status !== 200) {
                toast.error('Failed to update user')
                return
            }
            mutate(`/users/${user?.id}`)
            fetchUsers()
            onDialogClose()
            toast.success('User updated successfully')
            reset()
        } catch (error) {
            toast.error(extractErrorMessage(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} closable>
            <h3 className="mb-1">Update</h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                <FormItem
                    label="Full Name"
                    invalid={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                >
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Full Name"
                                autoComplete="name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Email"
                    invalid={!!errors.email}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <Button
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                    className="w-full"
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </Form>
        </Dialog>
    )
}

export default EditUserDialog
