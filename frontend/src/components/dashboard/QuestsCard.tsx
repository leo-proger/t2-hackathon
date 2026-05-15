import { Zap } from 'lucide-react'
import type { Quest } from '@/types'

interface Props {
  quests: Quest[]
  loading: boolean
}

export function QuestsCard({ quests, loading }: Props) {
  if (loading) return <CardSkeleton />

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-3">
        Активные квесты
      </p>
      <ul className="flex flex-col gap-3 flex-1">
        {quests.map((quest) => (
          <li key={quest.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-[12px] text-foreground font-medium">{quest.label}</span>
              </div>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-primary">
                <Zap size={10} className="fill-primary text-primary" />
                +{quest.xp} XP
              </span>
            </div>
            <div className="ml-4 h-1 rounded-full bg-emerald-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${quest.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col h-full gap-3 animate-pulse">
      <div className="h-2.5 w-28 rounded bg-emerald-200" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <div className="h-3 w-28 rounded bg-emerald-200" />
            <div className="h-3 w-12 rounded bg-emerald-200" />
          </div>
          <div className="ml-4 h-1 rounded-full bg-emerald-200" />
        </div>
      ))}
    </div>
  )
}
