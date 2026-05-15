import { useState } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useChat } from '@/hooks/useChat'

export function ChatCard() {
  const { messages, loading, sending, send } = useChat()
  const [input, setInput] = useState('')

  function handleSend() {
    void send(input)
    setInput('')
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
        {loading ? (
          <div className="flex-1 flex flex-col gap-2 animate-pulse">
            {[70, 85, 60].map((w, i) => (
              <div key={i} className={`flex gap-2 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="h-5 w-5 rounded-full bg-muted shrink-0" />
                <div className="h-8 rounded-xl bg-muted" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Задай вопрос..."
          disabled={sending}
          className="flex-1 text-[12px] rounded-xl border border-border bg-secondary px-3 py-2 placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow disabled:opacity-60"
        />
        <Button
          size="icon"
          className="h-8 w-8 shrink-0 rounded-xl"
          onClick={handleSend}
          disabled={sending || !input.trim()}
        >
          {sending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
        </Button>
      </div>
    </div>
  )
}
