import { Link } from 'react-router-dom'
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react'
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
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-bold uppercase tracking-widest text-emerald-700">
          Активные квесты
        </p>
        <Link
          to="/quests"
          className="text-[12px] font-semibold text-emerald-700 hover:underline flex items-center gap-0.5"
        >
          Все <ArrowRight size={12} />
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {visible.map((quest) => (
          <li key={quest.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {quest.done
                ? <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                : <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shrink-0" />}
              <span className="text-[14px] text-emerald-900 font-semibold truncate">{quest.label}</span>
            </div>
            <span className="flex items-center gap-0.5 text-[12px] font-bold text-emerald-700 shrink-0">
              <Zap size={11} className="fill-emerald-700 text-emerald-700" />
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
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col gap-3.5 animate-pulse">
      <div className="h-3 w-28 rounded bg-emerald-200" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex justify-between">
          <div className="h-3.5 w-36 rounded bg-emerald-200" />
          <div className="h-3.5 w-14 rounded bg-emerald-200" />
        </div>
      ))}
    </div>
  )
}
