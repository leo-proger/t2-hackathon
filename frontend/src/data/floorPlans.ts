// Карты этажей ИВИТШ — реальные фотки с наложенной подсветкой по координатам.
// Bounding boxes (x, y, w, h) указаны в процентах от размеров картинки.

export interface RoomBox {
  id: string         // "214", "301" — должно совпадать с lesson.room
  x: number          // left, %
  y: number          // top, %
  w: number          // width, %
  h: number          // height, %
}

export interface FloorPlanData {
  floor: number
  src: string                                  // /floors/floor-N.png
  aspectRatio: string                          // "1080/474" — для CSS aspect-ratio
  rooms: RoomBox[]
}

export const FLOOR_PLANS: FloorPlanData[] = [
  {
    floor: 1,
    src: '/floors/floor-1.png',
    aspectRatio: '1080 / 474',
    rooms: [
      { id: '111', x: 8,  y: 22, w: 20, h: 22 },
      { id: '001', x: 71, y: 22, w: 21, h: 22 },
      { id: '100', x: 65, y: 42, w: 13, h: 22 },
      { id: '010', x: 79, y: 42, w: 13, h: 22 },
    ],
  },
  {
    floor: 2,
    src: '/floors/floor-2.png',
    aspectRatio: '1080 / 393',
    rooms: [
      { id: '215', x: 7,  y: 24, w: 19, h: 30 },
      { id: '209', x: 36, y: 28, w: 12, h: 22 },
      { id: '207', x: 48, y: 28, w: 11, h: 22 },
      { id: '203', x: 69, y: 28, w: 10, h: 22 },
      { id: '201', x: 79, y: 28, w: 13, h: 22 },
      { id: '216', x: 7,  y: 54, w: 19, h: 11 },
      { id: '214', x: 7,  y: 65, w: 19, h: 30 },
      { id: '212', x: 26, y: 65, w: 11, h: 30 },
      { id: '210', x: 37, y: 54, w: 5,  h: 41 },
      { id: '208', x: 42, y: 65, w: 13, h: 30 },
      { id: '206', x: 55, y: 65, w: 13, h: 30 },
      { id: '204', x: 68, y: 65, w: 11, h: 30 },
      { id: '202', x: 79, y: 65, w: 13, h: 30 },
    ],
  },
  {
    floor: 3,
    src: '/floors/floor-3.png',
    aspectRatio: '1080 / 382',
    rooms: [
      { id: '313', x: 9,  y: 28, w: 15, h: 26 },
      { id: '309', x: 36, y: 28, w: 12, h: 26 },
      { id: '307', x: 48, y: 28, w: 11, h: 26 },
      { id: '303', x: 70, y: 28, w: 9,  h: 26 },
      { id: '301', x: 79, y: 28, w: 13, h: 26 },
      { id: '312', x: 9,  y: 58, w: 15, h: 32 },
      { id: '310', x: 24, y: 58, w: 13, h: 32 },
      { id: '308', x: 37, y: 58, w: 11, h: 32 },
      { id: '306', x: 48, y: 58, w: 13, h: 32 },
      { id: '304', x: 61, y: 58, w: 11, h: 32 },
      { id: '302', x: 72, y: 58, w: 11, h: 32 },
      { id: '300', x: 83, y: 54, w: 9,  h: 38 },
    ],
  },
  {
    floor: 4,
    src: '/floors/floor-4.png',
    aspectRatio: '1080 / 392',
    rooms: [
      { id: '409',  x: 9,  y: 25, w: 15, h: 26 },
      { id: '407A', x: 37, y: 25, w: 5,  h: 30 },
      { id: '407',  x: 42, y: 25, w: 16, h: 30 },
      { id: '403',  x: 68, y: 25, w: 11, h: 26 },
      { id: '401',  x: 79, y: 25, w: 13, h: 26 },
      { id: '408',  x: 9,  y: 55, w: 13, h: 32 },
      { id: '406',  x: 22, y: 55, w: 13, h: 32 },
      { id: '404',  x: 35, y: 55, w: 22, h: 36 },
      { id: 'cowork', x: 57, y: 55, w: 35, h: 36 },
    ],
  },
]

/** Этаж по номеру аудитории. */
export function getFloorByRoom(room: string): number | null {
  const cleaned = room.trim()
  const match = cleaned.match(/^(\d)(\d{2})/)
  if (match) {
    const floor = Number(match[1])
    if (floor >= 1 && floor <= 4) return floor
  }
  return null
}

/** "ауд. 214" / "214₂" → "214" */
export function normalizeRoomId(room: string): string {
  return room.replace(/ауд\.?\s*/i, '').replace(/[₀-₉]/g, '').trim()
}
