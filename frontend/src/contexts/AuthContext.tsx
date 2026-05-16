import { createContext, useContext, useState } from 'react'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const DEMO_EMAIL = 'artem@kgu.ru'
const DEMO_PASSWORD = 'student123'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('chattie_auth') === 'true'
  )

  function login(email: string, password: string): boolean {
    if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('chattie_auth', 'true')
      return true
    }
    return false
  }

  function logout() {
    setIsAuthenticated(false)
    localStorage.removeItem('chattie_auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
