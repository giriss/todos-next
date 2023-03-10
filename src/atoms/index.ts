import { atom } from 'jotai'
import stringify from 'fast-safe-stringify'
import { type User } from '@/requests/user'

type Maybe<T> = T | undefined

let initialUser: Maybe<User>
if (typeof window !== 'undefined') {
  const storedUser = sessionStorage.getItem('user')
  if (storedUser) {
    initialUser = JSON.parse(storedUser)
  }
}

const userAtomWithoutPersistance = atom<Maybe<User>>(initialUser)

export const userAtom = atom(
  get => get(userAtomWithoutPersistance),
  (_get, set, newUser: Maybe<User>) => {
    set(userAtomWithoutPersistance, newUser)
    if (newUser) {
      sessionStorage.setItem('user', stringify(newUser))
    } else {
      sessionStorage.removeItem('user')
    }
  }
)
