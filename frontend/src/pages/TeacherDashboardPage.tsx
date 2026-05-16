import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircleQuestion } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { PageTransition } from '@/components/PageTransition'
import { getActualTickets } from '@/services/ticket.service'
import type { Ticket } from '@/types'

export function TeacherDashboardPage() {
  const { user, loading: userLoading } = useUser()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [ticketsLoading, setTicketsLoading] = useState(true)

  useEffect(() => {
    getActualTickets()
      .then((data) => setTickets(data.slice(0, 3)))
      .finally(() => setTicketsLoading(false))
  }, [])

  return (
    <PageTransition>
    <main className="p-4 md:p-6 max-w-2xl mx-auto flex flex-col gap-3">
      <WelcomeCard user={user} loading={userLoading} />

      {/* Блок вопросов */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <MessageCircleQuestion size={14} className="text-primary" />
            </span>
            <span className="text-[13px] font-semibold">Вопросы студентов</span>
          </div>
          <Link
            to="/questions"
            className="flex items-center gap-1 text-[12px] text-primary hover:opacity-75 transition-opacity"
          >
            Все вопросы
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-border/60">
          {ticketsLoading &&
            [1, 2, 3].map((i) => (
              <div key={i} className="px-5 py-3.5 animate-pulse">
                <div className="h-2.5 w-3/4 rounded bg-muted" />
                <div className="h-2 w-1/2 rounded bg-muted mt-2" />
              </div>
            ))}

          {!ticketsLoading && tickets.length === 0 && (
            <p className="px-5 py-5 text-[13px] text-muted-foreground text-center">
              Новых вопросов нет — всё отвечено 🎉
            </p>
          )}

          {tickets.map((ticket) => (
            <div key={ticket.id} className="px-5 py-3.5">
              <p className="text-[13px] text-foreground leading-snug line-clamp-2">
                {ticket.question}
              </p>
            </div>
          ))}
        </div>

        {!ticketsLoading && tickets.length > 0 && (
          <Link
            to="/questions"
            className="flex items-center justify-center gap-1.5 py-3 text-[12px] text-primary border-t border-border/60 hover:bg-accent/40 transition-colors"
          >
            Ответить на вопросы
            <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </main>
    </PageTransition>
  )
}
