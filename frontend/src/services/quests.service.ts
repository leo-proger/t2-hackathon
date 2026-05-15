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
