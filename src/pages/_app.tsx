/* eslint-disable react-hooks/exhaustive-deps */
import stringify from 'fast-safe-stringify'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { type FC, useState, useMemo, useEffect } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { type StateAccessor, UserContext } from '@/contexts'
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
  const [user, setUser] = useState<User | undefined>()
  const getLayout =
    Component.getLayout ?? (page => <DashboardLayout>{page}</DashboardLayout>)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user))
    } else {
      sessionStorage.removeItem('user')
    }
  }, [stringify(user)])

  const userAccessor = useMemo<StateAccessor<User>>(
    () => [user, setUser],
    [stringify(user)]
  )

  return (
    <UserContext.Provider value={userAccessor}>
      {getLayout(<Component {...pageProps} />)}
    </UserContext.Provider>
  )
}

export default App
