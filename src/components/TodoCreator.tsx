import { FC, FormEvent, useCallback, useRef } from "react"

interface TodoCreatorProps {
  onCreate: (val: string) => void
}

const TodoCreator: FC<TodoCreatorProps> = ({ onCreate }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const formSubmitted = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onCreate(inputRef.current!.value)
    inputRef.current!.value = ""
  }, [onCreate])

  return (
    <form onSubmit={formSubmitted}>
      <input ref={inputRef} />
      <button>Create</button>
    </form>
  )
}

export default TodoCreator
