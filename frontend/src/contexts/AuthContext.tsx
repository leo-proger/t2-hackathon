import { createContext, useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
  /** регистрируем колбэк сброса данных из UserContext */
  registerResetUser: (fn: () => void) => void
}

const MOCK_EMAIL = 'artem@kgu.ru'
const MOCK_PASSWORD = 'student123'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('chattie_auth') === 'true'
  )
  const navigate = useNavigate()
  const resetUserRef = useRef<(() => void) | null>(null)

  function registerResetUser(fn: () => void) {
    resetUserRef.current = fn
  }

  async function login(email: string, password: string): Promise<boolean> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400))
      if (email.trim() === MOCK_EMAIL && password === MOCK_PASSWORD) {
        resetUserRef.current?.()        // сбрасываем старые данные юзера
        setIsAuthenticated(true)
        localStorage.setItem('chattie_auth', 'true')
        return true
      }
      return false
    }

    try {
      const res = await api.post<LoginResponse>('/api/users/login', { email, password })
      if (res.ok) {
        resetUserRef.current?.()
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
    resetUserRef.current?.()            // сбрасываем данные юзера
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, registerResetUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
