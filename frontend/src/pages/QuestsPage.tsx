import { useState, useMemo } from 'react'
import { Zap, CheckCircle2, Circle, Trophy, Medal, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuests } from '@/hooks/useQuests'
import { useUser } from '@/contexts/UserContext'
import { cn } from '@/lib/utils'
import type { LeaderboardEntry, Quest } from '@/types'
import { PageTransition } from '@/components/PageTransition'

const TABS = ['Мои квесты', 'Рейтинг'] as const
type Tab = typeof TABS[number]

const BASE_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Дмитрий К.',  xp: 890 },
  { rank: 2, name: 'Артём И.',    xp: 340, isMe: true },
  { rank: 3, name: 'Вася К.',     xp: 280 },
  { rank: 4, name: 'Мария С.',    xp: 220 },
  { rank: 5, name: 'Никита Р.',   xp: 195 },
  { rank: 6, name: 'Ася Р.',      xp: 180 },
  { rank: 7, name: 'Иван П.',     xp: 150 },
  { rank: 8, name: 'Елена Ф.',    xp: 120 },
]

export function QuestsPage() {
  const [tab, setTab] = useState<Tab>('Мои квесты')
  const { data: quests, loading, error, complete } = useQuests()
  const { user } = useUser()

  // Обновляем XP «меня» в лидерборде из реального профиля и пересортируем
  const leaderboard = useMemo(() => {
    const entries = BASE_LEADERBOARD.map((e) =>
      e.isMe && user ? { ...e, xp: user.xp } : e
    )
    return entries
      .sort((a, b) => b.xp - a.xp)
      .map((e, i) => ({ ...e, rank: i + 1 }))
  }, [user?.xp])

  const done  = quests?.filter((q) => q.done).length ?? 0
  const total = quests?.length ?? 0

  return (
    <PageTransition>
    <main className="p-4 md:p-6 max-w-2xl mx-auto">
      <header className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight">Квесты</h1>
        {!loading && total > 0 && (
          <p className="text-[15px] text-foreground/70 font-medium mt-1">
            Выполнено {done} из {total} · собери XP и разблокируй следующий этап
          </p>
        )}
      </header>

      {/* Вкладки */}
      <div className="flex gap-1 p-1 rounded-xl bg-secondary mb-5 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all',
              tab === t
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'Мои квесты' ? (
          <motion.div
            key="quests"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {loading ? (
              <QuestsSkeleton />
            ) : error ? (
              <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-[13px] text-red-700">
                <AlertCircle size={16} className="shrink-0" />
                Не удалось загрузить квесты. Проверь подключение к серверу.
              </div>
            ) : !quests?.length ? (
              <div className="text-center py-12 text-muted-foreground text-[14px]">
                Квестов пока нет
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {quests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} onComplete={complete} />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Leaderboard entries={leaderboard} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </PageTransition>
  )
}

// ─── Карточка квеста ─────────────────────────────────────────────────────────

function QuestCard({ quest, onComplete }: { quest: Quest; onComplete: (id: number) => Promise<boolean> }) {
  const [loading, setLoading] = useState(false)
  const [justDone, setJustDone] = useState(false)

  async function handleComplete() {
    if (quest.done || loading) return
    setLoading(true)
    const ok = await onComplete(quest.id)
    if (ok) setJustDone(true)
    setLoading(false)
  }

  const isDone = quest.done || justDone

  return (
    <div
      className={cn(
        'rounded-2xl border p-4 md:p-5 flex items-start gap-4 transition-all',
        isDone
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-border bg-card hover:border-primary/30',
      )}
    >
      {/* Иконка статуса */}
      <span className="mt-0.5 shrink-0">
        {isDone
          ? <CheckCircle2 size={22} className="text-emerald-500" />
          : <Circle size={22} className="text-muted-foreground/40" />}
      </span>

      {/* Контент */}
      <div className="flex-1 min-w-0">
        <p className={cn('text-[16px] font-bold leading-tight', isDone ? 'text-emerald-700' : 'text-foreground')}>
          {quest.label}
        </p>
        <p className="text-[13px] text-foreground/65 font-medium mt-1.5 leading-snug">
          {quest.description}
        </p>
        <span className="inline-flex items-center gap-1 mt-2 text-[13px] font-bold text-primary">
          <Zap size={12} className="fill-primary" />
          +{quest.xp} XP
        </span>
      </div>

      {/* Кнопка */}
      {!isDone && (
        <button
          type="button"
          onClick={handleComplete}
          disabled={loading}
          className="shrink-0 rounded-xl border border-primary/30 bg-primary/5 text-primary text-[13px] font-bold px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50"
        >
          {loading ? '…' : 'Выполнил'}
        </button>
      )}
    </div>
  )
}

// ─── Рейтинг ─────────────────────────────────────────────────────────────────

function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  const medals: Record<number, string> = { 1: 'text-yellow-500', 2: 'text-slate-400', 3: 'text-amber-600' }

  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry) => (
        <div
          key={entry.rank}
          className={cn(
            'flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all',
            entry.isMe
              ? 'border-primary/40 bg-primary/[0.06] ring-1 ring-primary/20'
              : 'border-border bg-card',
          )}
        >
          {/* Место */}
          <div className="w-6 shrink-0 flex justify-center">
            {entry.rank <= 3
              ? <Medal size={18} className={medals[entry.rank]} />
              : <span className="text-[13px] font-semibold text-muted-foreground">{entry.rank}</span>}
          </div>

          {/* Аватар */}
          <div className={cn(
            'h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0',
            entry.isMe ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground',
          )}>
            {entry.name.slice(0, 1)}
          </div>

          <span className={cn('flex-1 text-[14px] font-medium', entry.isMe && 'text-primary')}>
            {entry.name} {entry.isMe && <span className="text-[11px] font-normal text-muted-foreground">(ты)</span>}
          </span>

          <span className="flex items-center gap-1 text-[13px] font-semibold text-primary shrink-0">
            <Trophy size={13} className="text-primary/70" />
            {entry.xp} XP
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Скелетон ────────────────────────────────────────────────────────────────

function QuestsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5 flex gap-4 animate-pulse">
          <div className="h-5 w-5 rounded-full bg-muted shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-3.5 w-40 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
