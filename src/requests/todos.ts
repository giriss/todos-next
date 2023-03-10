import Axios from 'axios'
import { ENDPOINT } from '@/lib/constants'

export interface Todo {
  id?: number
  title: string
  description?: string
  is_completed?: boolean
}

export const getTodos = async (token: string): Promise<Todo[]> => {
  const { data } = await Axios.get<Todo[]>(`${ENDPOINT}/todos`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const createTodo = async (token: string, todo: Todo): Promise<Todo> => {
  const { data } = await Axios.post<Todo>(`${ENDPOINT}/todos`, todo, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const updateTodo = async (
  token: string,
  id: number,
  valToUpdate: Partial<Todo>
): Promise<Todo> => {
  const { data } = await Axios.patch<Todo>(
    `${ENDPOINT}/todos/${id}`,
    valToUpdate,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

export const deleteTodo = async (token: string, id: number): Promise<void> => {
  await Axios.delete(`${ENDPOINT}/todos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
