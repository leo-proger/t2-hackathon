import { CheckCircle2, Clock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const CHECKLIST = [
  { label: 'Пропуск получен', done: true },
  { label: 'Деканат найден', done: true },
  { label: 'Расписание', done: false },
]

export function WelcomeCard() {
  const progress = 62

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/8 p-5 flex flex-col h-full overflow-hidden">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-primary/70 mb-1">
        Добро пожаловать
      </p>
      <h2 className="text-xl font-semibold" style={{ color: 'oklch(0.35 0.15 262)' }}>
        Привет, Артём 👋
      </h2>
      <p className="text-[12px] mt-0.5 mb-4" style={{ color: 'oklch(0.50 0.12 262)' }}>
        ИВИТШ · 1 курс · 3 неделя
      </p>

      <p className="text-[11px] font-medium mb-1.5" style={{ color: 'oklch(0.52 0.14 262)' }}>
        Прогресс адаптации
      </p>
      <Progress
        value={progress}
        className="h-1.5"
        style={{ background: 'oklch(0.82 0.06 262)' } as React.CSSProperties}
        indicatorClassName="bg-primary"
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-[11px]" style={{ color: 'oklch(0.52 0.14 262)' }}>
          {progress}% пройдено
        </span>
        <span className="text-[11px]" style={{ color: 'oklch(0.52 0.14 262)' }}>
          уровень 3
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {CHECKLIST.map((item) => (
          <StatusTag key={item.label} label={item.label} done={item.done} />
        ))}
      </div>
    </div>
  )
}

function StatusTag({ label, done }: { label: string; done: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full',
        done
          ? 'bg-primary/15 text-primary'
          : 'bg-amber-100 text-amber-700'
      )}
    >
      {done
        ? <CheckCircle2 size={11} className="text-primary" />
        : <Clock size={11} />}
      {label}
    </span>
  )
}
