import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import OauthSignIn from './components/OauthSignIn'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'
import { Checkbox } from '@/components/ui'

type SignInProps = {
    signUpUrl?: string
    forgetPasswordUrl?: string
    disableSubmit?: boolean
}

export const SignInBase = ({
    signUpUrl = '/sign-up',
    forgetPasswordUrl = '/forgot-password',
    disableSubmit,
}: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useThemeStore((state) => state.mode)

    return (
        <>
            <div className="min-[1440px]:mb-7 mb-4">
                <Logo
                    type="streamline"
                    mode={mode}
                    // imgClass="mx-auto"
                    // logoWidth={150}
                />
            </div>
            <div className="min-[1440px]:mb-7 mb-4">
                <h2 className="font-semibold lg:text-[39px] sm:text-3xl text-2xl leading-[47px] text-[#19191A] mb-2">
                    Sign In
                </h2>

                <p className="not-italic font-normal text-[16px] leading-[19px] text-[#484A4C]">
                    Welcome back! Log in to manage your bookings and profile.
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignInForm
                disableSubmit={disableSubmit}
                setMessage={setMessage}
                // passwordHint={
                //     <div className="min-[1440px]:mb-6 mb-4 min-[1440px]:mt-3 mt-2 flex items-center justify-between gap-1">
                //         <Checkbox
                //             onChange={() => {}}
                //             className="text-[#484A4C] font-normal"
                //         >
                //             Remember Me
                //         </Checkbox>
                //         <ActionLink
                //             to={forgetPasswordUrl}
                //             className="font-semibold heading-text mt-2.5 underline underline-offset-2 text-[#29397E]"
                //             themeColor={false}
                //         >
                //             Forgot password
                //         </ActionLink>
                //     </div>
                // }
            />
            {/* <div className="min-[1440px]:mt-7 mt-4.5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                    <p className="font-semibold heading-text">
                        or countinue with
                    </p>
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                </div>
                <OauthSignIn
                    disableSubmit={disableSubmit}
                    setMessage={setMessage}
                />
            </div> */}
            {/* <div>
                <div className="min-[1440px]:mt-5 mt-3">
                    <span>{`Don’t have an account?`} </span>
                    <ActionLink
                        to={signUpUrl}
                        className="heading-text font-bold text-primary"
                        themeColor={false}
                    >
                        Sign Up
                    </ActionLink>
                </div>
            </div> */}
        </>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
