import { NavLink as RouterLink } from 'react-router-dom'
import { Sparkles, Zap } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/useUser'

const NAV_LINKS = [
  { label: 'Главная',     to: '/' },
  { label: 'Расписание',  to: '/schedule' },
  { label: 'Инструкция',  to: '/guide' },
  { label: 'Квесты',      to: '/quests' },
  { label: 'Корпус',      to: '/campus' },
  { label: 'Куратор',     to: '/tutor' },
]

export function Navbar() {
  const { data: user } = useUser()

  return (
    <nav className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <RouterLink to="/" className="flex items-center gap-2">
        <Sparkles className="text-primary" size={18} />
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          Chatt<span className="text-primary">ie</span>
        </span>
      </RouterLink>

      <div className="flex items-center gap-1">
        {NAV_LINKS.map((link) => (
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

      <div className="flex items-center gap-2.5">
        {user && <XpBadge xp={user.xp} />}
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
            {user?.initials ?? '…'}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}

function XpBadge({ xp }: { xp: number }) {
  return (
    <div className="flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
      <Zap size={12} className="fill-primary" />
      {xp} XP
    </div>
  )
}
