import { useQuery } from './useQuery'
import { getActiveQuests, completeQuest } from '@/services/quests.service'
import { useUser } from '@/contexts/UserContext'
import type { Quest } from '@/types'

export function useQuests() {
  const query = useQuery<Quest[]>(getActiveQuests)
  const { refetch: refetchUser } = useUser()

  async function complete(id: number): Promise<boolean> {
    const ok = await completeQuest(id)
    if (ok) {
      query.refetch()
      void refetchUser()  // обновляем XP в навбаре и по всему приложению
    }
    return ok
  }

  return { ...query, complete }
}
