import { useState, useEffect } from 'react'
import { useQuery } from './useQuery'
import { getTodaySchedule, getScheduleByDate } from '@/services/schedule.service'
import type { Lesson } from '@/types'

export function useSchedule() {
  return useQuery<Lesson[]>(getTodaySchedule)
}

/** Расписание на конкретный день — перезагружается при смене даты */
export function useScheduleByDate(date: string) {
  const [data, setData] = useState<Lesson[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getScheduleByDate(date)
      .then((res) => { if (!cancelled) setData(res) })
      .catch((e) => { if (!cancelled) setError(e instanceof Error ? e.message : 'Ошибка') })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [date])

  return { data, loading, error }
}
