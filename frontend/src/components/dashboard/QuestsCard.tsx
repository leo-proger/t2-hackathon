import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const QUESTS = [
  { label: 'Найди 301 ауд.', xp: 50, progress: 0.6 },
  { label: 'Задай вопрос преподу', xp: 30, progress: 0.3 },
  { label: '7-дневный стрик', xp: 100, progress: 0.7 },
]

export function QuestsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col h-full"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-3">
        Активные квесты
      </p>
      <ul className="flex flex-col gap-3 flex-1">
        {QUESTS.map((quest, i) => (
          <motion.li
            key={quest.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-[12px] text-foreground font-medium">{quest.label}</span>
              </div>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-primary">
                <Zap size={10} className="fill-primary text-primary" />
                +{quest.xp} XP
              </span>
            </div>
            {/* Mini progress bar */}
            <div className="ml-4 h-1 rounded-full bg-emerald-200 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${quest.progress * 100}%` }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
