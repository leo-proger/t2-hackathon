import { api, USE_MOCK } from '@/lib/api'
import { mockDailyTask, mockDelay } from '@/mocks'
import type { DailyTask } from '@/types'

export async function getDailyTask(): Promise<DailyTask> {
  if (USE_MOCK) {
    await mockDelay()
    return mockDailyTask
  }
  return api.get<DailyTask>('/api/daily-task')
}

export async function completeDailyTask(id: string): Promise<DailyTask> {
  if (USE_MOCK) {
    await mockDelay(200)
    return { ...mockDailyTask, id, completed: true }
  }
  return api.post<DailyTask>(`/api/daily-task/${id}/complete`, {})
}
