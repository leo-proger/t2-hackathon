import { Link } from 'react-router-dom'
import { Sparkles, MapPin, Zap, MessageCircle } from 'lucide-react'

export function LandingPage() {
  return (
    <main className="min-h-[calc(100vh-57px)] flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* Маскот */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img
            src="/mascot.png"
            alt="Chattie"
            width={280}
            height={280}
            className="select-none drop-shadow-xl"
            style={{ mixBlendMode: 'multiply' }}
          />
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
