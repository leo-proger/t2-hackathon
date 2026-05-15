import { useState } from 'react'
import { User, GraduationCap, Briefcase } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from '@/components/ui/dialog'
import { getTeacher } from '@/data/teachers'
import { cn } from '@/lib/utils'

interface Props {
  teacherId: string
  className?: string
}

/** Имя преподавателя — кнопка-чип. Открывает модалку с фото + должностью + степенью. */
export function TeacherButton({ teacherId, className }: Props) {
  const [open, setOpen] = useState(false)
  const t = getTeacher(teacherId)

  if (!t) {
    return <span className="text-[13px] text-muted-foreground">{teacherId}</span>
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-border bg-background hover:border-primary/60 hover:bg-primary/5 hover:text-primary transition-colors text-[13px] font-medium text-foreground px-2 py-1',
          className,
        )}
        aria-label={`Информация о ${t.name}`}
      >
        <User size={13} className="text-muted-foreground" />
        {t.name}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Преподаватель {t.fullName}</DialogTitle>
            <DialogDescription className="sr-only">
              Информация о преподавателе {t.fullName}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center text-center pt-2">
            {/* Фото */}
            <div className="h-32 w-32 rounded-2xl overflow-hidden bg-muted ring-4 ring-primary/10 mb-4">
              {t.photoUrl ? (
                <img src={t.photoUrl} alt={t.fullName} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  <User size={48} />
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold text-foreground">{t.fullName}</h2>

            <div className="flex flex-col gap-2 mt-4 w-full">
              <InfoRow icon={<Briefcase size={14} />} label="Должность" value={t.position} />
              {t.credentials && (
                <InfoRow icon={<GraduationCap size={14} />} label="Степень" value={t.credentials} />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 items-start text-left bg-muted/40 rounded-lg p-3">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
        <span className="text-[13px] text-foreground leading-snug">{value}</span>
      </div>
    </div>
  )
}
