import { useState } from 'react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import ActionLink from '@/components/shared/ActionLink'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/template/Logo'

type ForgotPasswordProps = {
    signInUrl?: string
}

export const ForgotPasswordBase = ({
    signInUrl = '/sign-in',
}: ForgotPasswordProps) => {
    const [emailSent, setEmailSent] = useState(false)
    const [message, setMessage] = useTimeOutMessage()

    const navigate = useNavigate()

    const handleContinue = () => {
        navigate(signInUrl)
    }

    return (
        <div>
            <div className="min-[1440px]:mb-7 mb-5">
                <Logo />
            </div>
            <div className="mb-6">
                {emailSent ? (
                    <>
                        <h2 className="font-semibold lg:text-[39px] sm:text-3xl text-2xl leading-[47px] text-[#19191A] min-[1440px]:mb-4 mb-2">
                            Check your phone
                        </h2>
                        <p className="not-italic font-normal text-[16px] leading-[19px] text-[#484A4C]">
                            We have sent a password recovery to your phone
                            number.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="font-semibold lg:text-[39px] sm:text-3xl text-2xl leading-[47px] text-[#19191A] mb-2">
                            Forget Password
                        </h2>

                        <p className="not-italic font-normal text-[16px] leading-[19px] text-[#484A4C]">
                            Enter your phone number to reset your password.
                        </p>
                    </>
                )}
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <ForgotPasswordForm
                emailSent={emailSent}
                setMessage={setMessage}
                setEmailSent={setEmailSent}
            >
                <Button
                    block
                    variant="solid"
                    type="button"
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </ForgotPasswordForm>
            {/* <div className="min-[1440px]:mt-6 mt-4 text-center">
                <span>Back to </span>
                <ActionLink
                    to={signInUrl}
                    className="heading-text font-bold"
                    themeColor={false}
                >
                    Sign in
                </ActionLink>
            </div> */}
        </div>
    )
}

const ForgotPassword = () => {
    return <ForgotPasswordBase />
}

export default ForgotPassword
