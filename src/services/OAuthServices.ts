type Token = {
    accessToken: string
    refreshToken: string
}

type OAuthResponse = {
    token: Token
    user: {
        id: string
        fullName: string
        email?: string
    }
}

async function placeholderFunction(): Promise<OAuthResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: {
                    accessToken: 'placeholder_access_token',
                    refreshToken: 'placeholder_refresh_token',
                },
                user: {
                    id: 'placeholder_id',
                    fullName: 'Placeholder User',
                    email: 'user@example.com',
                },
            })
        }, 500)
    })
}

export async function apiGoogleOauthSignIn(): Promise<OAuthResponse> {
    return await placeholderFunction()
}

export async function apiGithubOauthSignIn(): Promise<OAuthResponse> {
    return await placeholderFunction()
}
