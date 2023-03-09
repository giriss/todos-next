import * as Yup from 'yup'

const validations = Yup.object().shape({
  email: Yup.string().trim().required().matches(/.@./),
  password: Yup.string().required(),
})

export default validations
