import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { User } from '@/requests/user'

type SetAction<T> = Dispatch<SetStateAction<T>>
type StateAccessor<T> = [T | undefined, SetAction<T | undefined> | undefined]

export const UserContext = createContext<StateAccessor<User>>([
  undefined,
  undefined,
])
