import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { apiForgotPassword } from '@/services/AuthService'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'

interface ForgotPasswordFormProps extends CommonProps {
    emailSent: boolean
    setEmailSent?: (compplete: boolean) => void
    setMessage?: (message: string) => void
}

type ForgotPasswordFormSchema = {
    phoneNumber: string
}

const validationSchema: ZodType<ForgotPasswordFormSchema> = z.object({
    phoneNumber: z
        .string()
        .min(10, 'phoneNumber number must be at least 10 digits')
        .max(15, 'phoneNumber number must be at most 15 digits'),
})

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const { className, setMessage, setEmailSent, emailSent, children } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<ForgotPasswordFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onForgotPassword = async (values: ForgotPasswordFormSchema) => {
        const { phoneNumber } = values

        try {
            const resp = await apiForgotPassword<boolean>({ phoneNumber })
            if (resp) {
                setSubmitting(false)
                setEmailSent?.(true)
            }
        } catch (errors) {
            setMessage?.(
                typeof errors === 'string' ? errors : 'Some error occurred!',
            )
            setSubmitting(false)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {!emailSent ? (
                <Form onSubmit={handleSubmit(onForgotPassword)}>
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
                    <Button
                        block
                        loading={isSubmitting}
                        variant="solid"
                        type="submit"
                    >
                        {isSubmitting ? 'Sending...' : 'SEND OTP'}
                    </Button>
                </Form>
            ) : (
                <>{children}</>
            )}
        </div>
    )
}

export default ForgotPasswordForm
