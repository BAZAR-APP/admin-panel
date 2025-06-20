import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Form, FormItem } from '@/components/ui/Form'
import AxiosBase from '@/services/axios/AxiosBase'
import { extractErrorMessage } from '@/utils/helpers'
import { Dialog } from '@/components/ui'

const categorySchema = z.object({
    title: z.string().min(1, 'Title is required'),
    titleInArabic: z.string().min(1, 'Arabic title is required'),
})

const defaultValues = {
    title: '',
    titleInArabic: '',
}
interface CreateCustomizationCategoryProps {
    dialogIsOpen: boolean
    onDialogClose: () => void
}
type CategoryFormSchema = z.infer<typeof categorySchema>

const CustomizationCategoryDialog = ({
    dialogIsOpen,
    onDialogClose,
}: CreateCustomizationCategoryProps) => {
    const [loading, setLoading] = useState(false)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<CategoryFormSchema>({
        resolver: zodResolver(categorySchema),
        defaultValues,
        mode: 'onChange',
    })

    const onSubmit = async (data: CategoryFormSchema) => {
        try {
            setLoading(true)
            await AxiosBase.post('/customizationCategory', data)
            toast.success('Category created successfully')
            reset()
            onDialogClose()
        } catch (err) {
            toast.error(extractErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog isOpen={dialogIsOpen} onClose={onDialogClose}>
            <h3 className="mb-1">Customization Category</h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <FormItem
                    label="Title"
                    invalid={!!errors.title}
                    errorMessage={errors.title?.message}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Enter title"
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="العنوان"
                    invalid={!!errors.titleInArabic}
                    errorMessage={errors.titleInArabic?.message}
                >
                    <Controller
                        name="titleInArabic"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder="أدخل عنوان " />
                        )}
                    />
                </FormItem>

                <Button
                    type="submit"
                    disabled={!isValid || loading}
                    className="w-full"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </Dialog>
    )
}

export default CustomizationCategoryDialog
