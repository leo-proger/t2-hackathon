import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Rocket, Footprints, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  ИНСТРУКЦИЯ ПЕРВОКУРСНИКА                                             ║
// ╠═══════════════════════════════════════════════════════════════════════╣
// ║                                                                       ║
// ║  Содержание секций редактируется НИЖЕ, в массиве SECTIONS.            ║
// ║  Каждая секция = объект с полями:                                     ║
// ║    • id     — уникальный ключ (трогать не обязательно)                 ║
// ║    • title  — заголовок секции                                         ║
// ║    • icon   — иконка из lucide-react                                   ║
// ║    • color  — цветовая схема: 'blue' | 'emerald' | 'amber'             ║
// ║    • content — JSX с твоим текстом (см. примеры внутри секций ниже)   ║
// ║                                                                       ║
// ║  В content можно использовать:                                        ║
// ║    <p>обычный абзац</p>                                                ║
// ║    <ul><li>...</li></ul>           — буллеты                           ║
// ║    <ol><li>...</li></ol>           — нумерованный список              ║
// ║    <strong>жирный</strong>                                             ║
// ║                                                                       ║
// ╚═══════════════════════════════════════════════════════════════════════╝

type ColorKey = 'blue' | 'emerald' | 'amber'

const COLOR_STYLES: Record<ColorKey, {
  border: string
  bg: string
  bgHover: string
  text: string
  iconBg: string
  ring: string
}> = {
  blue: {
    border: 'border-primary/30',
    bg: 'bg-primary/[0.06]',
    bgHover: 'hover:bg-primary/[0.10]',
    text: 'text-primary',
    iconBg: 'bg-primary/15',
    ring: 'ring-primary/20',
  },
  emerald: {
    border: 'border-emerald-300',
    bg: 'bg-emerald-50',
    bgHover: 'hover:bg-emerald-100/70',
    text: 'text-emerald-700',
    iconBg: 'bg-emerald-100',
    ring: 'ring-emerald-200',
  },
  amber: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    bgHover: 'hover:bg-amber-100/70',
    text: 'text-amber-700',
    iconBg: 'bg-amber-100',
    ring: 'ring-amber-200',
  },
}

interface Section {
  id: string
  title: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: ColorKey
  content: React.ReactNode
}

// ─── СЕКЦИИ — РЕДАКТИРУЙ ЗДЕСЬ ────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    id: 'after-admission',
    title: 'Что сделать сразу после поступления',
    icon: Rocket,
    color: 'blue',
    // ★ ВПИШИ СЮДА свой текст. Можно <ol>, <ul>, <p>, <strong> и т.д.
    content: (
      <ol>
        <li>Получить студенческий билет в дирекции ИВИТШ.</li>
        <li>Оформить пропуск в корпус.</li>
        <li>Привязать банковскую карту для зачисления стипендии.</li>
        <li>Иногородним — заселиться в общежитие (28–30 августа).</li>
        <li><em>(заглушка — впиши свои пункты)</em></li>
      </ol>
    ),
  },
  {
    id: 'first-steps',
    title: 'Первые шаги',
    icon: Footprints,
    color: 'emerald',
    // ★ ВПИШИ СЮДА свой текст
    content: (
      <ul>
        <li>Найди своего <strong>куратора</strong> и познакомься.</li>
        <li>Узнай расписание занятий — оно в приложении Chattie.</li>
        <li>Найди главные кабинеты: дирекция, библиотека, столовая.</li>
        <li>Подключись к ЕИОС.</li>
        <li><em>(заглушка — впиши свои пункты)</em></li>
      </ul>
    ),
  },
  {
    id: 'whats-next',
    title: 'Что дальше?',
    icon: Compass,
    color: 'amber',
    // ★ ВПИШИ СЮДА свой текст
    content: (
      <p>
        Закрепи всё, что узнал в первые недели. Адаптация занимает
        2–3 месяца — это нормально. Главное — не стесняйся задавать
        вопросы куратору и сокурсникам. <em>(заглушка — впиши свой текст)</em>
      </p>
    ),
  },
]
// ─── /СЕКЦИИ ──────────────────────────────────────────────────────────────

export function GuidePage() {
  // Хранит id открытой секции (только одна за раз). null = всё свёрнуто.
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Инструкция первокурсника
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Что делать в первые дни, недели и месяцы. Раскрой нужный раздел.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {SECTIONS.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            isOpen={openId === section.id}
            onToggle={() => toggle(section.id)}
          />
        ))}
      </div>
    </main>
  )
}

// ─── Карточка-секция (аккордеон) ─────────────────────────────────────────

function SectionCard({
  section,
  isOpen,
  onToggle,
}: {
  section: Section
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = section.icon
  const c = COLOR_STYLES[section.color]

  return (
    <div
      className={cn(
        'rounded-2xl border-2 overflow-hidden transition-all',
        c.border,
        c.bg,
        isOpen && cn('shadow-md ring-1', c.ring),
      )}
    >
      {/* Заголовок-кнопка */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'w-full flex items-center gap-4 p-4 md:p-5 text-left transition-colors',
          c.bgHover,
        )}
      >
        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', c.iconBg)}>
          <Icon size={20} className={c.text} />
        </span>
        <h2 className={cn('flex-1 text-[16px] md:text-[17px] font-semibold leading-tight', c.text)}>
          {section.title}
        </h2>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={c.text}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      {/* Раскрывающийся контент */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className={cn('px-5 md:px-6 pb-5 md:pb-6 pt-1', `guide-content guide-${section.color}`)}>
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
