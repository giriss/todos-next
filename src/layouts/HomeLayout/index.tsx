import { UserContext } from '@/contexts'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { type FC, type ReactNode, useContext, useEffect } from 'react'

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useContext(UserContext)
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
