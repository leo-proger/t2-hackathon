import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

interface Props {
  hint: string
  children: React.ReactNode
}

export function AuthGate({ hint, children }: Props) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <>{children}</>

  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col items-center text-center gap-5 max-w-sm"
      >
        <img
          src="/mascot.png"
          alt="Chattie"
          className="w-36 select-none drop-shadow-xl"
          style={{ mixBlendMode: 'multiply' }}
        />

        <div className="flex flex-col gap-1.5">
          <p className="text-[22px] font-extrabold text-foreground leading-tight">
            {hint}
          </p>
          <p className="text-[15px] font-medium text-foreground/60">
            Для доступа нужен аккаунт
          </p>
        </div>

        <Link
          to="/login"
          className="rounded-2xl bg-primary text-primary-foreground px-8 py-3 text-[16px] font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
        >
          Войти
        </Link>
      </motion.div>
    </div>
  )
}
