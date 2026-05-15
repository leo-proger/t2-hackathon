import type { Lesson } from '@/types'

interface Props {
  lessons: Lesson[]
  loading: boolean
}

export function ScheduleCard({ lessons, loading }: Props) {
  if (loading) return <CardSkeleton />

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Расписание сегодня
      </p>
      <ul className="flex flex-col gap-3 flex-1">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="flex gap-3 items-start">
            <span className="text-[11px] text-muted-foreground min-w-[38px] pt-0.5 tabular-nums">
              {lesson.time}
            </span>
            <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-foreground leading-tight truncate">
                {lesson.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {lesson.room}{lesson.teacher ? ` · ${lesson.teacher}` : ''}
              </p>
            </div>
          </li>
        ))}
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
