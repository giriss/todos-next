/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type FC, useCallback, useEffect, useState, useContext } from 'react'
import TodoCreator from './TodoCreator'
import TodoList from './TodoList'
import {
  getTodos,
  createTodo as createNewTodo,
  deleteTodo as deleteExistingTodo,
  type Todo,
  updateTodo,
} from '../../requests/todos'
import { UserContext } from '@/contexts'

interface TodosProps {
  className?: string
}

const Todos: FC<TodosProps> = ({ className }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [user] = useContext(UserContext)

  const createTodo = useCallback(
    async (todo: Todo) => {
      const newTodo = await createNewTodo(user!.token!, todo)
      setTodos([...todos, newTodo])
    },
    [todos, user?.token]
  )

  const deleteTodo = useCallback(
    (todoId: number) => {
      const remainingTodo = todos.filter(todo => todo.id !== todoId)
      setTodos(remainingTodo)
      void deleteExistingTodo(user!.token!, todoId)
    },
    [todos, user?.token]
  )

  const toggleComplete = useCallback(
    (todoId: number) => {
      const index = todos.findIndex(todo => todo.id === todoId)
      const todo = todos[index]
      const updatedTodos = [...todos]
      updatedTodos[index] = { ...todo, is_completed: !todo.is_completed }
      setTodos(updatedTodos)
      void updateTodo(user!.token!, todoId, {
        is_completed: !todo.is_completed,
      })
    },
    [todos, user?.token]
  )

  useEffect(() => {
    void getTodos(user!.token!).then(todos => {
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
