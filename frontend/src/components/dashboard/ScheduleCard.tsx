import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { isLessonActive } from '@/lib/schedule-utils'
import { cn } from '@/lib/utils'
import type { Lesson } from '@/types'

interface Props {
  lessons: Lesson[]
  loading: boolean
}

export function ScheduleCard({ lessons, loading }: Props) {
  if (loading) return <CardSkeleton />

  // На дашборде показываем только первые 3 пары — за полным списком в /schedule
  const visible = lessons.slice(0, 3)

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
                  active ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
              >
                {lesson.time}
              </span>
              <div
                className={cn(
                  'mt-1.5 h-2 w-2 rounded-full shrink-0',
                  active ? 'bg-primary animate-pulse' : 'bg-primary/40'
                )}
              />
              <div className="min-w-0">
                <p className={cn(
                  'text-[12px] leading-tight truncate',
                  active ? 'text-foreground font-semibold' : 'text-foreground font-medium'
                )}>
                  {lesson.name}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {lesson.room}{lesson.teacher ? ` · ${lesson.teacher}` : ''}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full gap-3 animate-pulse">
      <div className="h-2.5 w-32 rounded bg-muted" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="h-3 w-8 rounded bg-muted shrink-0" />
          <div className="h-2 w-2 rounded-full bg-muted shrink-0 mt-1" />
          <div className="flex flex-col gap-1 flex-1">
            <div className="h-3 w-3/4 rounded bg-muted" />
            <div className="h-2.5 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
