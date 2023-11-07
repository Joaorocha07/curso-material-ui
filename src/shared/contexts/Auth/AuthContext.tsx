/* eslint-disable max-len */
'use client'
import { AuthService } from '@/shared/services/api/auth/AuthService'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface IAuthContextData {
    isAuthenticated: boolean
    logout: () => void
    login: (email: string, password: string) => Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData)

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'

export const AuthProvider = ({
  children
}: {
    children: React.ReactNode
}) => {
  const [accessToken, setAccessToken] = useState<string>()

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN)

    console.log(accessToken)

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken))
      console.log(accessToken)
    }
  })

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password)

    console.log(result)

    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken))
      setAccessToken(result.accessToken)
    }
  }, [])
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN)
    setAccessToken(undefined)
  }, [])

  console.log(accessToken)

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        logout: handleLogout, 
        login: handleLogin 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)