import { api, USE_MOCK } from '@/lib/api'
import { mockChatHistory, mockDelay } from '@/mocks'
import type { ChatMessage, SendMessageRequest } from '@/types'

const MOCK_BOT_REPLIES = [
  'Хороший вопрос! Рекомендую обратиться в деканат (каб. Б-209).',
  'Это стандартная ситуация для первокурсников. Твой куратор точно поможет!',
  'Загляни на страницу «Корпус» — там есть карта и контакты.',
  'Студенческий выдают в дирекции (ауд. Б-209). Возьми паспорт и 2 фото 3×4.',
  'Расписание доступно на странице «Расписание» или на сайте КГУ.',
]

// История: бэкенд возвращает [{message: ChatMessage}, ...] с обёрткой
type HistoryItem = { message: ChatMessage }

export async function getChatHistory(): Promise<ChatMessage[]> {
  if (USE_MOCK) {
    await mockDelay()
    return mockChatHistory
  }
  const items = await api.get<HistoryItem[]>('/api/chat/history')
  return items.map((item) => item.message)
}

export async function sendMessage(req: SendMessageRequest): Promise<ChatMessage> {
  if (USE_MOCK) {
    await mockDelay(900)
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
