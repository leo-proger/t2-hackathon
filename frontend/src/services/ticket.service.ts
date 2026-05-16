import { api, USE_MOCK } from '@/lib/api'
import { mockDelay } from '@/mocks'
import type { Ticket } from '@/types'

let mockTickets: Ticket[] = [
  { id: 1, question: 'Где находится деканат? Никак не могу найти.' },
  { id: 2, question: 'Как получить пропуск в общежитие на первой неделе?' },
  { id: 3, question: 'Что делать если не пустили на экзамен из-за долгов?' },
]
let nextMockId = 4

export async function getActualTickets(): Promise<Ticket[]> {
  if (USE_MOCK) {
    await mockDelay()
    return mockTickets.filter((t) => !t.answer)
  }
  return api.get<Ticket[]>('/api/ticket/get_actual')
}

export async function answerTicket(id: number, answer: string): Promise<void> {
  if (USE_MOCK) {
    await mockDelay()
    mockTickets = mockTickets.map((t) => (t.id === id ? { ...t, answer } : t))
    return
  }
  await api.post('/api/ticket/answer', { id, answer })
}

export async function createTicket(data: string): Promise<void> {
  if (USE_MOCK) {
    await mockDelay(100)
    mockTickets.push({ id: nextMockId++, question: data })
    return
  }
  await api.post(`/api/ticket/new_ticket?data=${encodeURIComponent(data)}`, {})
}
