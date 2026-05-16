import { useState, useEffect } from 'react'
import { MessageCircleQuestion, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { PageTransition } from '@/components/PageTransition'
import { getActualTickets, answerTicket } from '@/services/ticket.service'
import type { Ticket } from '@/types'
import { cn } from '@/lib/utils'

export function TeacherTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [sending, setSending] = useState<number | null>(null)
  const [answered, setAnswered] = useState<Set<number>>(new Set())

  useEffect(() => {
    getActualTickets()
      .then(setTickets)
      .finally(() => setLoading(false))
  }, [])

  async function handleAnswer(id: number) {
    const text = answers[id]?.trim()
    if (!text || sending !== null) return
    setSending(id)
    try {
      await answerTicket(id, text)
      setAnswered((prev) => new Set(prev).add(id))
      setTickets((prev) => prev.filter((t) => t.id !== id))
    } finally {
      setSending(null)
    }
  }

  return (
    <PageTransition>
    <main className="p-4 md:p-6 max-w-2xl mx-auto flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <MessageCircleQuestion size={18} className="text-primary" />
        </span>
        <div>
          <h1 className="text-[16px] font-semibold leading-tight">Вопросы студентов</h1>
          <p className="text-[12px] text-muted-foreground">Ответьте на вопросы, которые не смог решить ИИ</p>
        </div>
      </div>

      {loading && <SkeletonList />}

      {!loading && tickets.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <CheckCircle2 size={40} className="text-emerald-400" />
          <p className="text-[14px] font-medium text-foreground">Все вопросы отвечены!</p>
          <p className="text-[12px] text-muted-foreground">Новых вопросов пока нет.</p>
        </div>
      )}

      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3"
        >
          <p className="text-[13px] font-medium text-foreground leading-relaxed">
            {ticket.question}
          </p>

          <div className="flex gap-2">
            <textarea
              value={answers[ticket.id] ?? ''}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [ticket.id]: e.target.value }))
              }
              placeholder="Введите ответ студенту..."
              rows={3}
              className="flex-1 resize-none rounded-xl border border-border bg-secondary px-3 py-2 text-[13px] placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            <button
              type="button"
              onClick={() => handleAnswer(ticket.id)}
              disabled={!answers[ticket.id]?.trim() || sending !== null}
              className={cn(
                'flex h-10 w-10 shrink-0 self-end items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity',
                (!answers[ticket.id]?.trim() || sending !== null) && 'opacity-40',
              )}
            >
              {sending === ticket.id
                ? <Loader2 size={15} className="animate-spin" />
                : <Send size={15} />}
            </button>
          </div>
        </div>
      ))}
    </main>
    </PageTransition>
  )
}

function SkeletonList() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
          <div className="h-3 w-3/4 rounded bg-muted" />
          <div className="h-3 w-1/2 rounded bg-muted" />
          <div className="h-16 w-full rounded-xl bg-muted mt-1" />
        </div>
      ))}
    </div>
  )
}
