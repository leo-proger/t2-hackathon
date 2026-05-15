import type { Lesson } from '@/types'

/** Парсит "8:30" в количество минут от начала суток */
export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/** Идёт ли пара прямо сейчас? */
export function isLessonActive(lesson: Lesson, now: Date = new Date()): boolean {
  const start = parseTimeToMinutes(lesson.time)
  const end = parseTimeToMinutes(lesson.endTime)
  const cur = now.getHours() * 60 + now.getMinutes()
  return cur >= start && cur < end
}

/** Уже закончилась? */
export function isLessonPast(lesson: Lesson, now: Date = new Date()): boolean {
  return parseTimeToMinutes(lesson.endTime) <= now.getHours() * 60 + now.getMinutes()
}

/** YYYY-MM-DD из Date в ЛОКАЛЬНОЙ таймзоне (не UTC). */
export function toIsoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Один и тот же календарный день? */
export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

const WEEKDAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

/** "12 мая, понедельник" */
export function formatHumanDate(d: Date): string {
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${WEEKDAYS[d.getDay()]}`
}

export function isToday(d: Date): boolean {
  const t = new Date()
  return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear()
}
