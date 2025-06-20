import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Form, FormItem } from '@/components/ui/Form'
import toast from 'react-hot-toast'
import { extractErrorMessage } from '@/utils/helpers'
import AxiosBase from '@/services/axios/AxiosBase'
import { useState } from 'react'

interface CreateItemFormProps {
    endpoint: string
    isBadgeType?: boolean
    onSuccess?: () => void
}

// Schema setup
const baseSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    nameInArabic: z.string().min(1, 'Arabic name is required'),
})

const badgeTypeExtension = z.object({
    description: z.string().min(1, 'Description is required'),
    descriptionInArabic: z.string().min(1, 'Arabic description is required'),
})

const getSchema = (isBadgeType: boolean) =>
    isBadgeType ? baseSchema.merge(badgeTypeExtension) : baseSchema

const fullSchema = baseSchema.merge(badgeTypeExtension)
type CreateItemSchema = z.infer<typeof fullSchema>

const CreateItemForm = ({
    endpoint,
    isBadgeType = false,
    onSuccess,
}: CreateItemFormProps) => {
    const [loading, setLoading] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<CreateItemSchema>({
        resolver: zodResolver(getSchema(isBadgeType)),
        defaultValues: {
            name: '',
            nameInArabic: '',
            description: '',
            descriptionInArabic: '',
        },
        mode: 'onChange',
    })

    const onSubmit = async (data: CreateItemSchema) => {
        try {
            setLoading(true)
            await AxiosBase.post(endpoint, {
                title: data?.name,
                titleInArabic: data?.nameInArabic,
                ...(!isBadgeType && {
                    hasCustomizedIcon: true,
                    iconPhotoId:
                        'https://www.shutterstock.com/image-vector/fridge-freezer-refrigerator-condenser-icon-260nw-573132496.jpg',
                }),
                ...(isBadgeType && {
                    description: data?.description,
                    descriptionInArabic: data?.descriptionInArabic,
                }),
            })
            reset()
            onSuccess?.()
        } catch (error) {
            toast.error(extractErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="mb-3.5">
                {isBadgeType ? 'Add Badge' : 'Add Amenity'}
            </h3>
            <FormItem
                label="Title"
                invalid={!!errors.name}
                errorMessage={errors.name?.message}
            >
                <Controller
                    name="name"
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
                invalid={!!errors.nameInArabic}
                errorMessage={errors.nameInArabic?.message}
            >
                <Controller
                    name="nameInArabic"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="أدخل العنوان"
                        />
                    )}
                />
            </FormItem>

            {isBadgeType && (
                <>
                    <FormItem
                        label="Description"
                        invalid={!!errors.description}
                        errorMessage={errors.description?.message}
                    >
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Enter description"
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="الوصف"
                        invalid={!!errors.descriptionInArabic}
                        errorMessage={errors.descriptionInArabic?.message}
                    >
                        <Controller
                            name="descriptionInArabic"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="أدخل الوصف"
                                />
                            )}
                        />
                    </FormItem>
                </>
            )}

            <Button
                block
                type="submit"
                loading={loading}
                disabled={!isValid || loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </Button>
        </Form>
    )
}

export default CreateItemForm
