// Схемы этажей ИВИТШ. Координаты в условной 14x4 сетке (col x row).
// type: 'room' — пронумерованная аудитория (главная цель навигации)
//       'service' — служебное помещение
//       'wc' — туалет (показываем иконкой)
//       'stairs' — лестница (показываем иконкой)

export type RoomType = 'room' | 'service' | 'wc' | 'stairs'

export interface FloorRoom {
  id: string          // "214" или "it-uley"
  label: string       // "214" или "ИТ-Улей"
  sublabel?: string   // "кафедра прикладной математики и информационных технологий"
  col: number         // grid column start (1-based)
  colSpan: number
  row: number         // 1 или 2
  rowSpan?: number
  type: RoomType
}

export interface FloorPlan {
  floor: number
  cols: number        // grid columns
  rows: number
  rooms: FloorRoom[]
}

// Координаты подобраны "на глаз" по фоткам — для общего ориентира студента,
// а не для пиксель-перфекта.

export const FLOOR_PLANS: FloorPlan[] = [
  {
    floor: 1,
    cols: 12,
    rows: 2,
    rooms: [
      // Верхний ряд
      { id: '111',     label: '111₂',     col: 1,  colSpan: 2, row: 1, type: 'room' },
      { id: 'wc-1-l',  label: 'WC',        col: 3,  colSpan: 1, row: 1, type: 'wc' },
      { id: 'st-1-l',  label: '↕',         col: 4,  colSpan: 1, row: 1, type: 'stairs' },
      { id: 'it-uley', label: 'ИТ-Улей',   col: 5,  colSpan: 4, row: 1, type: 'service' },
      { id: 'st-1-r',  label: '↕',         col: 9,  colSpan: 1, row: 1, type: 'stairs' },
      { id: 'wc-1-r',  label: 'WC',        col: 10, colSpan: 1, row: 1, type: 'wc' },
      { id: '001',     label: '001₂',     col: 11, colSpan: 2, row: 1, type: 'room' },
      // Нижний ряд
      { id: '8bit',    label: '8 бит',     sublabel: 'игровая', col: 1, colSpan: 3, row: 2, type: 'service' },
      { id: '110',     label: '110₂',     sublabel: 'серверная', col: 4,  colSpan: 1, row: 2, type: 'service' },
      { id: 'firewall', label: 'файрвол',  col: 5,  colSpan: 1, row: 2, type: 'service' },
      { id: 'archive',  label: 'архиватор', col: 6,  colSpan: 2, row: 2, type: 'service' },
      { id: '100',     label: '100₂',     col: 8,  colSpan: 2, row: 2, type: 'room' },
      { id: '010',     label: '010₂',     col: 10, colSpan: 3, row: 2, type: 'room' },
    ],
  },
  {
    floor: 2,
    cols: 14,
    rows: 2,
    rooms: [
      // Верхний ряд
      { id: '215', label: '215', sublabel: 'кафедра прикладной математики', col: 1,  colSpan: 2, row: 1, type: 'room' },
      { id: 'wc-2-l',  label: 'WC', col: 3,  colSpan: 1, row: 1, type: 'wc' },
      { id: 'st-2-l',  label: '↕',  col: 4,  colSpan: 1, row: 1, type: 'stairs' },
      { id: '209', label: '209', sublabel: 'дирекция', col: 5,  colSpan: 2, row: 1, type: 'room' },
      { id: '207', label: '207',                       col: 7,  colSpan: 2, row: 1, type: 'room' },
      { id: 'st-2-r',  label: '↕',  col: 9,  colSpan: 1, row: 1, type: 'stairs' },
      { id: 'wc-2-r',  label: 'WC', col: 10, colSpan: 1, row: 1, type: 'wc' },
      { id: '203', label: '203',                       col: 11, colSpan: 2, row: 1, type: 'room' },
      { id: '201', label: '201',                       col: 13, colSpan: 2, row: 1, type: 'room' },
      // Нижний ряд
      { id: '214', label: '214', sublabel: 'кафедра ИСТ',          col: 1,  colSpan: 2, row: 2, type: 'room' },
      { id: '212', label: '212', sublabel: 'кафедра защиты',        col: 3,  colSpan: 2, row: 2, type: 'room' },
      { id: '210', label: '210', sublabel: 'процессор',             col: 5,  colSpan: 1, row: 2, type: 'room' },
      { id: '208', label: '208',                                     col: 6,  colSpan: 2, row: 2, type: 'room' },
      { id: '206', label: '206',                                     col: 8,  colSpan: 2, row: 2, type: 'room' },
      { id: '204', label: '204',                                     col: 10, colSpan: 2, row: 2, type: 'room' },
      { id: '202', label: '202',                                     col: 12, colSpan: 3, row: 2, type: 'room' },
    ],
  },
  {
    floor: 3,
    cols: 13,
    rows: 2,
    rooms: [
      // Верхний ряд
      { id: '313', label: '313', col: 1,  colSpan: 2, row: 1, type: 'room' },
      { id: 'wc-3-l', label: 'WC', col: 3, colSpan: 1, row: 1, type: 'wc' },
      { id: 'st-3-l', label: '↕',  col: 4, colSpan: 1, row: 1, type: 'stairs' },
      { id: '309', label: '309', col: 5,  colSpan: 2, row: 1, type: 'room' },
      { id: '307', label: '307', col: 7,  colSpan: 2, row: 1, type: 'room' },
      { id: 'st-3-r', label: '↕',  col: 9,  colSpan: 1, row: 1, type: 'stairs' },
      { id: 'wc-3-r', label: 'WC', col: 10, colSpan: 1, row: 1, type: 'wc' },
      { id: '303', label: '303', col: 11, colSpan: 1, row: 1, type: 'room' },
      { id: '301', label: '301', col: 12, colSpan: 2, row: 1, type: 'room' },
      // Нижний ряд
      { id: '312', label: '312', col: 1,  colSpan: 2, row: 2, type: 'room' },
      { id: '310', label: '310', col: 3,  colSpan: 2, row: 2, type: 'room' },
      { id: '308', label: '308', col: 5,  colSpan: 2, row: 2, type: 'room' },
      { id: '306', label: '306', col: 7,  colSpan: 2, row: 2, type: 'room' },
      { id: '304', label: '304', col: 9,  colSpan: 2, row: 2, type: 'room' },
      { id: '302', label: '302', col: 11, colSpan: 2, row: 2, type: 'room' },
      { id: '300', label: '300', sublabel: 'совещательная 32 бит', col: 13, colSpan: 1, row: 2, type: 'service' },
    ],
  },
  {
    floor: 4,
    cols: 13,
    rows: 2,
    rooms: [
      // Верхний ряд
      { id: '409', label: '409', col: 1,  colSpan: 2, row: 1, type: 'room' },
      { id: 'wc-4-l', label: 'WC', col: 3, colSpan: 1, row: 1, type: 'wc' },
      { id: 'st-4-l', label: '↕',  col: 4, colSpan: 1, row: 1, type: 'stairs' },
      { id: '407A', label: '407А', sublabel: 'бэкэнд', col: 5, colSpan: 1, row: 1, type: 'service' },
      { id: '407',  label: '407',  col: 6,  colSpan: 3, row: 1, type: 'room' },
      { id: 'st-4-r', label: '↕',  col: 9,  colSpan: 1, row: 1, type: 'stairs' },
      { id: 'wc-4-r', label: 'WC', col: 10, colSpan: 1, row: 1, type: 'wc' },
      { id: '403', label: '403', col: 11, colSpan: 1, row: 1, type: 'room' },
      { id: '401', label: '401', col: 12, colSpan: 2, row: 1, type: 'room' },
      // Нижний ряд
      { id: '408', label: '408', col: 1,  colSpan: 2, row: 2, type: 'room' },
      { id: '406', label: '406', col: 3,  colSpan: 2, row: 2, type: 'room' },
      { id: '404', label: '404', sublabel: 'мегабайт холл', col: 5,  colSpan: 4, row: 2, type: 'service' },
      { id: 'cowork', label: 'ковёркинг',                    col: 9,  colSpan: 5, row: 2, type: 'service' },
    ],
  },
]

/** Определяет этаж по номеру аудитории. */
export function getFloorByRoom(room: string): number | null {
  const cleaned = room.trim()
  // "214" → 2 этаж по первой цифре
  const match = cleaned.match(/^(\d)(\d{2})/)
  if (match) {
    const floor = Number(match[1])
    if (floor >= 1 && floor <= 4) return floor
  }
  return null
}

/** Нормализует "ауд. 214" / "214" / "214₂" к голому "214" для подсветки. */
export function normalizeRoomId(room: string): string {
  return room.replace(/ауд\.?\s*/i, '').replace(/[₀-₉]/g, '').trim()
}
