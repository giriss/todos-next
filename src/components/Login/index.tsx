import Grid from '@mui/material/Grid'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import { type FC, useCallback, useContext } from 'react'
import { Formik, type FormikProps } from 'formik'
import validations from './validations'
import { loginUser } from '@/requests/user'
import { UserContext } from '@/contexts'

interface FormValues {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: '',
  password: '',
}

const Login: FC = () => {
  const [, setUser] = useContext(UserContext)
  const submitCreateUser = useCallback(
    async (credentials: FormValues) => {
      const user = await loginUser(credentials)
      if (setUser) setUser(user)
    },
    [setUser]
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={submitCreateUser}
    >
      {props => <LoginForm {...props} />}
    </Formik>
  )
}

const LoginForm: FC<FormikProps<FormValues>> = ({
  values,
  errors,
  touched,
  isValid,
  dirty,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const generateInputFields = (
    label: string,
    name: keyof FormValues,
    type: TextFieldProps['type'] = 'text'
  ): TextFieldProps => ({
    label,
    name,
    type,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && !!errors[name],
    helperText: touched[name] && errors[name],
    fullWidth: true,
  })

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField {...generateInputFields('E-mail', 'email')} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...generateInputFields('Password', 'password', 'password')}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            disabled={!dirty || !isValid}
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default Login
