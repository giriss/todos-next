import { FC } from "react"

interface TodoListItemProps {
  children: string
}

const TodoListItem: FC<TodoListItemProps> = ({ children }) => {
  return (
    <li>{children}</li>
  )
}

export default TodoListItem
