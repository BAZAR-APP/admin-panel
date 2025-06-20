import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Form, FormItem } from '@/components/ui/Form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AxiosBase from '@/services/axios/AxiosBase'
import { extractErrorMessage } from '@/utils/helpers'
import { Checkbox } from '@/components/ui'

const tiersSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    titleInArabic: z.string().min(1, 'Arabic title is required'),
    description: z.string().min(1, 'Description is required'),
    descriptionInArabic: z.string().min(1, 'Arabic description is required'),
    iconURL: z.string().url('Invalid URL'),
    isPlatinum: z.boolean().optional(),
    isGold: z.boolean().optional(),
    isDiamond: z.boolean().optional(),
    platinumPointsPerKwd: z.number().nonnegative(),
    goldPointsPerKwd: z.number().nonnegative(),
    diamondPointsPerKwd: z.number().nonnegative(),
    platinumMinPoints: z.number().nonnegative(),
    platinumMaxPoints: z.number().nonnegative(),
    goldMinPoints: z.number().nonnegative(),
    goldMaxPoints: z.number().nonnegative(),
    diamondMinPoints: z.number().nonnegative(),
    diamondMaxPoints: z.number().nonnegative(),
})

type TiersFormSchema = z.infer<typeof tiersSchema>

const defaultValues: TiersFormSchema = {
    title: '',
    titleInArabic: '',
    description: '',
    descriptionInArabic: '',
    iconURL: '',
    isPlatinum: false,
    isGold: false,
    isDiamond: false,
    platinumPointsPerKwd: 0,
    goldPointsPerKwd: 0,
    diamondPointsPerKwd: 0,
    platinumMinPoints: 0,
    platinumMaxPoints: 0,
    goldMinPoints: 0,
    goldMaxPoints: 0,
    diamondMinPoints: 0,
    diamondMaxPoints: 0,
}

const TiersBenefitsForm = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<TiersFormSchema>({
        resolver: zodResolver(tiersSchema),
        defaultValues,
        mode: 'onChange',
    })

    const onSubmit = async (data: TiersFormSchema) => {
        try {
            setLoading(true)
            await AxiosBase.post('/tiers', data)
            toast.success('Tier created successfully')
            navigate('/tiers')
            reset()
        } catch (err) {
            toast.error(extractErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const renderField = (
        name: keyof TiersFormSchema,
        label: string,
        type: string = 'text',
        placeholder?: string,
    ) => (
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
    )

    const renderCheckbox = (name: keyof TiersFormSchema, label: string) => (
        <FormItem>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Checkbox checked={!!field.value} onChange={field.onChange}>
                        {label}
                    </Checkbox>
                )}
            />
        </FormItem>
    )

    return (
        <Card>
            <h3 className="mb-5 px-5 text-primary">Create Tiers Benefit</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-x-6 px-5">
                    {renderField('title', 'Title', 'text', 'Enter title')}
                    {renderField(
                        'titleInArabic',
                        'العنوان',
                        'text',
                        'أدخل العنوان',
                    )}
                    {renderField(
                        'description',
                        'Description',
                        'text',
                        'Enter description',
                    )}
                    {renderField(
                        'descriptionInArabic',
                        'الوصف ',
                        'text',
                        'أدخل الوصف',
                    )}
                    {renderField(
                        'iconURL',
                        'Icon URL',
                        'text',
                        'Enter icon image URL',
                    )}

                    {renderField(
                        'platinumPointsPerKwd',
                        'Platinum Points / KWD',
                        'number',
                        'e.g. 10',
                    )}
                    {renderField(
                        'goldPointsPerKwd',
                        'Gold Points / KWD',
                        'number',
                        'e.g. 8',
                    )}
                    {renderField(
                        'diamondPointsPerKwd',
                        'Diamond Points / KWD',
                        'number',
                        'e.g. 12',
                    )}

                    {renderField(
                        'platinumMinPoints',
                        'Platinum Min Points',
                        'number',
                        'e.g. 100',
                    )}
                    {renderField(
                        'platinumMaxPoints',
                        'Platinum Max Points',
                        'number',
                        'e.g. 200',
                    )}
                    {renderField(
                        'goldMinPoints',
                        'Gold Min Points',
                        'number',
                        'e.g. 50',
                    )}
                    {renderField(
                        'goldMaxPoints',
                        'Gold Max Points',
                        'number',
                        'e.g. 99',
                    )}
                    {renderField(
                        'diamondMinPoints',
                        'Diamond Min Points',
                        'number',
                        'e.g. 201',
                    )}
                    {renderField(
                        'diamondMaxPoints',
                        'Diamond Max Points',
                        'number',
                        'e.g. 500',
                    )}
                    {renderCheckbox('isPlatinum', 'Is Platinum')}
                    {renderCheckbox('isGold', 'Is Gold')}
                    {renderCheckbox('isDiamond', 'Is Diamond')}
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

export default TiersBenefitsForm
