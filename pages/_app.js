import 'bootstrap-css-only/css/bootstrap.min.css';
import '../styles/custom.scss'
import '../styles/style.css'

import '@fortawesome/fontawesome-free/css/all.min.css';

import { store } from '../redux/store'
import { Provider } from 'react-redux'

import { SessionProvider } from "next-auth/react"

import Layout from '../components/Layout/Layout'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>

  )
}

