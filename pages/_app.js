import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/custom.scss'
import '../styles/style.css'

import Layout from '../components/Layout'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

import { Provider } from 'react-redux'
import { wrapper } from '../redux/store'


export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}