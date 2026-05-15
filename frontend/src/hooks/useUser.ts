import { useQuery } from './useQuery'
import { getMe } from '@/services/user.service'
import type { User } from '@/types'

export function useUser() {
  return useQuery<User>(getMe)
}
