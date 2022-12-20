import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { UserProvider } from '../context/auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserProvider>
  )
}
