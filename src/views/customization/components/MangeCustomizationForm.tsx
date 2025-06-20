import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Form, FormItem } from '@/components/ui/Form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosBase from '@/services/axios/AxiosBase'
import { extractErrorMessage } from '@/utils/helpers'
import CategoryDropdown from '../CategoryDropdown'
import { Checkbox } from '@/components/ui'

const customizationSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    titleInArabic: z.string().min(1, 'Arabic title is required'),
    costUnit: z.string().min(1, 'Cost unit is required'),
    costUnitInArabic: z.string().min(1, 'Arabic cost unit is required'),
    costPerNight: z.number().min(0, 'Cost per night must be positive'),
    costPerNightInArabic: z.string(),
    hasCustomizedIcon: z.boolean().optional(),
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
    iconPhotoId: '',
    is24HourNotice: false,
    hasCustomizedIcon: true,
    customizationCategoryId: '',
}

type CustomizationFormSchema = z.infer<typeof customizationSchema>

const ManageCustomizationForm = () => {
    const [loading, setLoading] = useState(false)
    const { customizationId } = useParams<{ customizationId: string }>()
    const navigate = useNavigate()

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
            await AxiosBase.post('/customizations', data)
            toast.success('Customization created successfully')
            navigate('/customization')
            reset()
        } catch (err) {
            toast.error(extractErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const renderField = (
        name: keyof CustomizationFormSchema,
        label: string,
        type: string = 'text',
        placeholder?: string,
    ) => (
        <div className="w-full">
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
            <h3 className="mb-5 px-5 text-primary">
                {customizationId ? 'Update' : 'Create'} Customization
            </h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 px-5">
                    {renderField(
                        'title',
                        'Title',
                        'text',
                        'Enter title',
                    )}
                    {renderField(
                        'titleInArabic',
                        'العنوان',
                        'text',
                        'أدخل العنوان ',
                    )}
                    <CategoryDropdown
                        control={control}
                        errors={errors}
                        name="customizationCategoryId"
                    />
                    {renderField(
                        'iconPhotoId',
                        'Icon Photo ID | معرف صورة الأيقونة',
                        'text',
                        'Enter icon photo ID',
                    )}

                    {renderField(
                        'costUnit',
                        'Cost Unit',
                        'text',
                        'e.g., per item, per hour',
                    )}
                    {renderField(
                        'costUnitInArabic',
                        'وحدة التكلفة',
                        'text',
                        'مثال: لكل قطعة، في الساعة',
                    )}
                    {renderField(
                        'costPerNight',
                        'Cost Per Night',
                        'number',
                        '0',
                    )}
                    {renderField(
                        'costPerNightInArabic',
                        'التكلفة لكل ليلة',
                        'text',
                        'التكلفة بالعربية',
                    )}

                    <div className="flex xl:flex-nowrap flex-wrap gap-5 items-center md:mt-6">
                        <FormItem>
                            <Controller
                                name="is24HourNotice"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        checked={field.value}
                                        onChange={field.onChange}
                                    >
                                        <span className="mt-[1px]">
                                            Is 24 Hour Notice
                                        </span>
                                    </Checkbox>
                                )}
                            />
                        </FormItem>
                        <FormItem>
                            <Controller
                                name="hasCustomizedIcon"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        checked={field.value}
                                        onChange={(checked: boolean) =>
                                            field.onChange(checked)
                                        }
                                    >
                                        <span className="mt-[1px]">
                                            Has Customized Icon
                                        </span>
                                    </Checkbox>
                                )}
                            />
                        </FormItem>
                    </div>
                </div>

                <div className="flex justify-end pt-6 px-5">
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
