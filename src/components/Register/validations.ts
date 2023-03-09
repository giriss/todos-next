import * as Yup from 'yup'

const validations = Yup.object().shape({
  firstname: Yup.string().trim().required(),
  lastname: Yup.string().trim().required(),
  email: Yup.string().trim().required().matches(/.@./),
  password: Yup.string().required().min(8),
  password_confirm: Yup.string().test(
    'match',
    'Passwords must match',
    (passwordConfirm, { parent: { password } }) => password === passwordConfirm
  ),
})

export default validations
