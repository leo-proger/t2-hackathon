import { FLOOR_PLANS } from '@/data/floorPlans'

interface Props {
  floor: number
  /** id аудитории, которую нужно подсветить (например "214") */
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
  // Если комната у верхнего края — маркер показываем снизу, чтобы он не вылез за фотку
  const markerOnTop = target ? target.y >= 18 : true

  return (
    <div className="relative w-full" style={{ aspectRatio: plan.aspectRatio }}>
      {/* Сама фотка + подсветка живут в overflow-hidden, чтобы dim-ring не вылезал */}
      <div className="absolute inset-0 rounded-xl overflow-hidden bg-sky-100">
        <img
          src={plan.src}
          alt={`Схема ${plan.floor} этажа`}
          className="absolute inset-0 w-full h-full object-contain select-none"
          draggable={false}
        />
        {target && (
          <div
            className="absolute pointer-events-none rounded-md ring-4 ring-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.25)] animate-[pulse_2s_ease-in-out_infinite]"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              width: `${target.w}%`,
              height: `${target.h}%`,
              background: 'oklch(0.56 0.215 262 / 0.18)',
            }}
          />
        )}
      </div>

      {/* Маркер «вот сюда» вне overflow-hidden, чтобы не обрезался */}
      {target && (
        <span
          className="absolute z-20 whitespace-nowrap bg-primary text-primary-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-md pointer-events-none"
          style={{
            left: `${target.x + target.w / 2}%`,
            top: markerOnTop
              ? `calc(${target.y}% - 26px)`
              : `calc(${target.y + target.h}% + 6px)`,
            transform: 'translateX(-50%)',
          }}
        >
          {markerOnTop ? '▼' : '▲'} вот сюда
        </span>
      )}
    </div>
  )
}
