import Axios from 'axios'
import { ENDPOINT } from '../lib/constants'

export interface Todo {
  id?: number
  title: string
  description?: string
  is_completed?: boolean
}

export const getTodos = async () => {
  const { data } = await Axios.get<Todo[]>(`${ENDPOINT}/todos`)
  return data
}

export const createTodo = async (todo: Todo) => {
  const { data } = await Axios.post<Todo>(`${ENDPOINT}/todos`, todo)
  return data
}

export const updateTodo = async (id: number, valToUpdate: Partial<Todo>) => {
  const { data } = await Axios.patch<Todo>(`${ENDPOINT}/todos/${id}`, valToUpdate)
  return data
}

export const deleteTodo = async (id: number) => {
  await Axios.delete(`${ENDPOINT}/todos/${id}`)
}
