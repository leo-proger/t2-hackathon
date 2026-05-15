import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const WEEK = [true, true, true, true, true, true, true]

export function StreakCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border border-border bg-secondary/60 p-5 flex flex-col h-full"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
        Стрик
      </p>
      <div className="flex items-end gap-1.5 flex-1">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
          className="text-4xl font-bold text-amber-600 leading-none"
        >
          7
        </motion.span>
        <span className="text-[12px] text-muted-foreground pb-1">дней подряд 🔥</span>
      </div>

      {/* Week dots */}
      <div className="flex gap-1.5 mt-3">
        {WEEK.map((active, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            className={cn(
              'h-3 w-3 rounded-sm',
              active
                ? i >= 5 ? 'bg-emerald-500' : 'bg-emerald-300'
                : 'bg-border'
            )}
          />
        ))}
      </div>
    </motion.div>
  )
}
