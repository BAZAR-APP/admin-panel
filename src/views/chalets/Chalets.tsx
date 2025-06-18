import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Button from '@/components/ui/Button'
import { Form, FormItem } from '@/components/ui/Form'
import toast from 'react-hot-toast'
import AxiosBase from '@/services/axios/AxiosBase'
import { useState } from 'react'
import { Input } from '@/components/ui'
import { AdaptiveCard, Container } from '@/components/shared'

const homeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    titleInArabic: z.string().min(1, 'Arabic title is required'),
    description: z.string().min(1, 'Description is required'),
    descriptionInArabic: z.string().min(1, 'Arabic description is required'),

    noOfBedrooms: z.number().min(0),
    noOfBedroomsInArabic: z.string(),
    maxNoOfBeds: z.number().min(0),
    maxNoOfBedsInArabic: z.string(),
    noOfBaths: z.number().min(0),
    noOfBathsInArabic: z.string(),
    maxNoOfGuests: z.number().min(0),
    minNoOfGuests: z.number().min(0),
    maxNoOfGuestsInArabic: z.string(),
    minNoOfGuestsInArabic: z.string(),

    perHourCost: z.number(),
    perNightCost: z.number(),
    weekendCost: z.number(),
    weekDaysCost: z.number(),
    fullWeekCost: z.number(),
    fullMonthCost: z.number(),

    photoId: z.string(),
    galleryPhotoIds: z.array(z.string()),

    hostName: z.string(),
    hostPhotoId: z.string(),

    pinTitle: z.string(),
    pinTitleInArabic: z.string(),
    street1: z.string(),
    street1InArabic: z.string(),
    street2: z.string(),
    street2InArabic: z.string(),
    city: z.string(),
    cityInArabic: z.string(),
    state: z.string(),
    stateInArabic: z.string(),
    country: z.string(),
    countryInArabic: z.string(),
    postalCode: z.string(),

    badgeId: z.string(),

    isEntireHomeAvailabe: z.boolean(),
    trustedByPlatform: z.boolean(),
    isFamilyFriendlyOnly: z.boolean(),
    latitude: z.number(),
    longitude: z.number(),
})

const defaultValues = {
    title: '',
    titleInArabic: '',
    description: '',
    descriptionInArabic: '',
    noOfBedrooms: 0,
    noOfBedroomsInArabic: '',
    maxNoOfBeds: 0,
    maxNoOfBedsInArabic: '',
    noOfBaths: 0,
    noOfBathsInArabic: '',
    maxNoOfGuests: 0,
    minNoOfGuests: 0,
    maxNoOfGuestsInArabic: '',
    minNoOfGuestsInArabic: '',
    perHourCost: 0,
    perNightCost: 0,
    weekendCost: 0,
    weekDaysCost: 0,
    fullWeekCost: 0,
    fullMonthCost: 0,
    photoId: '',
    galleryPhotoIds: [],
    hostName: '',
    hostPhotoId: '',
    pinTitle: '',
    pinTitleInArabic: '',
    street1: '',
    street1InArabic: '',
    street2: '',
    street2InArabic: '',
    city: '',
    cityInArabic: '',
    state: '',
    stateInArabic: '',
    country: '',
    countryInArabic: '',
    postalCode: '',
    badgeId: '',
    isEntireHomeAvailabe: false,
    trustedByPlatform: false,
    isFamilyFriendlyOnly: false,
    latitude: 0,
    longitude: 0,
}

type HomeFormSchema = z.infer<typeof homeSchema>

