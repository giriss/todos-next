import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { type FC, useState } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { UserContext } from '@/contexts'
import { type User } from '@/requests/user'

export type GetLayoutType = (page: JSX.Element) => JSX.Element

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: GetLayoutType
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const userState = useState<User | undefined>()
  const getLayout =
    Component.getLayout ?? (page => <DashboardLayout>{page}</DashboardLayout>)

  return (
    <UserContext.Provider value={userState}>
      {getLayout(<Component {...pageProps} />)}
    </UserContext.Provider>
  )
}

export default App
