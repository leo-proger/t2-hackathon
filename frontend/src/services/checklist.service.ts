import { api, USE_MOCK } from '@/lib/api'
import { mockChecklist, mockDelay } from '@/mocks'
import type { ChecklistItem } from '@/types'

export async function getChecklist(): Promise<ChecklistItem[]> {
  if (USE_MOCK) {
    await mockDelay()
    return mockChecklist
  }
  return api.get<ChecklistItem[]>('/api/checklist')
}

export async function completeChecklistItem(id: string): Promise<ChecklistItem> {
  if (USE_MOCK) {
    await mockDelay(150)
    const item = mockChecklist.find((i) => i.id === id)
    if (!item) throw new Error('Item not found')
    return { ...item, done: true }
  }
  return api.post<ChecklistItem>(`/api/checklist/${id}/complete`, {})
}
