import Grid from '@mui/material/Grid'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import { type FC, useCallback } from 'react'
import { Formik, type FormikProps } from 'formik'
import validations from './validations'
import { createUser } from '@/requests/user'

interface FormValues {
  firstname: string
  lastname: string
  email: string
  password: string
  password_confirm: string
}

const initialValues: FormValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirm: '',
}

const Register: FC = () => {
  const submitCreateUser = useCallback(
    async ({ password_confirm: _pc, ...permittedValues }: FormValues) =>
      await createUser(permittedValues),
    []
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={submitCreateUser}
    >
      {props => <RegisterForm {...props} />}
    </Formik>
  )
}

const RegisterForm: FC<FormikProps<FormValues>> = ({
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
        <Grid item xs={6}>
          <TextField {...generateInputFields('First name', 'firstname')} />
        </Grid>
        <Grid item xs={6}>
          <TextField {...generateInputFields('Last name', 'lastname')} />
        </Grid>
        <Grid item xs={12}>
          <TextField {...generateInputFields('E-mail', 'email')} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...generateInputFields('Password', 'password', 'password')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...generateInputFields(
              'Retype password',
              'password_confirm',
              'password'
            )}
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
            Register
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default Register
