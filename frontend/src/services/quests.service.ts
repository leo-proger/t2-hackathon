import { api, USE_MOCK } from '@/lib/api'
import { mockQuests, mockDelay } from '@/mocks'
import type { Quest } from '@/types'

export async function getActiveQuests(): Promise<Quest[]> {
  if (USE_MOCK) {
    await mockDelay()
    return mockQuests
  }
  return api.get<Quest[]>('/api/quests/active')
}

export async function completeQuest(id: number): Promise<boolean> {
  if (USE_MOCK) {
    await mockDelay(500)
    return true
  }
  return api.get<boolean>(`/api/quests/complit/${id}`)
}
