import { FLOOR_PLANS } from '@/data/floorPlans'

interface Props {
  floor: number
  /** id аудитории (например "407") */
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

  const target = highlightRoom ? plan.rooms.find((r) => r.id === highlightRoom) : null

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden bg-sky-100"
      style={{ aspectRatio: plan.aspectRatio }}
    >
      <img
        src={plan.src}
        alt={`Схема ${plan.floor} этажа`}
        className="absolute inset-0 w-full h-full object-contain select-none"
        draggable={false}
      />

      {/* SVG-оверлей с подсветкой целевой комнаты.
          preserveAspectRatio="none" — растягивает viewBox под размер контейнера,
          поэтому координаты в % картинки работают 1-в-1. */}
      {target && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="room-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Подсветка целевой комнаты без затемнения фона */}
          <rect
            x={target.x}
            y={target.y}
            width={target.w}
            height={target.h}
            fill="oklch(0.56 0.215 262 / 0.35)"
            stroke="oklch(0.56 0.215 262)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            filter="url(#room-glow)"
          >
            <animate
              attributeName="fill-opacity"
              values="0.35; 0.15; 0.35"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      )}
    </div>
  )
}
