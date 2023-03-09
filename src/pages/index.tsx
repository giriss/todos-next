import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Login from '@/components/Login'
import Register from '@/components/Register'
import HomeLayout from '@/layouts/HomeLayout'
import type { NextPageWithLayout } from '@/pages/_app'

const Index: NextPageWithLayout = () => (
  <Grid container>
    <Grid item xs>
      <Register />
    </Grid>
    <Divider flexItem orientation="vertical">
      <Typography variant="body1">OR</Typography>
    </Divider>
    <Grid item xs>
      <Login />
    </Grid>
  </Grid>
)

Index.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Index
