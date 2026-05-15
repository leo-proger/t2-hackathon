import { useState, useEffect } from 'react'
import { getChecklist, completeChecklistItem } from '@/services/checklist.service'
import type { ChecklistItem } from '@/types'

export function useChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getChecklist()
      .then(setItems)
      .catch((e) => setError(e instanceof Error ? e.message : 'Ошибка'))
      .finally(() => setLoading(false))
  }, [])

  async function complete(id: string) {
    const updated = await completeChecklistItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)))
  }

  return { items, loading, error, complete }
}
