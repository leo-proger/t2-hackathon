import { Progress } from '@/components/ui/progress'
import type { User } from '@/types'

interface Props {
  user: User | null
  loading: boolean
}

export function WelcomeCard({ user, loading }: Props) {
  if (loading || !user) return <CardSkeleton />

  const subtitle =
    user.status === 'teacher'
      ? user.faculty
      : `${user.faculty} · ${user.year} курс · ${user.group}`

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/8 p-5 flex flex-col h-full overflow-hidden">
      <p className="text-[12px] font-semibold uppercase tracking-widest text-primary/80 mb-1">
        Добро пожаловать
      </p>
      <h2 className="text-2xl font-bold" style={{ color: 'oklch(0.30 0.16 262)' }}>
        Привет, {user.name} 👋
      </h2>
      <p className="text-[14px] font-medium mt-1 mb-4" style={{ color: 'oklch(0.45 0.13 262)' }}>
        {subtitle}
      </p>

      {user.status === 'student' && (
        <>
          <p className="text-[12px] font-semibold mb-1.5" style={{ color: 'oklch(0.45 0.14 262)' }}>
            Уровень {user.level} — прогресс
          </p>
          <Progress
            value={user.levelProgress}
            className="h-2"
            style={{ background: 'oklch(0.80 0.07 262)' } as React.CSSProperties}
            indicatorClassName="bg-primary"
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-[12px] font-medium" style={{ color: 'oklch(0.45 0.14 262)' }}>
              {user.xp} XP
            </span>
            <span className="text-[12px] font-medium" style={{ color: 'oklch(0.45 0.14 262)' }}>
              {user.levelProgress}% до уровня {user.level + 1}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/8 p-5 flex flex-col h-full gap-3 animate-pulse">
      <div className="h-2.5 w-28 rounded bg-primary/20" />
      <div className="h-6 w-44 rounded bg-primary/20" />
      <div className="h-3 w-36 rounded bg-primary/15" />
      <div className="h-2 w-full rounded-full bg-primary/20 mt-2" />
    </div>
  )
}
