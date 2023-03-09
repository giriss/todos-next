import {
  type FC,
  type FormEvent,
  useCallback,
  type ChangeEvent,
  useState,
} from 'react'
import { TextField, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { type Todo } from '../../requests/todos'

interface TodoCreatorProps {
  className?: string
  onCreate: (newTodo: Todo) => Promise<void>
}

const TodoCreator: FC<TodoCreatorProps> = ({ onCreate, className }) => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const valueChanged = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value)
    },
    []
  )

  const formSubmitted = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (value === '') return

      const [title, ...descriptions] = value.split('\n')
      setLoading(true)
      void onCreate({ title, description: descriptions.join('\n') }).then(
        () => {
          setLoading(false)
          setValue('')
        }
      )
    },
    [onCreate, value]
  )

  return (
    <form className={className} onSubmit={formSubmitted}>
      <Stack spacing={1}>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={value}
          onChange={valueChanged}
          disabled={loading}
          label="What do you want to do?"
          size="small"
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          disabled={value === ''}
        >
          Create
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default TodoCreator
