import { useState, useEffect, Fragment } from 'react'
import { Coffee } from 'lucide-react'
import { RoomButton } from '@/components/RoomButton'
import { TeacherButton } from '@/components/TeacherButton'
import { SCHEDULE, SCHEDULE_DATE, LUNCH_BREAK } from '@/data/schedule'
import { isLessonActive, isLessonPast, formatHumanDate, isToday } from '@/lib/schedule-utils'
import { cn } from '@/lib/utils'
import type { Lesson, LessonKind } from '@/types'

const LUNCH_INDEX = 3 // обед вставляется ПЕРЕД 4-й парой (индекс 3)

export function SchedulePage() {
  // Часы тикают каждую минуту чтобы подсветка активной пары была актуальной
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000)
    return () => clearInterval(id)
  }, [])

  const showStatus = isToday(SCHEDULE_DATE)

  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Расписание</h1>
        <p className="text-sm text-muted-foreground mt-0.5 capitalize">
          {formatHumanDate(SCHEDULE_DATE)}
          {showStatus && <span className="ml-2 text-primary font-medium">· сегодня</span>}
        </p>
      </header>

      <ul className="flex flex-col gap-2.5">
        {SCHEDULE.map((lesson, i) => (
          <Fragment key={lesson.id}>
            {i === LUNCH_INDEX && <LunchBreak />}
            <LessonItem lesson={lesson} showStatus={showStatus} />
          </Fragment>
        ))}
      </ul>
    </main>
  )
}

// ─── Один пункт расписания ───────────────────────────────────────────────────

function LessonItem({ lesson, showStatus }: { lesson: Lesson; showStatus: boolean }) {
  const active = showStatus && isLessonActive(lesson)
  const past = showStatus && !active && isLessonPast(lesson)

  return (
    <li
      className={cn(
        'group relative rounded-2xl border p-4 md:p-5 flex gap-4 transition-all',
        active
          ? 'border-primary bg-primary/8 shadow-md shadow-primary/15 ring-1 ring-primary/20'
          : 'border-primary/20 bg-primary/[0.04] hover:border-primary/40 hover:bg-primary/[0.07]',
        past && 'opacity-60',
      )}
    >
      {/* Цветная полоса слева для активной пары */}
      {active && (
        <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary" aria-hidden />
      )}

      {/* Время — единственное место где показано */}
      <div className="flex flex-col items-start min-w-[60px] tabular-nums shrink-0">
        <span className={cn('text-base font-bold', active ? 'text-primary' : 'text-foreground')}>
          {lesson.time}
        </span>
        <span className="text-[12px] text-muted-foreground/90 font-medium mt-0.5">
          {lesson.endTime}
        </span>
      </div>

      <div className={cn('w-px self-stretch', active ? 'bg-primary/40' : 'bg-primary/20')} />

      {/* Инфо */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <KindBadge kind={lesson.kind} />
            <h3 className="text-[15px] font-semibold text-foreground leading-tight">
              {lesson.name}
              {lesson.subgroup && (
                <span className="text-muted-foreground font-normal"> · {lesson.subgroup}</span>
              )}
            </h3>
          </div>
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

        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mt-3">
          <RoomButton room={lesson.room} />
          <TeacherButton teacherId={lesson.teacherId} />
        </div>
      </div>
    </li>
  )
}

// ─── Бейдж типа занятия (лекция / практика / лабораторная) ──────────────────

const KIND_STYLES: Record<LessonKind, string> = {
  'лекция':       'bg-primary/15 text-primary',
  'практика':     'bg-emerald-100 text-emerald-700',
  'лабораторная': 'bg-amber-100 text-amber-800',
}

function KindBadge({ kind }: { kind: LessonKind }) {
  return (
    <span
      className={cn(
        'text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded',
        KIND_STYLES[kind],
      )}
    >
      {kind}
    </span>
  )
}

// ─── Обеденный перерыв ──────────────────────────────────────────────────────

function LunchBreak() {
  return (
    <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground text-[13px]">
      <Coffee size={14} className="text-amber-600" />
      <span className="font-medium">Обеденный перерыв</span>
      <span className="tabular-nums">{LUNCH_BREAK.start}–{LUNCH_BREAK.end}</span>
    </div>
  )
}
