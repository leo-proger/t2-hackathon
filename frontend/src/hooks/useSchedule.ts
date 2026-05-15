import { useQuery } from './useQuery'
import { getTodaySchedule } from '@/services/schedule.service'
import type { Lesson } from '@/types'

export function useSchedule() {
  return useQuery<Lesson[]>(getTodaySchedule)
}
