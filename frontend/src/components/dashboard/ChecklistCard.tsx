import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChecklistItem } from '@/types'

interface Props {
  items: ChecklistItem[]
  loading: boolean
  onComplete: (id: string) => Promise<void>
}

export function ChecklistCard({ items, loading, onComplete }: Props) {
  if (loading) return <CardSkeleton />

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Чек-лист
      </p>
      <ul className="flex flex-col gap-2 flex-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-2.5 text-[12px] cursor-pointer group"
            onClick={() => !item.done && onComplete(item.id)}
          >
            <span
              className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                item.done
                  ? 'bg-emerald-100 border-emerald-400'
                  : 'border-border group-hover:border-primary/50'
              )}
            >
              {item.done && <Check size={9} className="text-emerald-600" strokeWidth={3} />}
            </span>
            <span className={cn(item.done ? 'text-muted-foreground line-through' : 'text-foreground')}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full gap-3 animate-pulse">
      <div className="h-2.5 w-20 rounded bg-muted" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="h-4 w-4 rounded-full bg-muted shrink-0" />
          <div className="h-3 rounded bg-muted" style={{ width: `${60 + i * 10}%` }} />
        </div>
      ))}
    </div>
  )
}
