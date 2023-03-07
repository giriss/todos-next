import { useCallback, useState } from "react";
import TodoCreator from "./TodoCreator";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState<string[]>([])
  const createTodo = useCallback((val: string) => {
    setTodos([...todos, val])
  }, [todos])

  return (
    <>
      <TodoList todos={todos} />
      <TodoCreator onCreate={createTodo} />
    </>
  );
}

export default TodoApp;
