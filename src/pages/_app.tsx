import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { FC } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'

export type GetLayoutType = (page: JSX.Element) => JSX.Element

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: GetLayoutType
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ?? (page => <DashboardLayout>{page}</DashboardLayout>)

  return getLayout(<Component {...pageProps} />)
}

export default App
