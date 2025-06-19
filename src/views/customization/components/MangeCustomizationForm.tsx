import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Form, FormItem } from '@/components/ui/Form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import AxiosBase from '@/services/axios/AxiosBase'
import { extractErrorMessage } from '@/utils/helpers'

const customizationSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    titleInArabic: z.string().min(1, 'Arabic title is required'),
    costUnit: z.string().min(1, 'Cost unit is required'),
    costUnitInArabic: z.string().min(1, 'Arabic cost unit is required'),
    costPerNight: z.number().min(0, 'Cost per night must be positive'),
    costPerNightInArabic: z.string(),
    iconTitle: z.string().min(1, 'Icon title is required'),
    iconPhotoId: z.string().min(1, 'Icon photo ID is required'),
    is24HourNotice: z.boolean(),
    customizationCategoryId: z.string().min(1, 'Category is required'),
})

const defaultValues = {
    title: '',
    titleInArabic: '',
    costUnit: '',
    costUnitInArabic: '',
    costPerNight: 0,
    costPerNightInArabic: '',
    iconTitle: '',
    iconPhotoId: '',
    is24HourNotice: false,
    customizationCategoryId: '',
}

type CustomizationFormSchema = z.infer<typeof customizationSchema>

const ManageCustomizationForm = () => {
    const [loading, setLoading] = useState(false)
    const { customizationId } = useParams() as { customizationId: string }

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<CustomizationFormSchema>({
        resolver: zodResolver(customizationSchema),
        defaultValues,
        mode: 'onChange',
    })

    const onSubmit = async (data: CustomizationFormSchema) => {
        try {
            setLoading(true)
            console.log('Submitting customization data:', data)
            await AxiosBase.post('/customizations', data)
            toast.success('Customization created successfully')
            reset()
        } catch (err) {
            toast.error(extractErrorMessage(err))
        }
    }

    const renderField = (
        name: keyof CustomizationFormSchema,
        label: string,
        type: string = 'text',
        placeholder?: string,
    ) => (
        <div className="w-full lg:w-1/3 xl:w-1/6">
            <FormItem
                label={label}
                invalid={!!errors[name]}
                errorMessage={errors[name]?.message}
            >
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            value={field.value as string | number}
                            onChange={(e) => {
                                const val =
                                    type === 'number'
                                        ? parseFloat(e.target.value) || 0
                                        : e.target.value
                                field.onChange(val)
                            }}
                        />
                    )}
                />
            </FormItem>
        </div>
    )

    return (
        <Card>
            <h3 className="mb-5">
                {customizationId ? ' Update ' : 'Create '}Customization
            </h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center justify-around flex-wrap gap-6 px-5">
                    {renderField(
                        'title',
                        'Title | العنوان',
                        'text',
                        'Enter customization title',
                    )}
                    {renderField(
                        'titleInArabic',
                        'Title in Arabic',
                        'text',
                        'أدخل العنوان بالعربية',
                    )}
                    {renderField(
                        'iconTitle',
                        'Icon Title | عنوان الأيقونة',
                        'text',
                        'Enter icon title',
                    )}
                    {renderField(
                        'iconPhotoId',
                        'Icon Photo ID | معرف صورة الأيقونة',
                        'text',
                        'Enter icon photo ID',
                    )}

                    {renderField(
                        'costUnit',
                        'Cost Unit | وحدة التكلفة',
                        'text',
                        'e.g., per item, per hour',
                    )}
                    {renderField(
                        'costUnitInArabic',
                        'Cost Unit in Arabic',
                        'text',
                        'مثال: لكل قطعة، في الساعة',
                    )}
                    {renderField(
                        'costPerNight',
                        'Cost Per Night | التكلفة لكل ليلة',
                        'number',
                        '0',
                    )}
                    {renderField(
                        'costPerNightInArabic',
                        'Cost Per Night in Arabic',
                        'text',
                        'التكلفة بالعربية',
                    )}
                </div>

                {/* Category & Options */}

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

export default ManageCustomizationForm
