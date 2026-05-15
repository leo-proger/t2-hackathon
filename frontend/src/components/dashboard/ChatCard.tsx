import { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: 'user', text: 'Как получить студенческий билет? Куда идти?' },
  {
    id: 2,
    role: 'bot',
    text: 'Студенческий выдаётся в деканате (каб. 112) в первые 2 недели. Возьми с собой паспорт и 2 фото 3×4.',
  },
]

export function ChatCard() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: trimmed }])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: 'Уточняю информацию — отвечу совсем скоро!' },
      ])
    }, 800)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col h-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Chattie — спроси что угодно
      </p>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-0">
        {/* AnimatePresence только для новых сообщений от пользователя */}
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className={`flex gap-2 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                  msg.role === 'bot' ? 'bg-primary/15 text-primary' : 'bg-secondary'
                }`}
              >
                {msg.role === 'bot'
                  ? <Bot size={10} />
                  : <User size={10} className="text-muted-foreground" />}
              </div>
              <div
                className={`text-[12px] leading-relaxed rounded-xl px-3 py-2 max-w-[85%] ${
                  msg.role === 'bot'
                    ? 'bg-primary/10 text-foreground'
                    : 'bg-secondary text-foreground'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Задай вопрос..."
          className="flex-1 text-[12px] rounded-xl border border-border bg-secondary px-3 py-2 placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
        <Button size="icon" className="h-8 w-8 shrink-0 rounded-xl" onClick={handleSend}>
          <Send size={13} />
        </Button>
      </div>
    </div>
  )
}
