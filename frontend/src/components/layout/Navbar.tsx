import { Sparkles, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Главная', href: '#', active: true },
  { label: 'Расписание', href: '#' },
  { label: 'Квесты', href: '#' },
  { label: 'Корпус', href: '#' },
  { label: 'Куратор', href: '#' },
]

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 backdrop-blur-md bg-background/80 sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Sparkles className="text-primary" size={18} />
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          Chatt<span className="text-primary">ie</span>
        </span>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.label} label={link.label} href={link.href} active={link.active} />
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2.5">
        <XpBadge xp={340} />
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">АИ</AvatarFallback>
        </Avatar>
      </div>
    </motion.nav>
  )
}

function NavLink({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        'px-3 py-1.5 rounded-lg text-[13px] transition-colors duration-150 font-medium',
        active
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
      )}
    >
      {label}
    </a>
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
