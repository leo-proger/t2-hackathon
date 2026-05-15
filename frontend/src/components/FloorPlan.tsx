import { ArrowUpDown, User } from 'lucide-react'
import { FLOOR_PLANS, type FloorRoom } from '@/data/floorPlans'
import { cn } from '@/lib/utils'

interface Props {
  floor: number
  /** Аудитория, которую надо подсветить */
  highlightRoom?: string
}

export function FloorPlan({ floor, highlightRoom }: Props) {
  const plan = FLOOR_PLANS.find((f) => f.floor === floor)
  if (!plan) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Схема этажа недоступна
      </div>
    )
  }

  return (
    <div className="bg-sky-50 rounded-xl p-4 md:p-6">
      <h3 className="text-2xl font-bold text-sky-700 text-center mb-4">{plan.floor} этаж</h3>

      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${plan.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${plan.rows}, minmax(56px, auto))`,
        }}
      >
        {plan.rooms.map((room) => (
          <RoomBox key={room.id} room={room} highlighted={room.id === highlightRoom} />
        ))}
      </div>
    </div>
  )
}

function RoomBox({ room, highlighted }: { room: FloorRoom; highlighted: boolean }) {
  const style: React.CSSProperties = {
    gridColumn: `${room.col} / span ${room.colSpan}`,
    gridRow: `${room.row} / span ${room.rowSpan ?? 1}`,
  }

  // Иконки для туалетов и лестниц — без рамки
  if (room.type === 'wc') {
    return (
      <div style={style} className="flex items-center justify-center">
        <User size={18} className="text-sky-600" />
      </div>
    )
  }
  if (room.type === 'stairs') {
    return (
      <div style={style} className="flex items-center justify-center">
        <ArrowUpDown size={18} className="text-sky-600/70" />
      </div>
    )
  }

  // Цвета и стили в зависимости от типа и подсветки
  const baseClasses = 'relative flex flex-col items-center justify-center text-center px-1.5 py-1 rounded-md border-2 transition-all'

  let stateClasses: string
  if (highlighted) {
    stateClasses = 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/30 z-10 scale-105 animate-[pulse_2s_ease-in-out_infinite]'
  } else if (room.type === 'service') {
    stateClasses = 'border-sky-300 bg-white/60 text-sky-800'
  } else {
    stateClasses = 'border-sky-700 bg-white text-sky-700'
  }

  return (
    <div style={style} className={cn(baseClasses, stateClasses)}>
      <span className={cn('font-bold leading-none', room.type === 'service' ? 'text-sm' : 'text-base md:text-lg')}>
        {room.label}
      </span>
      {room.sublabel && (
        <span className={cn('text-[9px] md:text-[10px] leading-tight mt-0.5 line-clamp-2', highlighted ? 'text-primary-foreground/90' : 'text-sky-700/70')}>
          {room.sublabel}
        </span>
      )}
    </div>
  )
}
