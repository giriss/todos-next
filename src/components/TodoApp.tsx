import { type Todo } from "@/requests/todos";
import { type FC, useCallback, useState, useMemo, useEffect } from "react";
import TodoCreator from "./TodoCreator";
import TodoList from "./TodoList";

interface TodoAppProps {
  todos: Todo[]
  onCreate: (todo: Todo) => void
}

const TodoApp: FC<TodoAppProps> = ({ todos, onCreate }) => {
  const initialTodoTitles = useMemo(() => todos.map(({ title }) => title), [todos])
  const [todoTitles, setTodoTitles] = useState(initialTodoTitles)

  const createTodo = useCallback((title: string) => {
    setTodoTitles([...todoTitles, title])
    onCreate({ title })
  }, [todoTitles, onCreate])

  useEffect(() => {
    setTodoTitles(initialTodoTitles)
  }, [initialTodoTitles])

  return (
    <>
      <TodoList todos={todoTitles} />
      <TodoCreator onCreate={createTodo} />
    </>
  );
}

export default TodoApp;
