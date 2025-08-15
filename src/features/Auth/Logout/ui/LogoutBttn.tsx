import { signOut } from 'firebase/auth'

import { auth } from '@shared/api'

export const LogoutBttn = () => {
  const onLogout = () => {
    signOut(auth)
  }
  return <button onClick={onLogout}>Logout</button>
}
