import { cn } from '@/lib/utils'

interface Props {
  days?: number
  history?: boolean[]
  loading: boolean
}

export function StreakCard({ days, history = [], loading }: Props) {
  if (loading) return <CardSkeleton />

  return (
    <div className="rounded-2xl border border-border bg-secondary/60 p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
        Стрик
      </p>
      <div className="flex items-end gap-1.5 flex-1">
        <span className="text-4xl font-bold text-amber-600 leading-none">{days ?? 0}</span>
        <span className="text-[12px] text-muted-foreground pb-1">дней подряд 🔥</span>
      </div>

      <div className="flex gap-1.5 mt-3">
        {history.map((active, i) => (
          <div
            key={i}
            className={cn(
              'h-3 w-3 rounded-sm',
              active ? (i >= history.length - 2 ? 'bg-emerald-500' : 'bg-emerald-300') : 'bg-border'
            )}
          />
        ))}
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-secondary/60 p-5 flex flex-col h-full gap-3 animate-pulse">
      <div className="h-2.5 w-12 rounded bg-muted" />
      <div className="h-9 w-20 rounded bg-muted" />
      <div className="flex gap-1.5 mt-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-3 w-3 rounded-sm bg-muted" />
        ))}
      </div>
    </div>
  )
}