const Chalets = ({
    endpoint,
    onSuccess,
}: {
    endpoint: string
    onSuccess?: () => void
}) => {
    const [loading, setLoading] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<HomeFormSchema>({
        resolver: zodResolver(homeSchema),
        defaultValues,
        mode: 'onChange',
    })

    const onSubmit = async (data: HomeFormSchema) => {
        try {
            setLoading(true)
            await AxiosBase.post(endpoint, data)
            toast.success('Home created successfully')
            reset()
            onSuccess?.()
        } catch (err) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const renderField = (
        name: keyof HomeFormSchema,
        label: string,
        type: string = 'text',
    ) => (
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/6">
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
                            value={
                                typeof field.value === 'boolean'
                                    ? ''
                                    : field.value === undefined ||
                                        field.value === null
                                      ? ''
                                      : field.value
                            }
                        />
                    )}
                />
            </FormItem>
        </div>
    )

    return (
        <Container>
            <AdaptiveCard>
                <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        {renderField('title', 'Title | العنوان')}
                        {renderField('titleInArabic', 'Title in Arabic')}
                        {renderField('description', 'Description | الوصف')}
                        {renderField(
                            'descriptionInArabic',
                            'Description in Arabic',
                        )}

                        {renderField(
                            'noOfBedrooms',
                            'No. of Bedrooms | غرف النوم',
                            'number',
                        )}
                        {renderField(
                            'noOfBedroomsInArabic',
                            'No. of Bedrooms in Arabic',
                        )}
                        {renderField(
                            'maxNoOfBeds',
                            'Max No. of Beds | عدد الأسرة',
                            'number',
                        )}
                        {renderField(
                            'maxNoOfBedsInArabic',
                            'Max No. of Beds in Arabic',
                        )}
                        {renderField(
                            'noOfBaths',
                            'No. of Baths | الحمامات',
                            'number',
                        )}
                        {renderField(
                            'noOfBathsInArabic',
                            'No. of Baths in Arabic',
                        )}
                        {renderField(
                            'maxNoOfGuests',
                            'Max No. of Guests | الحد الأقصى للضيوف',
                            'number',
                        )}
                        {renderField(
                            'minNoOfGuests',
                            'Min No. of Guests | الحد الأدنى للضيوف',
                            'number',
                        )}
                        {renderField(
                            'maxNoOfGuestsInArabic',
                            'Max No. of Guests in Arabic',
                        )}
                        {renderField(
                            'minNoOfGuestsInArabic',
                            'Min No. of Guests in Arabic',
                        )}

                        {renderField(
                            'perHourCost',
                            'Per Hour Cost | تكلفة الساعة',
                            'number',
                        )}
                        {renderField(
                            'perNightCost',
                            'Per Night Cost | تكلفة الليلة',
                            'number',
                        )}
                        {renderField(
                            'weekendCost',
                            'Weekend Cost | تكلفة نهاية الأسبوع',
                            'number',
                        )}
                        {renderField(
                            'weekDaysCost',
                            'Week Days Cost | تكلفة أيام الأسبوع',
                            'number',
                        )}
                        {renderField(
                            'fullWeekCost',
                            'Full Week Cost | تكلفة الأسبوع الكامل',
                            'number',
                        )}
                        {renderField(
                            'fullMonthCost',
                            'Full Month Cost | تكلفة الشهر الكامل',
                            'number',
                        )}

                        {renderField('photoId', 'Photo ID')}
                        {renderField('hostName', 'Host Name')}
                        {renderField('hostPhotoId', 'Host Photo ID')}

                        {renderField(
                            'pinTitle',
                            'Pin Title | العنوان على الخريطة',
                        )}
                        {renderField('pinTitleInArabic', 'Pin Title in Arabic')}
                        {renderField('street1', 'Street 1 | الشارع 1')}
                        {renderField('street1InArabic', 'Street 1 in Arabic')}
                        {renderField('street2', 'Street 2 | الشارع 2')}
                        {renderField('street2InArabic', 'Street 2 in Arabic')}
                        {renderField('city', 'City | المدينة')}
                        {renderField('cityInArabic', 'City in Arabic')}
                        {renderField('state', 'State | الولاية')}
                        {renderField('stateInArabic', 'State in Arabic')}
                        {renderField('country', 'Country | البلد')}
                        {renderField('countryInArabic', 'Country in Arabic')}
                        {renderField(
                            'postalCode',
                            'Postal Code | الرمز البريدي',
                        )}
                        {renderField('badgeId', 'Badge ID')}
                        {renderField(
                            'latitude',
                            'Latitude | خط العرض',
                            'number',
                        )}
                        {renderField(
                            'longitude',
                            'Longitude | خط الطول',
                            'number',
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                            <FormItem
                                label="Gallery Photo IDs (comma-separated)"
                                invalid={!!errors.galleryPhotoIds}
                            >
                                <Controller
                                    name="galleryPhotoIds"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value
                                                        .split(',')
                                                        .map((s) => s.trim()),
                                                )
                                            }
                                            value={field.value.join(', ')}
                                        />
                                    )}
                                />
                            </FormItem>

                            <FormItem label="Entire Home Available">
                                <Controller
                                    name="isEntireHomeAvailabe"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                        />
                                    )}
                                />
                            </FormItem>

                            <FormItem label="Trusted by Platform">
                                <Controller
                                    name="trustedByPlatform"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                        />
                                    )}
                                />
                            </FormItem>

                            <FormItem label="Family Friendly Only">
                                <Controller
                                    name="isFamilyFriendlyOnly"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                    </div>
                    <Button
                        block
                        type="submit"
                        loading={loading}
                        disabled={!isValid || loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form>
            </AdaptiveCard>
        </Container>
    )
}

export default Chalets
