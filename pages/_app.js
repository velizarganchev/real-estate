import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/Layout'
import '../styles/custom.scss'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
