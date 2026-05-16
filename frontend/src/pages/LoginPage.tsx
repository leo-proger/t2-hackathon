import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(false)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    const ok = login(email, password)
    setLoading(false)
    if (ok) {
      navigate('/')
    } else {
      setError(true)
    }
  }

  return (
    <main className="min-h-[calc(100vh-57px)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="text-primary" size={22} />
            <span className="text-2xl font-semibold tracking-tight">
              Chatt<span className="text-primary">ie</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Войди, чтобы продолжить</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 shadow-sm"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted-foreground" htmlFor="email">
              Эл. почта
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="artem@kgu.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  'w-full rounded-xl border bg-background pl-9 pr-3 py-2.5 text-sm outline-none transition-colors',
                  'placeholder:text-muted-foreground/50',
                  'focus:border-primary focus:ring-2 focus:ring-primary/20',
                  error ? 'border-red-400' : 'border-border',
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted-foreground" htmlFor="password">
              Пароль
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={cn(
                  'w-full rounded-xl border bg-background pl-9 pr-3 py-2.5 text-sm outline-none transition-colors',
                  'placeholder:text-muted-foreground/50',
                  'focus:border-primary focus:ring-2 focus:ring-primary/20',
                  error ? 'border-red-400' : 'border-border',
                )}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
              <AlertCircle size={14} className="shrink-0" />
              Неверная почта или пароль
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Входим…' : 'Войти'}
          </button>

          <p className="text-center text-[11px] text-muted-foreground/70 mt-1">
            artem@kgu.ru · student123
          </p>
        </form>
      </div>
    </main>
  )
}
