import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { label: 'Зарегистрироваться', done: true },
  { label: 'Найти деканат', done: true },
  { label: 'Добавить расписание', done: false },
  { label: 'Познакомиться с куратором', done: false },
]

export function ChecklistCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Чек-лист
      </p>
      <ul className="flex flex-col gap-2 flex-1">
        {ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-[12px]">
            <span
              className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                item.done ? 'bg-emerald-100 border-emerald-400' : 'border-border'
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
