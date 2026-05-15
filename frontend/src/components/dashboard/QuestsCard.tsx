import { Zap } from 'lucide-react'

const QUESTS = [
  { label: 'Найди 301 ауд.', xp: 50, progress: 60 },
  { label: 'Задай вопрос преподу', xp: 30, progress: 30 },
  { label: '7-дневный стрик', xp: 100, progress: 70 },
]

export function QuestsCard() {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-3">
        Активные квесты
      </p>
      <ul className="flex flex-col gap-3 flex-1">
        {QUESTS.map((quest) => (
          <li key={quest.label} className="flex flex-col gap-1">
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
