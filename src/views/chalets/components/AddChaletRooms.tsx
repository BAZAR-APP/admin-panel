import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { Input, Button, Form, FormItem } from '@/components/ui'
import AxiosBase from '@/services/axios/AxiosBase'
import toast from 'react-hot-toast'
import { extractErrorMessage } from '@/utils/helpers'
import { AdaptiveCard, Container } from '@/components/shared'

const roomSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    titleInArabic: z.string().min(1, 'Arabic title is required'),
    noOfKingBedrooms: z.number().min(0, 'Must be 0 or more'),
    noOfKingBedroomsInArabic: z.string(),
    noOfSingleBedrooms: z.number().min(0, 'Must be 0 or more'),
    noOfSingleBedroomsInArabic: z.string(),
    noOfDoubleBedrooms: z.number().min(0, 'Must be 0 or more'),
    noOfDoubleBedroomsInArabic: z.string(),
    chaletId: z.string().min(1, 'Chalet ID is required'),
})

type RoomFormSchema = z.infer<typeof roomSchema>

const defaultValues: RoomFormSchema = {
    title: '',
    titleInArabic: '',
    noOfKingBedrooms: 0,
    noOfKingBedroomsInArabic: '',
    noOfSingleBedrooms: 0,
    noOfSingleBedroomsInArabic: '',
    noOfDoubleBedrooms: 0,
    noOfDoubleBedroomsInArabic: '',
    chaletId: '',
}

const AddChaletRooms = () => {
    const { chaletId } = useParams<{ chaletId: string }>()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<RoomFormSchema>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            ...defaultValues,
            chaletId: chaletId || '',
        },
        mode: 'onChange',
    })

    const onSubmit = async (data: RoomFormSchema) => {
        try {
            setLoading(true)
            await AxiosBase.post('/chaletRoom', data)
            toast.success('Room added successfully')
            reset({ ...defaultValues, chaletId: chaletId || '' })
            navigate(`/chalet/rooms/${chaletId}`)
        } catch (err) {
            toast.error(extractErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const renderField = (
        name: keyof RoomFormSchema,
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
        <Container>
            <AdaptiveCard>
                <h3 className="mb-6 px-5 text-primary">Add Rooms</h3>
                <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
                        {renderField(
                            'title',
                            'Room Title',
                            'text',
                            'Enter room title',
                        )}
                        {renderField(
                            'titleInArabic',
                            'عنوان الغرفة',
                            'text',
                            'أدخل عنوان الغرفة',
                        )}

                        {renderField(
                            'noOfKingBedrooms',
                            'King Bedrooms',
                            'number',
                            '0',
                        )}
                        {renderField(
                            'noOfKingBedroomsInArabic',
                            'غرف نوم كينج',
                            'text',
                            'أدخل عدد غرف كينج',
                        )}

                        {renderField(
                            'noOfSingleBedrooms',
                            'Single Bedrooms',
                            'number',
                            '0',
                        )}
                        {renderField(
                            'noOfSingleBedroomsInArabic',
                            'غرف نوم فردية',
                            'text',
                            'أدخل عدد غرف فردية',
                        )}

                        {renderField(
                            'noOfDoubleBedrooms',
                            'Double Bedrooms',
                            'number',
                            '0',
                        )}
                        {renderField(
                            'noOfDoubleBedroomsInArabic',
                            'غرف نوم مزدوجة',
                            'text',
                            'أدخل عدد غرف مزدوجة',
                        )}
                    </div>
                    <div className="px-5">
                        <Button
                            type="submit"
                            block
                            disabled={!isValid || loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </Form>
            </AdaptiveCard>
        </Container>
    )
}

export default AddChaletRooms
