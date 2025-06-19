import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Form, FormItem } from '@/components/ui/form'
import AxiosBase from '@/services/axios/AxiosBase'
import { useNavigate } from 'react-router-dom'
import { extractErrorMessage } from '@/utils/helpers'

const categorySchema = z.object({
    title: z.string().min(1, 'Title is required'),
    titleInArabic: z.string().min(1, 'Arabic title is required'),
})

const defaultValues = {
    title: '',
    titleInArabic: '',
}

type CategoryFormSchema = z.infer<typeof categorySchema>

const CreateCustomizationCategory = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
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
            navigate('/customization')
        } catch (err) {
            toast.error(extractErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <h3 className="mb-5">Customization Category</h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                <FormItem
                    label="Title | العنوان"
                    invalid={!!errors.title}
                    errorMessage={errors.title?.message}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Enter category title"
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Title in Arabic | العنوان بالعربية"
                    invalid={!!errors.titleInArabic}
                    errorMessage={errors.titleInArabic?.message}
                >
                    <Controller
                        name="titleInArabic"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder="أدخل عنوان الفئة" />
                        )}
                    />
                </FormItem>

                <div className="flex justify-end pt-6">
                    <Button
                        type="submit"
                        disabled={!isValid || loading}
                        className="w-full"
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </Form>
        </Card>
    )
}

export default CreateCustomizationCategory
