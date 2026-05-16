import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SCHEDULE } from '@/data/schedule'
import { isLessonActive } from '@/lib/schedule-utils'
import { cn } from '@/lib/utils'

export function ScheduleCard() {
  const visible = SCHEDULE.slice(0, 3)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-bold uppercase tracking-widest text-muted-foreground">
          Расписание сегодня
        </p>
        <Link
          to="/schedule"
          className="text-[12px] font-semibold text-primary hover:underline flex items-center gap-0.5"
        >
          Все <ArrowRight size={12} />
        </Link>
      </div>

      <ul className="flex flex-col gap-3.5 flex-1">
        {visible.map((lesson) => {
          const active = isLessonActive(lesson)
          return (
            <li key={lesson.id} className="flex gap-3 items-start">
              <span
                className={cn(
                  'text-[13px] min-w-[42px] pt-0.5 tabular-nums font-semibold',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {lesson.time}
              </span>
              <div
                className={cn(
                  'mt-2 h-2 w-2 rounded-full shrink-0',
                  active ? 'bg-primary animate-pulse' : 'bg-primary/40',
                )}
              />
              <div className="min-w-0">
                <p
                  className={cn(
                    'text-[14px] leading-tight truncate font-semibold',
                    active ? 'text-foreground' : 'text-foreground/90',
                  )}
                >
                  {lesson.name}
                </p>
                <p className="text-[12px] text-muted-foreground truncate mt-0.5">
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
