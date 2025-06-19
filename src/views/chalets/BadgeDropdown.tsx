import React, { useMemo } from 'react'
import useSWR from 'swr'
import { Controller } from 'react-hook-form'
import { FormItem, Select } from '@/components/ui'
import { Control, FieldErrors } from 'react-hook-form'
import AxiosBase from '@/services/axios/AxiosBase'

interface Badge {
    id: string
    title: string
    description: string
}

interface BadgeOption {
    label: string
    value: string
}

interface BadgeDropdownProps {
    control: Control<any>
    errors: FieldErrors<any>
}

const fetcher = async (url: string): Promise<Badge[]> => {
    const res = await AxiosBase.get(url)
    return res.data
}

const BadgeDropdown: React.FC<BadgeDropdownProps> = ({ control, errors }) => {
    const { data, isLoading } = useSWR('/badges', fetcher)

    const options: BadgeOption[] = useMemo(() => {
        return (
            data?.map((badge) => ({
                label: badge.title,
                value: badge.id,
            })) ?? []
        )
    }, [data])

    return (
        <FormItem label="Badge | الشارة" invalid={Boolean(errors?.badgeId)}>
            <Controller
                name="badgeId"
                control={control}
                render={({ field }) => (
                    <Select
                        isLoading={isLoading}
                        options={options}
                        placeholder={
                            isLoading ? 'Loading badges...' : 'Select a badge'
                        }
                        className="w-full min-w-[254px] cursor-pointer"
                        value={
                            options.find((opt) => opt.value === field.value) ||
                            null
                        }
                        onChange={(selected) =>
                            field.onChange(selected?.value || null)
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

export default BadgeDropdown
