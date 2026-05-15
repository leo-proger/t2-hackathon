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
