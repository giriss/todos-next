import Axios from 'axios'
import { ENDPOINT } from '@/lib/constants'

export interface User {
  id?: number
  firstname: string
  lastname: string
  email: string
  token?: string
  password?: string
}

export const createUser = async (user: User): Promise<User> => {
  const { data } = await Axios.post<User>(`${ENDPOINT}/users`, user)
  return data
}

export const loginUser = async (credentials: {
  email: string
  password: string
}): Promise<User> => {
  const { data } = await Axios.get<User>(`${ENDPOINT}/users/login`, {
    params: credentials,
  })
  return data
}
