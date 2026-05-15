import { api, USE_MOCK } from '@/lib/api'
import { mockUser, mockDelay } from '@/mocks'
import type { User } from '@/types'

export async function getMe(): Promise<User> {
  if (USE_MOCK) {
    await mockDelay()
    return mockUser
  }
  return api.get<User>('/api/users/me')
}
