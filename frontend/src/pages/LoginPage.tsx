import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/PageTransition'

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
    const ok = await login(email, password)
    setLoading(false)
    if (ok) {
      navigate('/')
    } else {
      setError(true)
    }
  }

  return (
    <PageTransition>
    <main className="min-h-[calc(100vh-57px)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Шапка */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/mascot.png"
            alt="Chattie"
            className="w-28 select-none drop-shadow-xl mb-4"
            style={{ mixBlendMode: 'multiply' }}
          />
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Chatt<span className="text-primary">ie</span>
          </h1>
          <p className="text-[16px] font-medium text-foreground/60 mt-1">
            Войди, чтобы продолжить
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 shadow-sm"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-semibold text-foreground/70" htmlFor="email">
              Эл. почта
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="artem@kgu.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  'w-full rounded-xl border bg-background pl-10 pr-3 py-3 text-[15px] outline-none transition-colors',
                  'placeholder:text-muted-foreground/50',
                  'focus:border-primary focus:ring-2 focus:ring-primary/20',
                  error ? 'border-red-400' : 'border-border',
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-semibold text-foreground/70" htmlFor="password">
              Пароль
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={cn(
                  'w-full rounded-xl border bg-background pl-10 pr-3 py-3 text-[15px] outline-none transition-colors',
                  'placeholder:text-muted-foreground/50',
                  'focus:border-primary focus:ring-2 focus:ring-primary/20',
                  error ? 'border-red-400' : 'border-border',
                )}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-[13px] font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
              <AlertCircle size={15} className="shrink-0" />
              Неверная почта или пароль
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl bg-primary text-primary-foreground py-3 text-[16px] font-bold transition-opacity hover:opacity-90 disabled:opacity-60 shadow-lg shadow-primary/20"
          >
            {loading ? 'Входим…' : 'Войти'}
          </button>

        </form>
      </div>
    </main>
    </PageTransition>
  )
}
