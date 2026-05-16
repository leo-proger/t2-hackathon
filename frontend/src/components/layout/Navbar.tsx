import { useState, useEffect, useRef } from 'react'
import { NavLink as RouterLink, Link, useLocation } from 'react-router-dom'
import { Sparkles, Zap, LogOut, Menu, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/contexts/AuthContext'

const STUDENT_LINKS = [
  { label: 'Главная',    to: '/' },
  { label: 'Чат',        to: '/chat' },
  { label: 'Расписание', to: '/schedule' },
  { label: 'Инструкция', to: '/guide' },
  { label: 'Квесты',     to: '/quests' },
  { label: 'Корпус',     to: '/campus' },
]

const TEACHER_LINKS = [
  { label: 'Главная',  to: '/' },
  { label: 'Вопросы',  to: '/questions' },
]

export function Navbar() {
  const { user } = useUser()
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const links = user?.status === 'teacher' ? TEACHER_LINKS : STUDENT_LINKS

  // Закрываем меню при смене маршрута
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Закрываем при клике вне меню
  useEffect(() => {
    if (!menuOpen) return
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <div ref={menuRef} className="sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 md:px-5 py-3.5 border-b border-border/60 backdrop-blur-md bg-background/90">
        {/* Логотип */}
        <RouterLink to="/" className="flex items-center gap-2.5">
          <Sparkles className="text-primary" size={22} />
          <span className="text-[19px] font-bold tracking-tight text-foreground">
            Chatt<span className="text-primary">ie</span>
          </span>
        </RouterLink>

        {/* Ссылки — только на десктопе */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <RouterLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 rounded-lg text-[13px] transition-colors duration-150 font-medium',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                )
              }
            >
              {link.label}
            </RouterLink>
          ))}
        </div>

        {/* Правый блок */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {user?.status === 'student' && <XpBadge xp={user.xp} />}
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                  {user?.initials ?? '…'}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={logout}
                title="Выйти"
                className="hidden md:flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
              >
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-primary text-primary-foreground px-4 py-1.5 text-[13px] font-semibold hover:opacity-90 transition-opacity"
            >
              Войти
            </Link>
          )}

          {/* Бургер — только на мобиле */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Меню"
            className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Мобильное выпадающее меню */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/60 shadow-lg">
          <div className="flex flex-col py-2 px-3">
            {links.map((link) => (
              <RouterLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-3 rounded-xl text-[14px] font-medium transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-accent/60'
                  )
                }
              >
                {link.label}
              </RouterLink>
            ))}

            {isAuthenticated && (
              <button
                type="button"
                onClick={() => { logout(); setMenuOpen(false) }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[14px] font-medium text-muted-foreground hover:bg-accent/60 transition-colors mt-1 border-t border-border/40"
              >
                <LogOut size={15} />
                Выйти
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function XpBadge({ xp }: { xp: number }) {
  return (
    <div className="hidden sm:flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
      <Zap size={12} className="fill-primary" />
      {xp} XP
    </div>
  )
}
