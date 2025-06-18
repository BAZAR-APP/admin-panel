import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignUpForm from './components/SignUpForm'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'

type SignUpProps = {
    disableSubmit?: boolean
    signInUrl?: string
}

export const SignUpBase = ({
    signInUrl = '/sign-in',
    disableSubmit,
}: SignUpProps) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useThemeStore((state) => state.mode)

    return (
        <>
            <div className="mb-5">
                <Logo
                    type="streamline"
                    mode={mode}
                    // imgClass="mx-auto"
                    // logoWidth={60}
                />
            </div>
            <div className="mb-5">
                <h2 className="font-semibold lg:text-[39px] sm:text-3xl text-2xl leading-[47px] text-[#19191A] mb-2">
                    Create an Account
                </h2>

                <p className="not-italic font-normal text-[16px] leading-[19px] text-[#484A4C]">
                    Join us and enjoy seamless chalet bookings and exclusive
                    rewards.
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-3" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignUpForm disableSubmit={disableSubmit} setMessage={setMessage} />
            <div>
                <div className="mt-6">
                    <span>Already have an account? </span>
                    <ActionLink
                        to={signInUrl}
                        className="heading-text font-bold text-primary"
                        themeColor={false}
                    >
                        Log in
                    </ActionLink>
                </div>
            </div>
        </>
    )
}

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
