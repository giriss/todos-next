/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactNode, FC } from 'react'
import { Provider } from 'jotai'
import DashboardLayout from '@/layouts/DashboardLayout'

export type GetLayoutType = (page: JSX.Element) => JSX.Element

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: GetLayoutType | undefined
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  let child: ReactNode
  if (Component.getLayout) {
    child = Component.getLayout(<Component {...pageProps} />)
  } else {
    child = (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    )
  }

  return <Provider>{child}</Provider>
}

export default App
