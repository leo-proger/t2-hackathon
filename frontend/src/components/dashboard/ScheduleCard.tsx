const LESSONS = [
  { time: '8:30', name: 'Математический анализ', room: 'ауд. 214 · Иванов И.И.' },
  { time: '10:10', name: 'Программирование', room: 'ауд. 301 · Петров А.В.' },
  { time: '13:30', name: 'Физкультура', room: 'спортзал' },
]

export function ScheduleCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Расписание сегодня
      </p>
      <ul className="flex flex-col gap-3 flex-1">
        {LESSONS.map((lesson) => (
          <li key={lesson.time} className="flex gap-3 items-start">
            <span className="text-[11px] text-muted-foreground min-w-[38px] pt-0.5 tabular-nums">
              {lesson.time}
            </span>
            <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-foreground leading-tight truncate">
                {lesson.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">{lesson.room}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
