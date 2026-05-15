import { cn } from '@/lib/utils'

const WEEK = [true, true, true, true, true, true, true]

export function StreakCard() {
  return (
    <div className="rounded-2xl border border-border bg-secondary/60 p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
        Стрик
      </p>
      <div className="flex items-end gap-1.5 flex-1">
        <span className="text-4xl font-bold text-amber-600 leading-none">7</span>
        <span className="text-[12px] text-muted-foreground pb-1">дней подряд 🔥</span>
      </div>

      <div className="flex gap-1.5 mt-3">
        {WEEK.map((active, i) => (
          <div
            key={i}
            className={cn(
              'h-3 w-3 rounded-sm',
              active ? (i >= 5 ? 'bg-emerald-500' : 'bg-emerald-300') : 'bg-border'
            )}
          />
        ))}
      </div>
    </div>
  )
}
