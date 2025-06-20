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
import { Checkbox } from '@/components/ui'

const subscriptionSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    titleInArabic: z.string().min(1, 'Arabic title is required'),
    durationUnit: z.string().min(1),
    durationUnitInArabic: z.string().min(1),
    durationValue: z.string().min(1),
    durationVallueInArabic: z.string().min(1),
    type: z.string().min(1),
    typeInArabic: z.string().min(1),
    price: z.string().min(1),
    priceInArabic: z.string().min(1),
    priceUnit: z.string().min(1),
    priceUnitInArabic: z.string().min(1),
    minimumTime: z.string().min(1),
    minimumTimeInArabic: z.string().min(1),
    minimumTimeUnit: z.string().min(1),
    minimumTimeUnitInArabic: z.string().min(1),
    specialTags: z.string().min(1),
    specialTagsInArabic: z.string().min(1),
    forMembersOnly: z.boolean().optional(),
    isSplitPaymentAvailable: z.boolean().optional(),
    chaletId: z.string().min(1),
})

const defaultValues = {
    title: '',
    titleInArabic: '',
    durationUnit: '',
    durationUnitInArabic: '',
    durationValue: '',
    durationVallueInArabic: '',
    type: '',
    typeInArabic: '',
    price: '',
    priceInArabic: '',
    priceUnit: '',
    priceUnitInArabic: '',
    minimumTime: '',
    minimumTimeInArabic: '',
    minimumTimeUnit: '',
    minimumTimeUnitInArabic: '',
    specialTags: '',
    specialTagsInArabic: '',
    forMembersOnly: false,
    isSplitPaymentAvailable: false,
    chaletId: '',
}

type SubscriptionFormSchema = z.infer<typeof subscriptionSchema>

const ChaletSubscriptionForm = () => {
    const [loading, setLoading] = useState(false)
    const { chaletId } = useParams<{ chaletId: string }>()
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<SubscriptionFormSchema>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: { ...defaultValues, chaletId: chaletId ?? '' },
        mode: 'onChange',
    })

    const onSubmit = async (data: SubscriptionFormSchema) => {
        try {
            setLoading(true)
            await AxiosBase.post('/chaletSubscription', data)
            toast.success('Subscription created successfully')
            navigate(-1)
            reset()
        } catch (err) {
            toast.error(extractErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const renderField = (
        name: keyof SubscriptionFormSchema,
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
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    )}
                />
            </FormItem>
        </div>
    )

    return (
        <Card>
            <h3 className="mb-5 px-5">Add Subscription</h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5">
                    {renderField('title', 'Title', 'text', 'Enter title')}
                    {renderField(
                        'titleInArabic',
                        'العنوان',
                        'text',
                        'أدخل العنوان',
                    )}

                    {renderField(
                        'durationUnit',
                        'Duration Unit',
                        'text',
                        'Enter duration unit',
                    )}
                    {renderField(
                        'durationUnitInArabic',
                        'وحدة المدة',
                        'text',
                        'أدخل وحدة المدة',
                    )}

                    {renderField(
                        'durationValue',
                        'Duration Value',
                        'text',
                        'Enter duration value',
                    )}
                    {renderField(
                        'durationVallueInArabic',
                        'قيمة المدة',
                        'text',
                        'أدخل قيمة المدة',
                    )}

                    {renderField('type', 'Type', 'text', 'Enter type')}
                    {renderField('typeInArabic', 'النوع', 'text', 'أدخل النوع')}

                    {renderField('price', 'Price', 'text', 'Enter price')}
                    {renderField(
                        'priceInArabic',
                        'السعر',
                        'text',
                        'أدخل السعر',
                    )}

                    {renderField(
                        'priceUnit',
                        'Price Unit',
                        'text',
                        'Enter price unit',
                    )}
                    {renderField(
                        'priceUnitInArabic',
                        'وحدة السعر',
                        'text',
                        'أدخل وحدة السعر',
                    )}

                    {renderField(
                        'minimumTime',
                        'Minimum Time',
                        'text',
                        'Enter minimum time',
                    )}
                    {renderField(
                        'minimumTimeInArabic',
                        'الحد الأدنى للوقت',
                        'text',
                        'أدخل الحد الأدنى للوقت',
                    )}

                    {renderField(
                        'minimumTimeUnit',
                        'Minimum Time Unit',
                        'text',
                        'Enter minimum time unit',
                    )}
                    {renderField(
                        'minimumTimeUnitInArabic',
                        'وحدة الحد الأدنى للوقت',
                        'text',
                        'أدخل وحدة الوقت',
                    )}

                    {renderField(
                        'specialTags',
                        'Special Tags',
                        'text',
                        'Enter special tags',
                    )}
                    {renderField(
                        'specialTagsInArabic',
                        'العلامات المميزة',
                        'text',
                        'أدخل العلامات المميزة',
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-5 px-5">
                    <FormItem>
                        <Controller
                            name="forMembersOnly"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onChange={(checked) =>
                                        field.onChange(checked)
                                    }
                                >
                                    <span className="mt-[1px]">
                                        For Members Only
                                    </span>
                                </Checkbox>
                            )}
                        />
                    </FormItem>
                    <FormItem>
                        <Controller
                            name="isSplitPaymentAvailable"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onChange={(checked) =>
                                        field.onChange(checked)
                                    }
                                >
                                    <span className="mt-[1px]">
                                        Split Payment Available
                                    </span>
                                </Checkbox>
                            )}
                        />
                    </FormItem>
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

export default ChaletSubscriptionForm
