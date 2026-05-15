import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const ITEMS = [
  { label: 'Зарегистрироваться', done: true },
  { label: 'Найти деканат', done: true },
  { label: 'Добавить расписание', done: false },
  { label: 'Познакомиться с куратором', done: false },
]

export function ChecklistCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18 }}
      className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Чек-лист
      </p>
      <ul className="flex flex-col gap-2 flex-1">
        {ITEMS.map((item, i) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.07 }}
            className="flex items-center gap-2.5 text-[12px]"
          >
            <span
              className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                item.done
                  ? 'bg-emerald-100 border-emerald-400'
                  : 'border-border'
              )}
            >
              {item.done && <Check size={9} className="text-emerald-600" strokeWidth={3} />}
            </span>
            <span className={cn(item.done ? 'text-muted-foreground line-through' : 'text-foreground')}>
              {item.label}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
