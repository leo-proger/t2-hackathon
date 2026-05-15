// ─── User & Profile ──────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string        // "Артём"
  initials: string    // "АИ"
  faculty: string     // "ИВИТШ"
  year: number        // 1
  week: number        // 3
  xp: number
  level: number
  adaptationProgress: number  // 0-100
  streakDays: number
  /** true = день засчитан, порядок от старого к новому */
  streakHistory: boolean[]
}

// ─── Schedule ─────────────────────────────────────────────────────────────────

export interface Lesson {
  id: string
  time: string    // "8:30"
  name: string
  room: string
  teacher: string
}

// ─── Quests ───────────────────────────────────────────────────────────────────

export interface Quest {
  id: string
  label: string
  xp: number
  progress: number  // 0-100
}

// ─── Checklist ────────────────────────────────────────────────────────────────

export interface ChecklistItem {
  id: string
  label: string
  done: boolean
}

// ─── Daily Task ───────────────────────────────────────────────────────────────

export interface DailyTask {
  id: string
  title: string
  description: string
  xp: number
  deadline: string  // "23:59"
  completed: boolean
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
  timestamp: string  // ISO
}

export interface SendMessageRequest {
  sessionId: string
  text: string
}

export interface SendMessageResponse {
  message: ChatMessage
}

// ─── Generic API envelope ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  ok: true
}

export interface ApiError {
  ok: false
  status: number
  message: string
}
