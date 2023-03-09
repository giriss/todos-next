import { Container } from '@mui/material'
import type { FC, ReactNode } from 'react'

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <Container maxWidth="md" sx={{ paddingTop: '50px' }}>
    {children}
  </Container>
)

export default HomeLayout
