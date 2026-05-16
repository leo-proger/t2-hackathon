import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Globe, GraduationCap, Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { INSTITUTES, type Institute } from '@/data/institutes'
import { FloorPlan } from '@/components/FloorPlan'
import { cn } from '@/lib/utils'

export function CampusPage() {
  const [activeId, setActiveId] = useState<string>('ivitsh')
  const active = INSTITUTES.find((i) => i.id === activeId) ?? INSTITUTES[0]

  return (
    <main className="p-4 md:p-6 max-w-5xl mx-auto">
      <header className="mb-5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Корпуса</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Выбери институт, чтобы посмотреть схему и контакты.
        </p>
      </header>

      {/* Табы — аббревиатуры */}
      <div className="flex flex-wrap gap-2 mb-6 sticky top-[57px] z-20 bg-background/90 backdrop-blur-md py-2 -mx-2 px-2 border-b border-border/40">
        {INSTITUTES.map((inst) => {
          const isActive = inst.id === activeId
          return (
            <button
              key={inst.id}
              type="button"
              onClick={() => setActiveId(inst.id)}
              className={cn(
                'relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground',
                inst.isMine && !isActive && 'ring-1 ring-primary/40',
              )}
            >
              {inst.acronym}
              {inst.isMine && (
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full',
                    isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/15 text-primary',
                  )}
                >
                  <GraduationCap size={9} />
                  тут учишься
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Контент активной вкладки */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <InstituteHeader institute={active} />
          <InstituteContacts institute={active} />

          {active.id === 'ivitsh' ? (
            <FloorSwitcher />
          ) : (
            <FloorPlanStub institute={active} />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

// ─── Заголовок институтa ─────────────────────────────────────────────────

function InstituteHeader({ institute }: { institute: Institute }) {
  return (
    <div
      className={cn(
        'rounded-2xl border-2 p-5 md:p-6 mb-4',
        institute.isMine
          ? 'border-primary/40 bg-primary/[0.06]'
          : 'border-border bg-card',
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            institute.isMine ? 'bg-primary/15' : 'bg-secondary',
          )}
        >
          <Building2 size={22} className={institute.isMine ? 'text-primary' : 'text-muted-foreground'} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={cn('text-xl font-bold', institute.isMine ? 'text-primary' : 'text-foreground')}>
              {institute.acronym}
            </h2>
            {institute.isMine && (
              <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                <GraduationCap size={11} />
                Ты учишься здесь
              </span>
            )}
          </div>
          <p className="text-[15px] text-foreground mt-1 leading-snug">{institute.fullName}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Контакты ────────────────────────────────────────────────────────────

function InstituteContacts({ institute }: { institute: Institute }) {
  const isStub = institute.address === 'TBD'

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6 mb-4">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Контакты {isStub && '(будут добавлены позже)'}
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ContactRow icon={<MapPin size={14} />} label="Адрес" value={institute.address} stub={isStub} />
        <ContactRow icon={<Phone size={14} />} label="Телефон" value={institute.phone} stub={isStub} />
        <ContactRow icon={<Mail size={14} />} label="Email" value={institute.email} stub={isStub} email />
        <ContactRow icon={<Clock size={14} />} label="График работы" value={institute.schedule} stub={isStub} />
        {institute.website && (
          <ContactRow icon={<Globe size={14} />} label="Сайт" value={institute.website} stub={isStub} website />
        )}
      </ul>
    </div>
  )
}

function ContactRow({
  icon, label, value, stub, email, website,
}: {
  icon: React.ReactNode; label: string; value: string; stub?: boolean; email?: boolean; website?: boolean
}) {
  let content: React.ReactNode = value
  if (!stub && email) {
    content = <a href={`mailto:${value}`} className="text-primary hover:underline">{value}</a>
  }
  if (!stub && website) {
    content = (
      <a href={value} target="_blank" rel="noreferrer" className="text-primary hover:underline">
        {value.replace(/^https?:\/\//, '')}
      </a>
    )
  }

  return (
    <li className="flex gap-2.5 items-start bg-muted/40 rounded-lg p-3">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
        <span className={cn('text-[13px] leading-snug', stub ? 'text-muted-foreground italic' : 'text-foreground')}>
          {content}
        </span>
      </div>
    </li>
  )
}

// ─── Переключатель этажей (для ИВИТШ) ────────────────────────────────────

const FLOORS = [1, 2, 3, 4]

function FloorSwitcher() {
  const [floor, setFloor] = useState(1)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Схема корпуса
        </h3>
        <div className="inline-flex bg-secondary rounded-lg p-1 gap-1">
          {FLOORS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setFloor(n)}
              className={cn(
                'px-3 py-1 rounded-md text-[13px] font-semibold transition-all',
                floor === n
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {n} этаж
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={floor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
      >
        <FloorPlan floor={floor} />
      </motion.div>
    </div>
  )
}

// ─── Заглушка схемы (для остальных институтов) ───────────────────────────

function FloorPlanStub({ institute }: { institute: Institute }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12 flex flex-col items-center text-center">
      <Building2 size={32} className="text-muted-foreground/50 mb-3" />
      <p className="text-foreground font-medium">Здесь будет схема корпуса</p>
      <p className="text-[13px] text-muted-foreground mt-1 max-w-md">
        Схема корпуса {institute.acronym} ({institute.fullName}) будет добавлена позже.
      </p>
    </div>
  )
}
