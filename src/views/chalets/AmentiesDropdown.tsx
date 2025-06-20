import React from 'react'
import useSWR from 'swr'
import { Controller } from 'react-hook-form'
import { FormItem, Select } from '@/components/ui'
import { Control, FieldErrors } from 'react-hook-form'
import AxiosBase from '@/services/axios/AxiosBase'

interface AmenitiesDropdownProps {
    control: Control<any>
    errors: FieldErrors<any>
}

const fetcher = async (url: string) => {
    const res = await AxiosBase.get(url)
    return res?.data
}

const AmenitiesDropdown: React.FC<AmenitiesDropdownProps> = ({
    control,
    errors,
}) => {
    const { data, isLoading } = useSWR('/amenity', fetcher)

    const options =
        data?.map((item: any) => ({
            label: item.title,
            value: item.id,
        })) ?? []

    return (
        <FormItem
            label="Select Amenities"
            invalid={Boolean(errors?.amenities)}
        >
            <Controller
                name="amenities"
                control={control}
                render={({ field }) => (
                    <Select
                        isMulti
                        isLoading={isLoading}
                        options={options}
                        className="w-full min-w-[254px] cursor-pointer"
                        placeholder={
                            isLoading
                                ? 'Loading amenities...'
                                : 'Select amenities'
                        }
                        value={options.filter(
                            (opt: { label: string; value: any }) =>
                                (field.value ?? []).includes(opt.value),
                        )}
                        onChange={(selected) =>
                            field.onChange(
                                selected?.map((opt) => opt.value) || [],
                            )
                        }
                        styles={{
                            menuList: (base) => ({
                                ...base,
                                scrollbarWidth: 'none',
                            }),
                        }}
                    />
                )}
            />
        </FormItem>
    )
}

export default AmenitiesDropdown
