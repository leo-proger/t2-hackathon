import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from 'react'
import { getMe } from '@/services/user.service'
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

  const refetch = useCallback(async () => {
    setLoading(true)
    try { setUser(await getMe()) } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { void refetch() }, [refetch])

  return (
    <UserContext.Provider value={{ user, loading, refetch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
