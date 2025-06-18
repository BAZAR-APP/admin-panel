import { useRef, useImperativeHandle } from 'react'
import AuthContext from './AuthContext'
import appConfig from '@/configs/app.config'
import { useSessionUser, useToken } from '@/store/authStore'
import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    OauthSignInCallbackPayload,
    User,
    Token,
} from '@/@types/auth'
import type { ReactNode, Ref } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import AxiosBase from '@/services/axios/AxiosBase'

type AuthProviderProps = { children: ReactNode }

export type IsolatedNavigatorRef = {
    navigate: NavigateFunction
}

const IsolatedNavigator = ({ ref }: { ref: Ref<IsolatedNavigatorRef> }) => {
    const navigate = useNavigate()

    useImperativeHandle(ref, () => {
        return {
            navigate,
        }
    }, [navigate])

    return <></>
}

function AuthProvider({ children }: AuthProviderProps) {
    const signedIn = useSessionUser((state) => state.session.signedIn)
    const user = useSessionUser((state) => state.user)
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser(
        (state) => state.setSessionSignedIn,
    )
    const { token, setToken } = useToken()

    const authenticated = Boolean(token && signedIn)

    const navigatorRef = useRef<IsolatedNavigatorRef>(null)

    const redirect = () => {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const redirectUrl = params.get(REDIRECT_URL_KEY)

        navigatorRef.current?.navigate(
            redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath,
        )
    }

    const handleSignIn = async (tokens: Token, user?: User) => {
        setToken(tokens.accessToken)
        setSessionSignedIn(true)

        if (user) {
            const res = await AxiosBase.get('/users/currentUser')
            console.log(res)

            setUser(res?.data)
        }
    }

    const handleSignOut = () => {
        setToken('')
        setUser({})
        setSessionSignedIn(false)
    }

    const signIn = async (values: SignInCredential): AuthResult => {
        const resp = await apiSignIn(values) // Remove try-catch, let errors propagate

        if (resp && resp.accessToken) {
            const { accessToken, refreshToken, ...user } = resp
            console.log(resp)

            handleSignIn({ accessToken, refreshToken }, user)
            redirect()
            return {
                status: 'success',
                message: '',
            }
        }

        return {
            status: 'failed',
            message: 'Unable to sign in',
        }
    }
    const signUp = async (values: SignUpCredential): AuthResult => {
        try {
            const resp = await apiSignUp(values)

            if (resp && resp.accessToken) {
                handleSignIn(
                    {
                        accessToken: resp.accessToken,
                        refreshToken: resp.refreshToken,
                    },
                    {
                        userId: resp.userId,
                        fullName: values.fullName,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                    },
                )

                redirect()

                return {
                    status: 'success',
                    message: resp.message,
                }
            }

            return {
                status: 'failed',
                message: 'Unable to sign up',
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signOut = async () => {
        try {
            await apiSignOut()
        } finally {
            handleSignOut()
            navigatorRef.current?.navigate(appConfig.unAuthenticatedEntryPath)
        }
    }
    const oAuthSignIn = (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => {
        callback({
            onSignIn: handleSignIn,
            redirect,
        })
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                signIn,
                signUp,
                signOut,
                oAuthSignIn,
            }}
        >
            {children}
            <IsolatedNavigator ref={navigatorRef} />
        </AuthContext.Provider>
    )
}

export default AuthProvider
