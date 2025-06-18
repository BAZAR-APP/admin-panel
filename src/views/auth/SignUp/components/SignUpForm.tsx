import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, type ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { PasswordInput } from '@/components/shared'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    setMessage?: (message: string) => void
}

type SignUpFormSchema = {
    fullName: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

const validationSchema: ZodType<SignUpFormSchema> = z
    .object({
        fullName: z
            .string({ required_error: 'Please enter your name' })
            .trim()
            .min(3, 'Name is too short'),
        phoneNumber: z
            .string({ required_error: 'Please enter your phone number' })
            .min(1, { message: 'Please enter your phone number' })
            .regex(/^\+?\d{10,15}$/, { message: 'Invalid phone number' }),
        password: z
            .string({ required_error: 'Password required' })
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string({
            required_error: 'Confirm password required',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

const SignUpForm = ({
    disableSubmit = false,
    className,
    setMessage,
}: SignUpFormProps) => {
    const [isSubmitting, setSubmitting] = useState(false)
    const { signUp } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSignUp = async (values: SignUpFormSchema) => {
        const { phoneNumber, password, fullName } = values

        if (!disableSubmit) {
            setSubmitting(true)
            const result = await signUp({ phoneNumber, password, fullName })

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }

            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignUp)}>
                <FormItem
                    label="Full Name"
                    invalid={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                >
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Full Name"
                                autoComplete="name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Phone"
                    invalid={Boolean(errors.phoneNumber)}
                    errorMessage={errors.phoneNumber?.message}
                >
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                autoComplete="off"
                                icon={
                                    <img
                                        src={'/img/others/countryFlag.svg'}
                                        alt="Country Flag"
                                        className="w-5 h-5"
                                    />
                                }
                                prefix="+965"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Password"
                    invalid={!!errors.password}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <PasswordInput placeholder="Password" {...field} />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Confirm Password"
                    invalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <PasswordInput
                                placeholder="Confirm Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
