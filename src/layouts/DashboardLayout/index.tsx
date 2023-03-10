import { UserContext } from '@/contexts'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Icon from '@mui/material/Icon'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type FC, useState, type ReactNode, useContext, useEffect } from 'react'

type Tab = 'dashboard' | 'table' | 'todos'

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [user] = useContext(UserContext)
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<Tab>(
    router.route.substring(1) as Tab
  )

  useEffect(() => {
    if (!user?.token) {
      void router.push('/')
    }
  }, [router, user?.token])

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <MenuList>
            <MenuItem
              selected={currentTab === 'dashboard'}
              onClick={() => {
                setCurrentTab('dashboard')
              }}
              component={Link}
              href="/dashboard"
            >
              <ListItemIcon>
                <Icon>house</Icon>
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem
              selected={currentTab === 'table'}
              onClick={() => {
                setCurrentTab('table')
              }}
              component={Link}
              href="/table"
            >
              <ListItemIcon>
                <Icon>table chart</Icon>
              </ListItemIcon>
              <ListItemText>Table</ListItemText>
            </MenuItem>
            <MenuItem
              selected={currentTab === 'todos'}
              onClick={() => {
                setCurrentTab('todos')
              }}
              component={Link}
              href="/todos"
            >
              <ListItemIcon>
                <Icon>toc</Icon>
              </ListItemIcon>
              <ListItemText>Todo</ListItemText>
            </MenuItem>
          </MenuList>
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardLayout
