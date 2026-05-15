import { useState, useEffect } from 'react'
import { getDailyTask, completeDailyTask } from '@/services/dailyTask.service'
import type { DailyTask } from '@/types'

export function useDailyTask() {
  const [task, setTask] = useState<DailyTask | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDailyTask()
      .then(setTask)
      .catch((e) => setError(e instanceof Error ? e.message : 'Ошибка'))
      .finally(() => setLoading(false))
  }, [])

  async function complete() {
    if (!task) return
    const updated = await completeDailyTask(task.id)
    setTask(updated)
  }

  return { task, loading, error, complete }
}
