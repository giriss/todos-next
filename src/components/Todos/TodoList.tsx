import { type FC } from 'react'
import List from '@mui/material/List'
import TodoListItem from './TodoListItem'
import { type Todo } from '../../requests/todos'

interface TodoListProps {
  todos: Todo[]
  onDelete: (todoId: number) => void
  onCompleteToggle: (todoId: number) => void
}

const TodoList: FC<TodoListProps> = ({ todos, onDelete, onCompleteToggle }) => {
  if (todos.length === 0) {
    return null
  }

  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      {todos.map(todo => (
        <TodoListItem
          key={todo.id ?? todo.title}
          todo={todo}
          onDelete={() => {
            todo.id != null && onDelete(todo.id)
          }}
          onCompleteToggle={() => {
            todo.id != null && onCompleteToggle(todo.id)
          }}
        />
      ))}
    </List>
  )
}

export default TodoList
