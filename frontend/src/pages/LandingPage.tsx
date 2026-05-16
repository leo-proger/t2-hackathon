import { Link } from 'react-router-dom'
import { Sparkles, MapPin, Zap, MessageCircle } from 'lucide-react'

export function LandingPage() {
  return (
    <main className="min-h-[calc(100vh-57px)] flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* Маскот */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <MascotIllustration />
        </div>

        {/* Описание */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-primary" size={20} />
            <span className="text-[13px] font-semibold tracking-widest uppercase text-primary">
              Chattie
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4">
            Цифровой помощник первокурсника{' '}
            <span className="text-primary">ИВИТШ</span>
          </h1>

          <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
            Всё, что нужно в первые недели — расписание, инструкции, карта корпуса
            и ИИ-помощник, который отвечает на любые вопросы об учёбе.
          </p>

          <ul className="flex flex-col gap-2.5 mb-8 w-full">
            {FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-3 text-[13px] text-foreground">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon size={14} className="text-primary" />
                </span>
                {f.text}
              </li>
            ))}
          </ul>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-8 py-3 text-[15px] font-semibold hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
          >
            Войти
          </Link>
        </div>
      </div>
    </main>
  )
}

const FEATURES = [
  { icon: Zap,           text: 'Квесты и геймификация для адаптации' },
  { icon: MessageCircle, text: 'Chattie — ИИ ответит на любой вопрос' },
  { icon: MapPin,        text: 'Карта корпуса и схемы этажей ИВИТШ' },
]

function MascotIllustration() {
  return (
    <svg
      viewBox="0 0 220 260"
      width="220"
      height="260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Тень */}
      <ellipse cx="110" cy="248" rx="60" ry="8" fill="oklch(0.88 0.04 262)" />

      {/* Тело */}
      <rect x="62" y="145" width="96" height="88" rx="22" fill="oklch(0.94 0.06 262)" />

      {/* Кнопки на теле */}
      <circle cx="88" cy="175" r="7" fill="oklch(0.75 0.12 262)" />
      <circle cx="110" cy="175" r="7" fill="oklch(0.60 0.18 262)" />
      <circle cx="132" cy="175" r="7" fill="oklch(0.75 0.12 262)" />
      <rect x="80" y="193" width="60" height="8" rx="4" fill="oklch(0.82 0.08 262)" />
      <rect x="80" y="207" width="40" height="8" rx="4" fill="oklch(0.82 0.08 262)" />

      {/* Руки */}
      <rect x="24" y="148" width="38" height="20" rx="10" fill="oklch(0.94 0.06 262)" />
      <rect x="158" y="148" width="38" height="20" rx="10" fill="oklch(0.94 0.06 262)" />

      {/* Голова */}
      <rect x="52" y="52" width="116" height="102" rx="32" fill="oklch(0.96 0.04 262)" stroke="oklch(0.88 0.07 262)" strokeWidth="2" />

      {/* Уши/антенны */}
      <rect x="92" y="30" width="12" height="26" rx="6" fill="oklch(0.88 0.07 262)" />
      <rect x="116" y="30" width="12" height="26" rx="6" fill="oklch(0.88 0.07 262)" />
      <circle cx="98" cy="26" r="9" fill="oklch(0.60 0.18 262)" />
      <circle cx="122" cy="26" r="9" fill="oklch(0.60 0.18 262)" />
      <circle cx="98" cy="26" r="4" fill="white" />
      <circle cx="122" cy="26" r="4" fill="white" />

      {/* Глаза — фоны */}
      <rect x="70" y="78" width="34" height="28" rx="10" fill="white" />
      <rect x="116" y="78" width="34" height="28" rx="10" fill="white" />

      {/* Зрачки */}
      <circle cx="87" cy="92" r="9" fill="oklch(0.40 0.18 262)" />
      <circle cx="133" cy="92" r="9" fill="oklch(0.40 0.18 262)" />
      <circle cx="90" cy="89" r="3.5" fill="white" />
      <circle cx="136" cy="89" r="3.5" fill="white" />

      {/* Улыбка */}
      <path
        d="M 82 122 Q 110 136 138 122"
        stroke="oklch(0.60 0.18 262)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Щёки */}
      <circle cx="72" cy="115" r="10" fill="oklch(0.90 0.08 15)" opacity="0.5" />
      <circle cx="148" cy="115" r="10" fill="oklch(0.90 0.08 15)" opacity="0.5" />

      {/* Шляпа */}
      <rect x="58" y="50" width="104" height="14" rx="7" fill="oklch(0.35 0.15 262)" />
      <rect x="78" y="20" width="64" height="32" rx="10" fill="oklch(0.35 0.15 262)" />
      <rect x="96" y="50" width="28" height="4" rx="2" fill="oklch(0.60 0.18 262)" />
    </svg>
  )
}
