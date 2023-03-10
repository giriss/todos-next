import { Container } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { type FC, type ReactNode, useEffect } from 'react'
import { userAtom } from '@/atoms'

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAtomValue(userAtom)
  const router = useRouter()

  useEffect(() => {
    if (user?.token) {
      void router.push('/dashboard')
    }
  }, [router, user?.token])

  return (
    <Container maxWidth="md" sx={{ paddingTop: '50px' }}>
      {children}
    </Container>
  )
}

export default HomeLayout
