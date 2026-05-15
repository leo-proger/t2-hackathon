import { api, USE_MOCK } from '@/lib/api'
import { mockLessons, mockDelay } from '@/mocks'
import type { Lesson } from '@/types'

export async function getTodaySchedule(): Promise<Lesson[]> {
  if (USE_MOCK) {
    await mockDelay()
    return mockLessons
  }
  return api.get<Lesson[]>('/api/schedule/today')
}

/** Расписание на конкретную дату (YYYY-MM-DD) */
export async function getScheduleByDate(date: string): Promise<Lesson[]> {
  if (USE_MOCK) {
    await mockDelay()
    // В моке возвращаем те же пары для будней, пусто для выходных
    const day = new Date(date).getDay()
    if (day === 0 || day === 6) return []
    return mockLessons
  }
  return api.get<Lesson[]>(`/api/schedule?date=${date}`)
}
