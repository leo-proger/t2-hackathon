import { api, USE_MOCK } from '@/lib/api'
import { mockUser, mockDelay } from '@/mocks'
import type { User } from '@/types'

// Форма ответа от /api/users/me
interface ApiUser {
  id: number
  name: string
  faculty: string
  group: string
  status: 'student' | 'teacher'
  year: number
  simestr: number
  xp: number
  level: number
  levelProgress: number
  adaptationProgress: number
}

function toInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function mapApiUser(raw: ApiUser): User {
  return {
    ...raw,
    initials: toInitials(raw.name),
  }
}

export async function getMe(): Promise<User> {
  if (USE_MOCK) {
    await mockDelay()
    return mockUser
  }
  const raw = await api.get<ApiUser>('/api/users/me')
  return mapApiUser(raw)
}
