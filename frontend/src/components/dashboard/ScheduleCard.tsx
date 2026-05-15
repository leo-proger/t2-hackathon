import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SCHEDULE } from '@/data/schedule'
import { isLessonActive } from '@/lib/schedule-utils'
import { cn } from '@/lib/utils'

export function ScheduleCard() {
  // На дашборде показываем только первые 3 пары — за полным списком в /schedule
  const visible = SCHEDULE.slice(0, 3)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Расписание сегодня
        </p>
        <Link
          to="/schedule"
          className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
        >
          Все <ArrowRight size={11} />
        </Link>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {visible.map((lesson) => {
          const active = isLessonActive(lesson)
          return (
            <li key={lesson.id} className="flex gap-3 items-start">
              <span
                className={cn(
                  'text-[11px] min-w-[38px] pt-0.5 tabular-nums',
                  active ? 'text-primary font-semibold' : 'text-muted-foreground',
                )}
              >
                {lesson.time}
              </span>
              <div
                className={cn(
                  'mt-1.5 h-2 w-2 rounded-full shrink-0',
                  active ? 'bg-primary animate-pulse' : 'bg-primary/40',
                )}
              />
              <div className="min-w-0">
                <p
                  className={cn(
                    'text-[12px] leading-tight truncate',
                    active ? 'text-foreground font-semibold' : 'text-foreground font-medium',
                  )}
                >
                  {lesson.name}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {lesson.room}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
