import { createContext, useContext, useState } from 'react'
import { api, USE_MOCK } from '@/lib/api'

interface LoginResponse {
  ok: boolean
  access_token: string
  refresh_token: string
}

interface AuthContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const MOCK_EMAIL = 'artem@kgu.ru'
const MOCK_PASSWORD = 'student123'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('chattie_auth') === 'true'
  )

  async function login(email: string, password: string): Promise<boolean> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400))
      if (email.trim() === MOCK_EMAIL && password === MOCK_PASSWORD) {
        setIsAuthenticated(true)
        localStorage.setItem('chattie_auth', 'true')
        return true
      }
      return false
    }

    try {
      // Реальный API: POST /users/login
      // Бэкенд ставит куки JWT автоматически, нам нужно только проверить ok
      const res = await api.post<LoginResponse>('/users/login', { email, password })
      if (res.ok) {
        setIsAuthenticated(true)
        localStorage.setItem('chattie_auth', 'true')
        return true
      }
      return false
    } catch {
      return false
    }
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
