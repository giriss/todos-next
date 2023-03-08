import { type FC } from "react"
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Icon,
  Checkbox,
  IconButton
} from '@mui/material'

import { Todo } from "../../requests/todos"

interface TodoListProps {
  todo: Todo
  onDelete: VoidFunction
  onCompleteToggle: VoidFunction
}

const TodoListItem: FC<TodoListProps> = ({ todo, onDelete, onCompleteToggle }) => (
  <ListItem
    disablePadding
    secondaryAction={
      <IconButton onClick={onDelete}>
        <Icon>clear</Icon>
      </IconButton>
    }
  >
    <ListItemButton onClick={onCompleteToggle}>
      <ListItemIcon>
        <Checkbox checked={todo.is_completed} />
      </ListItemIcon>
      <ListItemText primary={todo.title} secondary={todo.description} />
    </ListItemButton>
  </ListItem>
)

export default TodoListItem
