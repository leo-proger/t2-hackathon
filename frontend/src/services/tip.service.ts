import { api, USE_MOCK } from '@/lib/api'
import { mockDelay } from '@/mocks'

const MOCK_TIPS = [
  'Познакомься с однокурсниками — в трудный момент именно они помогут первыми.',
  'Запиши контакт куратора прямо сейчас — не жди, пока он понадобится.',
  'Приходи на первые пары чуть раньше: найдёшь аудиторию без спешки.',
  'Добавь расписание в телефон — универ не будет напоминать о парах.',
  'Библиотека открыта с 8:30 — тихое место, чтобы подготовиться перед парой.',
  'Задавай вопросы преподавателю прямо на паре — они это ценят.',
]

export async function getSovetDay(): Promise<string> {
  if (USE_MOCK) {
    await mockDelay()
    return MOCK_TIPS[Math.floor(Math.random() * MOCK_TIPS.length)]
  }
  return api.get<string>('/api/users/sovet_day')
}
