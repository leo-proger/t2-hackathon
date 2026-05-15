// Базовый клиент для запросов к бэкенду.
// VITE_API_BASE_URL — адрес бэка, например http://localhost:8000
// VITE_USE_MOCK=true  — принудительно использовать моки (по умолчанию true если базовый URL не задан)

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export const USE_MOCK =
  import.meta.env.VITE_USE_MOCK === 'true' || BASE_URL === ''

class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new HttpError(res.status, text)
  }

  return res.json() as Promise<T>
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
}
