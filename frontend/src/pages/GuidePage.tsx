import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Rocket, Footprints, Compass, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  ИНСТРУКЦИЯ ПЕРВОКУРСНИКА — редактируй массив SECTIONS ниже.          ║
// ╠═══════════════════════════════════════════════════════════════════════╣
// ║  Каждая секция = { id, title, icon, color, content }                  ║
// ║  В content можно использовать:                                         ║
// ║    <p>обычный абзац</p>                                                ║
// ║    <ul><li>...</li></ul>           — буллеты                           ║
// ║    <ol><li>...</li></ol>           — нумерованный список              ║
// ║    <h3>Подзаголовок</h3>           — внутренний заголовок              ║
// ║    <strong>жирный</strong>                                             ║
// ║    <a href="...">ссылка</a>        — внешняя                          ║
// ║    <Link to="/...">ссылка</Link>   — внутренняя (react-router)        ║
// ╚═══════════════════════════════════════════════════════════════════════╝

type ColorKey = 'blue' | 'emerald' | 'amber'

const COLOR_STYLES: Record<ColorKey, {
  border: string; bg: string; bgHover: string; text: string; iconBg: string; ring: string
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

// ─── СЕКЦИИ ──────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  // ★ СЕКЦИЯ 1
  {
    id: 'first-2-weeks',
    title: 'Первые 2 недели',
    icon: Rocket,
    color: 'blue',
    content: (
      <>
        <p>
          <strong>Получи студенческий билет.</strong> Обычно его выдают на сборах
          первокурсников. Если это не так, то иди в дирекцию (ауд. Б-209), возьми
          паспорт и 2 фото 3×4. Студбилет — это твой паспорт внутри университета.
        </p>
        <p>
          <strong>Оформи пропуск.</strong> Там же в дирекции или на охране — уточни
          у куратора. Без пропуска не войдёшь в корпус (но если его забыл, то могут
          пропустить по студбилету).
        </p>
        <p>
          <strong>Познакомься с куратором.</strong> Куратор — твой главный человек
          на первом курсе. Он знает ответы на большинство вопросов. Запиши его
          контакт сразу.
        </p>
        <p>
          <strong>Найди своё расписание.</strong> Расписание —{' '}
          <Link to="/schedule">здесь</Link> или на сайте КГУ. Добавь в телефон —
          пары начинаются с первой недели.
        </p>
      </>
    ),
  },

  // ★ СЕКЦИЯ 2
  {
    id: 'first-month',
    title: 'В течение первого месяца',
    icon: Footprints,
    color: 'emerald',
    content: (
      <>
        <p>
          <strong>Разберись с ЭИОС и СДО.</strong> В ЭИОС будет вся информация о
          тебе: результаты сессии, портфолио, баллы ПГАС и многое другое, а в СДО
          будут даваться задания для выполнения. Если нужно — спроси куратора, как
          этими системами пользоваться.
        </p>
        <p>
          <strong>Узнай, где что находится.</strong> Деканат, библиотека, столовая,
          медпункт — обойди корпус и запомни. Или выполни квесты в{' '}
          <Link to="/chat">Chattie</Link> и получи XP за это.
        </p>
        <p>
          <strong>Вступи в студенческие чаты.</strong> Группа в мессенджере — там
          объявления, домашки и взаимопомощь. Куратор или староста скинет ссылку.
        </p>

        <h3>Если что-то непонятно</h3>
        <p>
          Не жди — спрашивай сразу. <Link to="/chat">Chattie</Link> отвечает на
          большинство вопросов мгновенно. Если не знает ответа — переправит к
          куратору.
        </p>
      </>
    ),
  },

  // ★ СЕКЦИЯ 3
  {
    id: 'whats-next',
    title: 'Что дальше',
    icon: Compass,
    color: 'amber',
    content: (
      <>
        <h3>Учёба</h3>
        <p>
          Университет — это не школа. Никто не будет напоминать сдать домашку или
          идти на пару. Ответственность полностью твоя.
        </p>
        <p>
          <strong>Посещаемость важна.</strong> Пропуски накапливаются быстро, а
          отработки съедают время, особенно физкультура. Если заболел — предупреди
          куратора заранее, не после.
        </p>
        <p>
          <strong>Сессия придёт неожиданно.</strong> Первая сессия обычно в январе.
          Зачёты и экзамены не сдаются за одну ночь — следи за дедлайнами с первых
          недель.
        </p>
        <p>
          <strong>Преподаватели разные.</strong> У каждого свои правила: кто-то
          строго по посещаемости, кто-то смотрит только на результат. Узнай правила
          на первой паре.
        </p>

        <h3>Жизнь в универе</h3>
        <p>
          <strong>Студенческая жизнь — это не только пары.</strong> Мероприятия,
          объединения, проекты — участвуй хотя бы иногда. Это и опыт, и знакомства,
          и даже строчка в резюме.
        </p>
        <p>
          <strong>Библиотека — недооценённое место.</strong> Режим с 8:30 до 17:00.
          Тихо, есть учебники, можно работать. Оформи читательский билет в первые
          недели — он бесплатный.{' '}
          <a href="https://go.2gis.com/IE59G" target="_blank" rel="noreferrer">Карта</a>.
        </p>
        <p>
          <strong>Столовая работает по расписанию.</strong> Режим с 8:00 до 16:00.
          Обеденный перерыв между парами с 13:20 до 14:00. Приходи чуть раньше,
          потому что большая очередь.{' '}
          <a href="https://go.2gis.com/fcpMz" target="_blank" rel="noreferrer">Карта</a>.
        </p>
        <p>
          <strong>Ковёркинг.</strong> В ИВИТШ есть своё пространство для работы и
          отдыха — 4 этаж. Можно прийти между парами, поработать над проектом или
          просто провести время. Свободный вход для студентов ИВИТШ.
        </p>

        <h3>Деньги и льготы</h3>
        <p>
          Оформи студенческий проездной — существенная скидка на транспорт.
          Документы через деканат.
        </p>
        <p>
          Если есть право на стипендию — узнай условия у куратора. Нужно закрыть
          первую сессию без троек.
        </p>
      </>
    ),
  },
]
// ─── /СЕКЦИИ ─────────────────────────────────────────────────────────────

export function GuidePage() {
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Добро пожаловать в ИВИТШ
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Первые дни в универе — это хаос. Вот что делать по порядку, чтобы
          не потеряться.
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

      {/* Призыв обратиться к Chattie */}
      <ChattieCallout />
    </main>
  )
}

// ─── Карточка-секция (аккордеон) ─────────────────────────────────────────

function SectionCard({
  section, isOpen, onToggle,
}: { section: Section; isOpen: boolean; onToggle: () => void }) {
  const Icon = section.icon
  const c = COLOR_STYLES[section.color]

  return (
    <div
      className={cn(
        'rounded-2xl border-2 overflow-hidden transition-all',
        c.border, c.bg,
        isOpen && cn('shadow-md ring-1', c.ring),
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn('w-full flex items-center gap-4 p-4 md:p-5 text-left transition-colors', c.bgHover)}
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

// ─── Призыв обратиться к чат-боту ────────────────────────────────────────

function ChattieCallout() {
  return (
    <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-primary/[0.06] p-4 md:p-5 flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
        <Sparkles size={20} className="text-primary" />
      </span>
      <p className="text-[14px] text-foreground leading-snug">
        Если есть вопросы — ты всегда можешь задать их{' '}
        <Link to="/chat" className="text-primary font-semibold underline underline-offset-2 hover:no-underline">
          Chattie
        </Link>
        .
      </p>
    </div>
  )
}
