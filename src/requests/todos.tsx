import { ENDPOINT } from '@/lib/constants'
import Axios from 'axios'

export interface Todo {
  id?: number
  title: string
  description?: string
}

export const getTodos = async () => {
  const { data: todos } = await Axios.get<Todo[]>(`${ENDPOINT}/todos`)
  return todos
}

export const createTodo = async (todo: Todo) => {
  const { data: createdTodo } = await Axios.post<Todo>(`${ENDPOINT}/todos`, todo)
  return createdTodo
}
