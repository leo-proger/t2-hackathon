// ─── User & Profile ──────────────────────────────────────────────────────────

export type UserStatus = 'student' | 'teacher'

export interface User {
  id: number
  name: string           // "Артём"
  initials: string       // генерится из name на фронте
  faculty: string        // "ИВИТШ"
  group: string          // "00-XXбо-0"
  year: number           // 1
  simestr: number        // 1
  xp: number
  level: number
  levelProgress: number  // 0-100, % прогресса внутри уровня
  adaptationProgress: number  // 0-100
  status: UserStatus
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
  id: number
  label: string
  description: string
  xp: number
  done: boolean
}

export interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  isMe?: boolean
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

// ─── Tickets ──────────────────────────────────────────────────────────────────

export interface Ticket {
  id: number
  question: string
  answer?: string
}
