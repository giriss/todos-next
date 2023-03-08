import { FC } from "react"
import TodoListItem from "./TodoListItem"

interface TodoListProps {
  todos: string[]
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => <TodoListItem key={todo}>{todo}</TodoListItem>)}
    </ul>
  )
}

export default TodoList
