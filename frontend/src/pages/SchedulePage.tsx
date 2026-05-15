import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, User as UserIcon, Clock, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RoomButton } from '@/components/RoomButton'
import { useScheduleByDate } from '@/hooks/useSchedule'
import { isLessonActive, isLessonPast, formatHumanDate, isToday, toIsoDate } from '@/lib/schedule-utils'
import { cn } from '@/lib/utils'
import type { Lesson } from '@/types'

export function SchedulePage() {
  // Выбранная дата — Date в локальной таймзоне
  const [date, setDate] = useState<Date>(() => new Date())
  const isoDate = toIsoDate(date)
  const { data: lessons, loading } = useScheduleByDate(isoDate)

  // Часы тикают каждую минуту чтобы подсветка активной пары была актуальной
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000)
    return () => clearInterval(id)
  }, [])

  function shiftDate(days: number) {
    setDate((d) => {
      const next = new Date(d)
      next.setDate(d.getDate() + days)
      return next
    })
  }

  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Заголовок + переключатель даты */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Расписание</h1>
          <p className="text-sm text-muted-foreground mt-0.5 capitalize">
            {formatHumanDate(date)}
            {isToday(date) && <span className="ml-2 text-primary font-medium">· сегодня</span>}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={() => shiftDate(-1)} aria-label="Предыдущий день">
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant={isToday(date) ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setDate(new Date())}
            className="gap-1.5"
          >
            <CalendarDays size={14} />
            Сегодня
          </Button>
          <Button variant="outline" size="icon" onClick={() => shiftDate(1)} aria-label="Следующий день">
            <ChevronRight size={16} />
          </Button>
        </div>
      </header>

      {/* Список пар */}
      {loading ? (
        <ScheduleSkeleton />
      ) : !lessons || lessons.length === 0 ? (
        <EmptyDay />
      ) : (
        <ul className="flex flex-col gap-2">
          {lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} showStatus={isToday(date)} />
          ))}
        </ul>
      )}
    </main>
  )
}

interface LessonItemProps {
  lesson: Lesson
  /** Показывать ли статус (активна/прошла) — только для сегодняшнего дня */
  showStatus: boolean
}

function LessonItem({ lesson, showStatus }: LessonItemProps) {
  const active = showStatus && isLessonActive(lesson)
  const past = showStatus && !active && isLessonPast(lesson)

  return (
    <li
      className={cn(
        'group relative rounded-2xl border p-4 md:p-5 flex gap-4 transition-all',
        active && 'border-primary/40 bg-primary/5 shadow-sm shadow-primary/10 ring-1 ring-primary/20',
        past && 'opacity-55',
        !active && !past && 'border-border bg-card hover:border-border/80'
      )}
    >
      {/* Цветная полоса слева для активной пары */}
      {active && (
        <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary" aria-hidden />
      )}

      {/* Время */}
      <div className="flex flex-col items-start min-w-[60px] tabular-nums">
        <span className={cn('text-base font-semibold', active ? 'text-primary' : 'text-foreground')}>
          {lesson.time}
        </span>
        <span className="text-[11px] text-muted-foreground mt-0.5">{lesson.endTime}</span>
      </div>

      {/* Разделитель */}
      <div className={cn('w-px self-stretch', active ? 'bg-primary/30' : 'bg-border')} />

      {/* Инфо */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <h3 className="text-[15px] font-semibold text-foreground leading-tight">{lesson.name}</h3>
          {active && (
            <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
              Сейчас
            </span>
          )}
          {past && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Прошла
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-[13px] text-muted-foreground">
          <RoomButton room={lesson.room} />
          {lesson.teacher && (
            <span className="flex items-center gap-1.5">
              <UserIcon size={13} />
              {lesson.teacher}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {lesson.time}–{lesson.endTime}
          </span>
        </div>
      </div>
    </li>
  )
}

function ScheduleSkeleton() {
  return (
    <ul className="flex flex-col gap-2 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="rounded-2xl border border-border bg-card p-5 flex gap-4">
          <div className="flex flex-col gap-2 min-w-[60px]">
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-3 w-10 rounded bg-muted" />
          </div>
          <div className="w-px bg-border self-stretch" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </li>
      ))}
    </ul>
  )
}

function EmptyDay() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 flex flex-col items-center text-center">
      <CalendarDays size={32} className="text-muted-foreground/60 mb-3" />
      <p className="text-foreground font-medium">Пар нет</p>
      <p className="text-[13px] text-muted-foreground mt-1">Кажется, сегодня выходной — отдыхай 😌</p>
    </div>
  )
}
