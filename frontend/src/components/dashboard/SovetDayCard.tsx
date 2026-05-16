import { useEffect, useState } from 'react'
import { Lightbulb } from 'lucide-react'
import { getSovetDay } from '@/services/tip.service'

export function SovetDayCard() {
  const [tip, setTip] = useState<string | null>(null)

  useEffect(() => {
    getSovetDay().then(setTip).catch(() => null)
  }, [])

  if (!tip) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3.5 animate-pulse">
        <div className="h-5 w-5 rounded bg-amber-200 shrink-0" />
        <div className="h-3 w-3/4 rounded bg-amber-200" />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-200 mt-0.5">
        <Lightbulb size={14} className="text-amber-700 fill-amber-400" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-0.5">
          Совет дня
        </p>
        <p className="text-[14px] font-medium text-amber-900 leading-snug">
          {tip}
        </p>
      </div>
    </div>
  )
}
