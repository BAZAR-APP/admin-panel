import React, { useEffect, useState } from 'react'
import { Button, Dialog, Form, FormItem } from '@/components/ui'
import Input from '@/components/ui/Input'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, type ZodType } from 'zod'
import type { User } from '@/@types/auth'

type EditUserDialogProps = {
    dialogIsOpen: boolean
    user: User | null
    fetchUsers: () => void
    onDialogClose: () => void
}

type EditUserSchema = {
    fullName: string
    phoneNumber: string
}

const validationSchema: ZodType<EditUserSchema> = z.object({
    fullName: z
        .string({ required_error: 'Please enter your name' })
        .trim()
        .min(3, 'Name is too short'),
    phoneNumber: z
        .string({ required_error: 'Please enter your phone number' })
        .regex(/^\+?\d{10,15}$/, { message: 'Invalid phone number' }),
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
            phoneNumber: '',
        },
    })

    useEffect(() => {
        if (user) {
            reset({
                fullName: user.fullName || '',
                phoneNumber: user.phoneNumber || '',
            })
        }
    }, [user, reset])

    const onSubmit = async (values: EditUserSchema) => {
        try {
            setIsSubmitting(true)
            const response = await fetch(`/api/users/${user?.userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.fullName,
                    phoneNumber: values.phoneNumber,
                }),
            })

            if (!response.ok) {
                console.error('Failed to update user')
                return
            }

            fetchUsers()
            onDialogClose()
        } catch (error) {
            console.error('Error updating user:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} closable>
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
                    label="Phone"
                    invalid={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber?.message}
                >
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                autoComplete="tel"
                                prefix="+965"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <Button loading={isSubmitting} variant="solid" type="submit" className='w-full'> 
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </Form>
        </Dialog>
    )
}

export default EditUserDialog
