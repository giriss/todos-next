import Register from '@/components/Register'
import HomeLayout from '@/layouts/HomeLayout'
import type { NextPageWithLayout } from '@/pages/_app'
import { Grid } from '@mui/material'

const Index: NextPageWithLayout = () => (
  <Grid container>
    <Grid item xs={6}>
      <Register />
    </Grid>
    <Grid item xs={6}></Grid>
  </Grid>
)

Index.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Index
