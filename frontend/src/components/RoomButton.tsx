import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { FloorPlan } from '@/components/FloorPlan'
import { getFloorByRoom, normalizeRoomId } from '@/data/floorPlans'
import { cn } from '@/lib/utils'

interface Props {
  /** "214" или "ауд. 214" — нормализуется внутри */
  room: string
  className?: string
  size?: 'sm' | 'md'
}

/** Кликабельный бейдж аудитории — открывает модалку со схемой этажа */
export function RoomButton({ room, className, size = 'md' }: Props) {
  const [open, setOpen] = useState(false)
  const roomId = normalizeRoomId(room)
  const floor = getFloorByRoom(roomId)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-border bg-background hover:border-primary/60 hover:bg-primary/5 hover:text-primary transition-colors font-medium text-foreground',
          size === 'sm' ? 'text-[11px] px-1.5 py-0.5' : 'text-[13px] px-2 py-1',
          className,
        )}
        aria-label={`Показать на схеме аудиторию ${room}`}
      >
        <MapPin size={size === 'sm' ? 11 : 13} className="text-muted-foreground" />
        {room}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Аудитория {room}</DialogTitle>
            <DialogDescription>
              {floor
                ? `${floor} этаж, ИВИТШ. Целевая аудитория подсвечена синим.`
                : 'Эта локация находится за пределами корпуса ИВИТШ.'}
            </DialogDescription>
          </DialogHeader>

          {floor ? (
            <FloorPlan floor={floor} highlightRoom={roomId} />
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
              <MapPin size={32} className="text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Карта для «{room}» будет добавлена позже
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
