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

export type LessonKind = 'лекция' | 'практика' | 'лабораторная'

export interface Lesson {
  id: string
  time: string         // "8:30" — начало пары
  endTime: string      // "10:00" — конец пары
  kind: LessonKind     // тип занятия
  name: string         // название предмета
  subgroup?: string    // "п/г 1" — для лаб
  room: string         // "Б-407" — с префиксом корпуса
  teacherId: string    // ссылка на teachers.json (например "kiprina")
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
