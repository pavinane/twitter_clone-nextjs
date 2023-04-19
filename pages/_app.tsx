import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import '@/styles/globals.css'
import Modal from '@/components/Modal'
import LoginModal from '@/components/modal/LoginModal'
import RegisterModal from '@/components/modal/RegisterModal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <LoginModal />
    <RegisterModal/>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
    
  )
  

}
