import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/custom.scss'
import '../styles/style.css'

import '@fortawesome/fontawesome-free/css/all.min.css';

import { useEffect } from "react";

import { store } from '../redux/store'
import { Provider } from 'react-redux'

import { SessionProvider } from "next-auth/react"

import Layout from '../components/layout/Layout'

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

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

