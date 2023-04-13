import '@/styles/styles.css'
import Navbar from './Navbar'

export default function App({ Component, pageProps }) {
  return (
  <>
  <Navbar />
  <Component {...pageProps} />
  </>
  )
}
