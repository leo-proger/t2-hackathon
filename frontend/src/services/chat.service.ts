import { api, USE_MOCK } from '@/lib/api'
import { mockChatHistory, mockDelay } from '@/mocks'
import type { ChatMessage, SendMessageRequest } from '@/types'

const MOCK_BOT_REPLIES = [
  'Уточняю информацию — отвечу совсем скоро!',
  'Хороший вопрос! Рекомендую обратиться в деканат (каб. 112).',
  'Это стандартная ситуация для первокурсников. Твой куратор точно поможет!',
  'Загляни на страницу «Корпус» — там есть карта и контакты.',
]

export async function getChatHistory(_sessionId: string): Promise<ChatMessage[]> {
  if (USE_MOCK) {
    await mockDelay()
    return mockChatHistory
  }
  return api.get<ChatMessage[]>(`/api/chat/history`)
}

export async function sendMessage(req: SendMessageRequest): Promise<ChatMessage> {
  if (USE_MOCK) {
    await mockDelay(700)
    const reply = MOCK_BOT_REPLIES[Math.floor(Math.random() * MOCK_BOT_REPLIES.length)]
    return {
      id: `m-${Date.now()}`,
      role: 'bot',
      text: reply,
      timestamp: new Date().toISOString(),
    }
  }
  const res = await api.post<{ message: ChatMessage }>('/api/chat/message', req)
  return res.message
}
