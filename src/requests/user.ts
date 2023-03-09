import Axios from 'axios'
import { ENDPOINT } from '@/lib/constants'

interface User {
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
