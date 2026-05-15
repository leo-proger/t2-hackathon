import { Zap, Clock, Camera } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function DailyTaskCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        Задание дня
      </p>
      <p className="text-[14px] font-semibold text-foreground mb-1.5">
        Найди 301 аудиторию
      </p>
      <p className="text-[12px] text-muted-foreground flex-1">
        Сфотографируй табличку у входа и загрузи фото
      </p>

      <div className="flex items-center justify-between mt-4">
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
          <Zap size={11} className="fill-amber-600 text-amber-600" />
          +50 XP
        </span>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock size={11} />
          до 23:59
        </span>
      </div>

      <Button size="sm" className="mt-3 w-full gap-1.5 text-xs h-8">
        <Camera size={13} />
        Загрузить фото
      </Button>
    </motion.div>
  )
}
