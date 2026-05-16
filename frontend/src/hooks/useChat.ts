import { useState, useEffect } from 'react'
import { getChatHistory, sendMessage } from '@/services/chat.service'
import type { ChatMessage } from '@/types'

const SESSION_ID = 'default'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getChatHistory()
      .then(setMessages)
      .catch((e) => setError(e instanceof Error ? e.message : 'Ошибка загрузки чата'))
      .finally(() => setLoading(false))
  }, [])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    const userMsg: ChatMessage = {
      id: `tmp-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setSending(true)

    try {
      const botMsg = await sendMessage({ sessionId: SESSION_ID, text: trimmed })
      setMessages((prev) => [...prev, botMsg])
    } catch {
      setError('Не удалось отправить сообщение')
    } finally {
      setSending(false)
    }
  }

  return { messages, loading, sending, error, send }
}
