import { FC, useCallback, useEffect, useState } from "react"
import TodoCreator from "./TodoCreator"
import TodoList from "./TodoList"
import {
  getTodos,
  createTodo as createNewTodo,
  deleteTodo as deleteExistingTodo,
  type Todo,
  updateTodo
} from "../../requests/todos"

interface TodosProps {
  className?: string
}

const Todos: FC<TodosProps> = ({ className }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const createTodo = useCallback(async (todo: Todo) => {
    const newTodo = await createNewTodo(todo)
    setTodos([...todos, newTodo])
  }, [todos])

  const deleteTodo = useCallback((todoId: number) => {
    const remainingTodo = todos.filter(todo => todo.id !== todoId)
    setTodos(remainingTodo)
    deleteExistingTodo(todoId)
  }, [todos])

  const toggleComplete = useCallback((todoId: number) => {
    const index = todos.findIndex(todo => todo.id === todoId)
    const todo = todos[index]
    const updatedTodos = [...todos]
    updatedTodos[index] = { ...todo, is_completed: !todo.is_completed }
    setTodos(updatedTodos)
    updateTodo(todoId, { is_completed: !todo.is_completed })
  }, [todos])

  useEffect(() => {
    getTodos().then(todos => setTodos(todos))
  }, [])

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
