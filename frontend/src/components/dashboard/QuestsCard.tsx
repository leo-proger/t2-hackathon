import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import type { Quest } from '@/types'

interface Props {
  quests: Quest[]
  loading: boolean
}

export function QuestsCard({ quests, loading }: Props) {
  if (loading) return <CardSkeleton />

  const visible = quests.slice(0, 3)

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
          Активные квесты
        </p>
        <Link
          to="/quests"
          className="text-[11px] text-emerald-600 hover:underline flex items-center gap-0.5"
        >
          Все <ArrowRight size={11} />
        </Link>
      </div>

      <ul className="flex flex-col gap-2.5">
        {visible.map((quest) => (
          <li key={quest.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[12px] text-foreground font-medium truncate">{quest.label}</span>
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 shrink-0">
              <Zap size={10} className="fill-emerald-600 text-emerald-600" />
              +{quest.xp} XP
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col gap-3 animate-pulse">
      <div className="h-2.5 w-28 rounded bg-emerald-200" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex justify-between">
          <div className="h-3 w-32 rounded bg-emerald-200" />
          <div className="h-3 w-12 rounded bg-emerald-200" />
        </div>
      ))}
    </div>
  )
}
