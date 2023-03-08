import TodoApp from "@/components/TodoApp"
import useSWR from "swr"
import { createTodo, getTodos, type Todo } from "@/requests/todos"
import { useCallback, useEffect, useRef, useState } from "react"

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const mounted = useRef(false)

  const createNewTodo = useCallback(async (todo: Todo) => {
    await createTodo(todo)
    setTodos(await getTodos())
  }, [])

  useEffect(() => {
    mounted.current = true
    getTodos().then(todos => mounted.current && setTodos(todos))

    return () => {
      mounted.current = false
    }
  }, [])

  return (
    <TodoApp todos={todos} onCreate={createNewTodo} />
  )
}

export default Todos
