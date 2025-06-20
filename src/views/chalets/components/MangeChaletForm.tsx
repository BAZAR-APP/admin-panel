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
import AmenitiesDropdown from '../AmentiesDropdown'
import BadgeDropdown from '../BadgeDropdown'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'

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
    amenities: z.array(z.string()),
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
    amenities: [],
    isEntireHomeAvailabe: false,
    trustedByPlatform: false,
    isFamilyFriendlyOnly: false,
    latitude: 0,
    longitude: 0,
}

type HomeFormSchema = z.infer<typeof homeSchema>

const MangeChaletForm = ({}) => {
    const { chaletId } = useParams() as { chaletId: string }
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
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
    useSWR(chaletId ? `/chalets/readById/${chaletId}` : null, fetcher, {
        onSuccess: (data) => {
            reset(data)
        },
    })

    const onSubmit = async (data: HomeFormSchema) => {
        try {
            setLoading(true)
            await AxiosBase.post('/chalets', data)
            toast.success('Chalet created successfully')
            reset()
            navigate('/chalets')
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
                <h3 className="mb-5 px-5 text-primary">
                    {chaletId ? ' Update ' : 'Create '}Chalet
                </h3>
                <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-5">
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
                            'Enter discription',
                        )}
                        {renderField(
                            'descriptionInArabic',
                            'الوصف',
                            'text',
                            'أدخل الوصف',
                        )}

                        {renderField(
                            'noOfBedrooms',
                            'No. of Bedrooms',
                            'number',
                        )}
                        {renderField(
                            'noOfBedroomsInArabic',
                            'عدد غرف النوم',
                            'text',
                            'صفر',
                        )}
                        {renderField(
                            'maxNoOfBeds',
                            'Max No. of Beds',
                            'number',
                        )}
                        {renderField(
                            'maxNoOfBedsInArabic',
                            'الحد الأقصى لعدد الأسرة',
                            'text',
                            'صفر',
                        )}
                        {renderField('noOfBaths', 'No. of Baths', 'number')}
                        {renderField(
                            'noOfBathsInArabic',
                            'عدد الحمامات',
                            'text',
                            'صفر',
                        )}
                        {renderField(
                            'maxNoOfGuests',
                            'Max No. of Guests',
                            'number',
                        )}

                        {renderField(
                            'maxNoOfGuestsInArabic',
                            'الحد الأقصى لعدد الضيوف',
                            'text',
                            'صفر',
                        )}
                        {renderField(
                            'minNoOfGuests',
                            'Min No. of Guests',
                            'number',
                        )}
                        {renderField(
                            'minNoOfGuestsInArabic',
                            'الحد الأدنى لعدد الضيوف',
                            'text',
                            'صفر',
                        )}

                        {renderField('perHourCost', 'Per Hour Cost', 'number')}
                        {renderField(
                            'perNightCost',
                            'التكلفة لكل ساعة',
                            'number',
                        )}
                        {renderField('weekendCost', 'Weekend Cost', 'number')}
                        {renderField(
                            'weekDaysCost',
                            'Week Days Cost',
                            'number',
                        )}
                        {renderField(
                            'fullWeekCost',
                            'Full Week Cost',
                            'number',
                        )}
                        {renderField(
                            'fullMonthCost',
                            'Full Month Cost',
                            'number',
                        )}

                        {renderField(
                            'photoId',
                            'Photo ID',
                            'text',
                            'Enter photo id',
                        )}
                        {renderField(
                            'hostName',
                            'Host Name',
                            'text',
                            'Enter name',
                        )}
                        {renderField(
                            'hostPhotoId',
                            'Host Photo ID',
                            'text',
                            'Enter id',
                        )}

                        {renderField(
                            'pinTitle',
                            'Pin Title',
                            'text',
                            'Enter pin title',
                        )}
                        {renderField(
                            'pinTitleInArabic',
                            'عنوان التثبيت',
                            'text',
                            'أدخل عنوان التثبيت',
                        )}
                        {renderField(
                            'street1',
                            'Street 1',
                            'text',
                            'Enter street',
                        )}
                        {renderField(
                            'street1InArabic',
                            'الشارع 1',
                            'text',
                            'أدخل اسم الشارع',
                        )}
                        {renderField(
                            'street2',
                            'Street 2',
                            'text',
                            'Enter street',
                        )}
                        {renderField(
                            'street2InArabic',
                            'الشارع 2',
                            'text',
                            'أدخل اسم الشارع',
                        )}
                        {renderField('city', 'City', 'text', 'Enter city')}
                        {renderField(
                            'cityInArabic',
                            'المدينة',
                            'text',
                            'أدخل المدينة',
                        )}
                        {renderField('state', 'State', 'text', 'Enter state')}
                        {renderField(
                            'stateInArabic',
                            'الولاية',
                            'text',
                            'أدخل الولاية',
                        )}
                        {renderField(
                            'country',
                            'Country',
                            'text',
                            'Enter country',
                        )}
                        {renderField(
                            'countryInArabic',
                            'الدولة',
                            'text',
                            'أدخل الدولة',
                        )}
                        {renderField(
                            'postalCode',
                            'Postal Code',
                            'text',
                            'Enter postal code'
                        )}
                        <AmenitiesDropdown control={control} errors={errors} />
                        <BadgeDropdown control={control} errors={errors} />
                        {renderField(
                            'latitude',
                            'Latitude',
                            'number',
                        )}
                        {renderField(
                            'longitude',
                            'Longitude',
                            'number',
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 px-5">
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
                        </div>
                        <div className="flex flex-wrap gap-3 items-center lg:mt-6 xl:mt-11 2xl:mt-5">
                            <FormItem>
                                <Controller
                                    name="isEntireHomeAvailabe"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(checked) =>
                                                field.onChange(checked)
                                            }
                                        >
                                            <span className="mt-[1px]">
                                                Entire Home Available
                                            </span>
                                        </Checkbox>
                                    )}
                                />
                            </FormItem>

                            <FormItem>
                                <Controller
                                    name="trustedByPlatform"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(checked) =>
                                                field.onChange(checked)
                                            }
                                        >
                                            <span className="mt-[1px]">
                                                Trusted by Platform
                                            </span>
                                        </Checkbox>
                                    )}
                                />
                            </FormItem>

                            <FormItem>
                                <Controller
                                    name="isFamilyFriendlyOnly"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(checked) =>
                                                field.onChange(checked)
                                            }
                                        >
                                            <span className="mt-[1px]">
                                                Family Friendly Only
                                            </span>
                                        </Checkbox>
                                    )}
                                />
                            </FormItem>
                        </div>
                    </div>
                    <div className="px-5">
                        <Button
                            block
                            type="submit"
                            loading={loading}
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

export default MangeChaletForm
