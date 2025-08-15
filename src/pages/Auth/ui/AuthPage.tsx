import { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'

import { SignInWithGoogleBttn, LogoutBttn } from '@features'
import { LoadingScreen } from '@shared'
import { auth } from '@shared/api'

export const AuthPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | 'loading'>('loading')
  console.warn('auth')
  console.warn(isAuthenticated)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    })
  }, [auth])

  if (isAuthenticated === 'loading') {
    return <LoadingScreen />
  }

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="flex flex-col items-center">
      <h1>Welcome to UniqDays</h1>
      <h2>Sign In!</h2>
      <div className="flex flex-col items-center gap-[10px]">
        <SignInWithGoogleBttn />
        <LogoutBttn />
      </div>
    </div>
  )
}
