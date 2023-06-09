import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import '@/styles/globals.css'
import Modal from '@/components/Modal'
import LoginModal from '@/components/modal/LoginModal'
import RegisterModal from '@/components/modal/RegisterModal';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react'
import EditModal from '@/components/modal/EditModal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <LoginModal />
      <EditModal />
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
  

}
