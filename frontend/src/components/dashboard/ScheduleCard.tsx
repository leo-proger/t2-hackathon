import { motion } from 'framer-motion'

const LESSONS = [
  { time: '8:30', name: 'Математический анализ', room: 'ауд. 214 · Иванов И.И.' },
  { time: '10:10', name: 'Программирование', room: 'ауд. 301 · Петров А.В.' },
  { time: '13:30', name: 'Физкультура', room: 'спортзал' },
]

export function ScheduleCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Расписание сегодня
      </p>
      <ul className="flex flex-col gap-3 flex-1">
        {LESSONS.map((lesson, i) => (
          <motion.li
            key={lesson.time}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28 + i * 0.07 }}
            className="flex gap-3 items-start"
          >
            {/* Time column */}
            <span className="text-[11px] text-muted-foreground min-w-[38px] pt-0.5 tabular-nums">
              {lesson.time}
            </span>
            {/* Color dot */}
            <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
            {/* Info */}
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-foreground leading-tight truncate">
                {lesson.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">{lesson.room}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
