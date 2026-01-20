import { useNavigate } from 'react-router-dom'

import { signOut } from 'firebase/auth'
import { auth } from '~/shared/api'

export const LogoutBttn = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    signOut(auth).then(() => alert('Успешно разлогинен'))
    navigate(0)
  }
  return (
    <button
      className="bg-[orange] cursor-pointer rounded-[4px] border-none p-[8px] w-20 h-10"
      onClick={onLogout}
    >
      Logout
    </button>
  )
}
