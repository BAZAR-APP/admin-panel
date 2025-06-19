import React from 'react'
import useSWR from 'swr'
import { Controller } from 'react-hook-form'
import { FormItem, Select } from '@/components/ui'
import { Control, FieldErrors } from 'react-hook-form'
import AxiosBase from '@/services/axios/AxiosBase'

interface CategoryDropdownProps {
    control: Control<any>
    errors: FieldErrors<any>
    name: string
}

const fetcher = async (url: string) => {
    const res = await AxiosBase.get(url)
    return res?.data
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
    control,
    errors,
    name,
}) => {
    const { data, isLoading } = useSWR(
        '/customizationCategory/readAllCategoriesWithCustomizations',
        fetcher,
    )

    const options =
        data?.map((category: any) => ({
            label: category.title,
            value: category.id,
        })) ?? []

    return (
        <FormItem
            label="Customization Categories | فئات التخصيص"
            invalid={Boolean(errors?.[name])}
        >
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        isLoading={isLoading}
                        options={options}
                        className="w-full min-w-[254px] cursor-pointer"
                        placeholder={
                            isLoading
                                ? 'Loading categories...'
                                : 'Select customization category'
                        }
                        value={options.find(
                            (opt: { label: string; value: any }) =>
                                opt.value === field.value,
                        )}
                        onChange={(selected) =>
                            field.onChange(selected?.value ?? null)
                        }
                        isMulti={false}
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

export default CategoryDropdown
