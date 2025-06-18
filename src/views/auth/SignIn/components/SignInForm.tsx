import { useContext, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import classNames from '@/utils/classNames'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'
import AuthContext from '@/auth/AuthContext'
import { extractErrorMessage } from '@/utils/helpers'
import toast from 'react-hot-toast'
import { loginSchema } from '@/utils/validationSchemas'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    setMessage?: (message: string) => void
}

type SignInFormSchema = {
    phoneNumber: string
    password: string
}

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const { className, passwordHint } = props
    const { signIn } = useContext(AuthContext)
    const {
        handleSubmit,
        formState: { errors, isValid },
        control,
    } = useForm<SignInFormSchema>({
        defaultValues: {
            phoneNumber: '',
            password: '',
        },
        resolver: zodResolver(loginSchema),
    })
    console.log(errors)

    const onSignIn = async (values: SignInFormSchema) => {
        try {
            setSubmitting(true)
            const result = await signIn({
                phoneNumber: values.phoneNumber,
                password: values.password,
                callingCode: '+965',
                countryCode: 'PK',
                authProvider: 'phone',
            })
            toast.success('Logged in successfully')
        } catch (error) {
            toast.error(extractErrorMessage(error))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignIn)}>
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
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                    className={classNames(
                        passwordHint ? 'mb-0' : '',
                        errors.password?.message ? 'mb-8' : '',
                    )}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <PasswordInput
                                type="text"
                                placeholder="Password"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                {passwordHint}

                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
            </Form>
        </div>
    )
}

export default SignInForm
