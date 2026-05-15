import { Zap, Clock, Camera, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DailyTask } from '@/types'

interface Props {
  task: DailyTask | null
  loading: boolean
  onComplete: () => Promise<void>
}

export function DailyTaskCard({ task, loading, onComplete }: Props) {
  if (loading || !task) return <CardSkeleton />

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        Задание дня
      </p>
      <p className="text-[14px] font-semibold text-foreground mb-1.5">{task.title}</p>
      <p className="text-[12px] text-muted-foreground flex-1">{task.description}</p>

      <div className="flex items-center justify-between mt-4">
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
          <Zap size={11} className="fill-amber-600 text-amber-600" />
          +{task.xp} XP
        </span>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock size={11} />
          до {task.deadline}
        </span>
      </div>

      {task.completed ? (
        <div className="mt-3 flex items-center justify-center gap-1.5 text-emerald-600 text-[12px] font-medium">
          <CheckCircle2 size={14} />
          Выполнено!
        </div>
      ) : (
        <Button size="sm" className="mt-3 w-full gap-1.5 text-xs h-8" onClick={onComplete}>
          <Camera size={13} />
          Загрузить фото
        </Button>
      )}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full gap-3 animate-pulse">
      <div className="h-2.5 w-24 rounded bg-muted" />
      <div className="h-4 w-36 rounded bg-muted" />
      <div className="h-8 w-full rounded bg-muted flex-1" />
      <div className="h-8 w-full rounded-xl bg-muted mt-2" />
    </div>
  )
}
