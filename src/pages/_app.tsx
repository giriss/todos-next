import { Container, Grid, Icon, Link, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <MenuList>
            <MenuItem component={Link} href="/">
              <ListItemIcon>
                <Icon>house</Icon>
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem component={Link} href="/table">
              <ListItemIcon>
                <Icon>table chart</Icon>
              </ListItemIcon>
              <ListItemText>Table</ListItemText>
            </MenuItem>
            <MenuItem component={Link} href="/todos">
              <ListItemIcon>
                <Icon>toc</Icon>
              </ListItemIcon>
              <ListItemText>
                Todo
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Grid>
        <Grid item xs={8}>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </Container>
  )
}
