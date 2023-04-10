import '@/styles/styles.css'
import Navbar from './navBar'

export default function App({ Component, pageProps }) {
  return (
  <>
  <Navbar />
  <Component {...pageProps} />
  </>
  )
}
