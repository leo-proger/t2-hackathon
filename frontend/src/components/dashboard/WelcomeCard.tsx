import { Progress } from '@/components/ui/progress'
import type { User } from '@/types'

interface Props {
  user: User | null
  loading: boolean
}

export function WelcomeCard({ user, loading }: Props) {
  if (loading || !user) return <CardSkeleton />

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/8 p-5 flex flex-col h-full overflow-hidden">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-primary/70 mb-1">
        Добро пожаловать
      </p>
      <h2 className="text-xl font-semibold" style={{ color: 'oklch(0.35 0.15 262)' }}>
        Привет, {user.name} 👋
      </h2>
      <p className="text-[12px] mt-0.5 mb-4" style={{ color: 'oklch(0.50 0.12 262)' }}>
        {user.faculty} · {user.year} курс · {user.week} неделя
      </p>

      <p className="text-[11px] font-medium mb-1.5" style={{ color: 'oklch(0.52 0.14 262)' }}>
        Прогресс адаптации
      </p>
      <Progress
        value={user.adaptationProgress}
        className="h-1.5"
        style={{ background: 'oklch(0.82 0.06 262)' } as React.CSSProperties}
        indicatorClassName="bg-primary"
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-[11px]" style={{ color: 'oklch(0.52 0.14 262)' }}>
          {user.adaptationProgress}% пройдено
        </span>
        <span className="text-[11px]" style={{ color: 'oklch(0.52 0.14 262)' }}>
          уровень {user.level}
        </span>
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/8 p-5 flex flex-col h-full gap-3 animate-pulse">
      <div className="h-2.5 w-28 rounded bg-primary/20" />
      <div className="h-5 w-40 rounded bg-primary/20" />
      <div className="h-2 w-32 rounded bg-primary/15" />
      <div className="h-1.5 w-full rounded-full bg-primary/20 mt-2" />
    </div>
  )
}

