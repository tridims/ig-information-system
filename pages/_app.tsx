import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="border-slate-500 bg-[#181a1b]">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
