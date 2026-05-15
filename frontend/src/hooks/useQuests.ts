import { useQuery } from './useQuery'
import { getActiveQuests } from '@/services/quests.service'
import type { Quest } from '@/types'

export function useQuests() {
  return useQuery<Quest[]>(getActiveQuests)
}
