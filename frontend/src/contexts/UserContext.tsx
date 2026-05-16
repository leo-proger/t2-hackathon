import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from 'react'
import { getMe } from '@/services/user.service'
import { useAuth } from '@/contexts/AuthContext'
import type { User } from '@/types'

interface UserCtx {
  user: User | null
  loading: boolean
  refetch: () => Promise<void>
}

const UserContext = createContext<UserCtx>({ user: null, loading: true, refetch: async () => {} })

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, registerResetUser } = useAuth()

  const refetch = useCallback(async () => {
    setLoading(true)
    try { setUser(await getMe()) } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [])

  // Регистрируем сброс: AuthContext вызовет при logout и перед login
  useEffect(() => {
    registerResetUser(() => {
      setUser(null)
      setLoading(true)
    })
  }, [registerResetUser])

  // Загружаем данные когда залогинены, очищаем когда нет
  useEffect(() => {
    if (isAuthenticated) {
      void refetch()
    } else {
      setUser(null)
      setLoading(false)
    }
  }, [isAuthenticated, refetch])

  return (
    <UserContext.Provider value={{ user, loading, refetch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
