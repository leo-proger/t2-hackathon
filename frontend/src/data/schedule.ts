import type { Lesson } from '@/types'

/** Дата расписания — фиксированная заглушка пока нет бэка */
export const SCHEDULE_DATE = new Date(2026, 4, 16) // 16 мая 2026 (месяц 0-based)

/** Время обеденного перерыва (между парами 3 и 4) */
export const LUNCH_BREAK = { start: '13:20', end: '14:00' }

export const SCHEDULE: Lesson[] = [
  {
    id: 'l1',
    time: '8:30',  endTime: '10:00',
    kind: 'лекция',
    name: 'Алгоритмы и структуры данных',
    room: 'Б-407',
    teacherId: 'kiprina',
  },
  {
    id: 'l2',
    time: '10:10', endTime: '11:40',
    kind: 'практика',
    name: 'История России',
    room: 'Б-310',
    teacherId: 'zverev',
  },
  {
    id: 'l3',
    time: '11:50', endTime: '13:20',
    kind: 'лабораторная',
    name: 'Информационные технологии',
    subgroup: 'п/г 1',
    room: 'Б-207',
    teacherId: 'demchinova',
  },
  // ─── обед 13:20 – 14:00 ───
  {
    id: 'l4',
    time: '14:00', endTime: '15:30',
    kind: 'практика',
    name: 'Математический анализ',
    room: 'Б-206',
    teacherId: 'katerzhina',
  },
  {
    id: 'l5',
    time: '15:40', endTime: '17:10',
    kind: 'лекция',
    name: 'Линейная алгебра',
    room: 'Б-407',
    teacherId: 'sobashko',
  },
]
