/* eslint-disable react-hooks/exhaustive-deps */
import { type FC, useCallback, useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import {
  getTodos,
  updateTodo,
  createTodo as createNewTodo,
  deleteTodo as deleteExistingTodo,
  type Todo,
} from '@/requests/todos'
import { userAtom } from '@/atoms'
import TodoCreator from './TodoCreator'
import TodoList from './TodoList'

interface TodosProps {
  className?: string
}

const Todos: FC<TodosProps> = ({ className }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const user = useAtomValue(userAtom)

  const createTodo = useCallback(
    async (todo: Todo) => {
      if (!user?.token) return

      const newTodo = await createNewTodo(user.token, todo)
      setTodos([...todos, newTodo])
    },
    [todos, user?.token]
  )

  const deleteTodo = useCallback(
    (todoId: number) => {
      if (!user?.token) return

      const remainingTodo = todos.filter(todo => todo.id !== todoId)
      setTodos(remainingTodo)
      void deleteExistingTodo(user.token, todoId)
    },
    [todos, user?.token]
  )

  const toggleComplete = useCallback(
    (todoId: number) => {
      if (!user?.token) return

      const index = todos.findIndex(todo => todo.id === todoId)
      const todo = todos[index]
      const updatedTodos = [...todos]
      updatedTodos[index] = { ...todo, is_completed: !todo.is_completed }
      setTodos(updatedTodos)
      void updateTodo(user.token, todoId, {
        is_completed: !todo.is_completed,
      })
    },
    [todos, user?.token]
  )

  useEffect(() => {
    if (!user?.token) return

    void getTodos(user?.token).then(todos => {
      setTodos(todos)
    })
  }, [user?.token])

  return (
    <div className={className}>
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onCompleteToggle={toggleComplete}
      />
      <TodoCreator onCreate={createTodo} />
    </div>
  )
}

export default Todos
