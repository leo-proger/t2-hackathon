import { useState, useEffect, useRef } from 'react'
import { Send, Loader2, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useChat } from '@/hooks/useChat'
import { createTicket } from '@/services/ticket.service'
import { cn } from '@/lib/utils'

const SUGGESTIONS = [
  'Как получить студенческий билет?',
  'Что делать если заболел?',
  'Где столовая и когда она работает?',
  'Как узнать своё расписание?',
  'Что такое ЭИОС и СДО?',
  'Как оформить проездной?',
  'Куда идти если потерял пропуск?',
]

type Feedback = 'up' | 'down'

export function ChatPage() {
  const { messages, loading, sending, send } = useChat()
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({})
  const [disliked, setDisliked] = useState<Set<string>>(new Set())
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Автоскролл вниз при новых сообщениях
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend(text = input) {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    void send(trimmed)
    setInput('')
    inputRef.current?.focus()
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function toggleFeedback(id: string, value: Feedback) {
    if (value === 'down') {
      if (disliked.has(id)) return
      const msg = messages.find((m) => m.id === id)
      if (msg) void createTicket(msg.text)
      setDisliked((prev) => new Set(prev).add(id))
      setFeedback((prev) => ({ ...prev, [id]: 'down' }))
      return
    }
    setFeedback((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined as unknown as Feedback : value,
    }))
  }

  const showSuggestions = messages.length === 0 && !loading

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      {/* Заголовок */}
      <div className="px-4 md:px-6 py-4 border-b border-border/60 bg-background/80 backdrop-blur-md flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15">
          <Sparkles size={16} className="text-primary" />
        </span>
        <div>
          <h1 className="text-[15px] font-semibold leading-tight">Chattie</h1>
          <p className="text-[11px] text-muted-foreground">ИИ-помощник первокурсника ИВИТШ</p>
        </div>
      </div>

      {/* Область сообщений */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-3">

          {loading && <LoadingSkeleton />}

          {showSuggestions && <WelcomeState />}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn('flex gap-2 items-end', msg.role === 'user' && 'flex-row-reverse')}
              >
                {/* Аватар */}
                {msg.role === 'bot' && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 mb-0.5">
                    <Sparkles size={12} className="text-primary" />
                  </span>
                )}

                <div className={cn('flex flex-col gap-1', msg.role === 'user' && 'items-end')}>
                  {/* Пузырь */}
                  <div
                    className={cn(
                      'text-[14px] leading-relaxed rounded-2xl px-4 py-2.5 max-w-[75vw] md:max-w-[480px]',
                      msg.role === 'bot'
                        ? 'bg-card border border-border text-foreground rounded-tl-sm'
                        : 'bg-primary text-primary-foreground rounded-tr-sm',
                    )}
                  >
                    {msg.text}
                  </div>

                  {/* Фидбек 👍/👎 — только под ботом */}
                  {msg.role === 'bot' && (
                    <div className="flex gap-1 ml-1">
                      <FeedbackButton
                        active={feedback[msg.id] === 'up'}
                        onClick={() => toggleFeedback(msg.id, 'up')}
                      >
                        <ThumbsUp size={12} />
                      </FeedbackButton>
                      <FeedbackButton
                        active={feedback[msg.id] === 'down'}
                        negative
                        onClick={() => toggleFeedback(msg.id, 'down')}
                      >
                        <ThumbsDown size={12} />
                      </FeedbackButton>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Индикатор печатания */}
          <AnimatePresence>
            {sending && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-2 items-end"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Sparkles size={12} className="text-primary" />
                </span>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Панель ввода */}
      <div className="border-t border-border/60 bg-background px-4 md:px-6 py-3">
        <div className="max-w-2xl mx-auto flex flex-col gap-2">

          {/* Чипсы с подсказками */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSend(s)}
                disabled={sending}
                className="shrink-0 rounded-full border border-border bg-secondary text-[12px] text-muted-foreground px-3 py-1 hover:bg-accent hover:text-foreground hover:border-primary/40 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Поле ввода */}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Задай любой вопрос об учёбе..."
              disabled={sending}
              className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-[14px] placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={sending || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {sending
                ? <Loader2 size={16} className="animate-spin" />
                : <Send size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Кнопка фидбека ──────────────────────────────────────────────────────────

function FeedbackButton({
  children, active, negative, onClick,
}: {
  children: React.ReactNode
  active: boolean
  negative?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-center h-6 w-6 rounded-full border transition-all',
        active && !negative && 'bg-emerald-100 border-emerald-300 text-emerald-600',
        active && negative  && 'bg-red-100 border-red-300 text-red-500',
        !active && 'border-border text-muted-foreground/50 hover:border-primary/40 hover:text-muted-foreground',
      )}
    >
      {children}
    </button>
  )
}

// ─── Приветственный экран (пустой чат) ───────────────────────────────────────

function WelcomeState() {
  return (
    <div className="flex flex-col items-center text-center py-12 gap-3">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <Sparkles size={28} className="text-primary" />
      </span>
      <p className="text-[15px] font-semibold text-foreground">Привет! Я Chattie</p>
      <p className="text-[13px] text-muted-foreground max-w-xs">
        Знаю всё про ИВИТШ — расписание, корпус, преподавателей и документы.
        Спроси что угодно или выбери подсказку снизу.
      </p>
    </div>
  )
}

// ─── Скелетон загрузки ───────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {[{ w: '65%', side: 'bot' }, { w: '50%', side: 'user' }, { w: '75%', side: 'bot' }].map((item, i) => (
        <div key={i} className={cn('flex gap-2', item.side === 'user' && 'flex-row-reverse')}>
          {item.side === 'bot' && <div className="h-7 w-7 rounded-full bg-muted shrink-0" />}
          <div className="h-10 rounded-2xl bg-muted" style={{ width: item.w }} />
        </div>
      ))}
    </div>
  )
}
