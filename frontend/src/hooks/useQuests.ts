import { useQuery } from './useQuery'
import { getActiveQuests, completeQuest } from '@/services/quests.service'
import type { Quest } from '@/types'

export function useQuests() {
  const query = useQuery<Quest[]>(getActiveQuests)

  async function complete(id: number): Promise<boolean> {
    const ok = await completeQuest(id)
    if (ok) query.refetch()
    return ok
  }

  return { ...query, complete }
}
