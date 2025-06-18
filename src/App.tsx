import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import { Toaster } from 'react-hot-toast'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Views />
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
            <Toaster position="top-right" />
        </Theme>
    )
}

export default App
