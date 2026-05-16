import { Link } from 'react-router-dom'
import { MapPin, Zap, MessageCircle } from 'lucide-react'
import { PageTransition } from '@/components/PageTransition'

export function LandingPage() {
  return (
    <PageTransition>
    <main className="min-h-[calc(100vh-57px)] flex items-center justify-center px-6 py-8 md:p-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 md:gap-16">

        {/* Маскот */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img
            src="/mascot.png"
            alt="Chattie"
            className="w-56 md:w-[380px] select-none drop-shadow-2xl"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

        {/* Описание */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
          <span className="text-[13px] font-bold tracking-widest uppercase text-primary mb-3">
            Chattie
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
            Цифровой помощник первокурсника{' '}
            <span className="text-primary">ИВИТШ</span>
          </h1>

          <p className="text-[17px] font-medium text-foreground/70 leading-relaxed mb-7">
            Всё, что нужно в первые недели — расписание, инструкции, карта корпуса
            и ИИ-помощник, который отвечает на любые вопросы об учёбе.
          </p>

          <ul className="flex flex-col gap-3 mb-9 w-full">
            {FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-3 text-[15px] font-semibold text-foreground">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon size={16} className="text-primary" />
                </span>
                {f.text}
              </li>
            ))}
          </ul>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-10 py-4 text-[17px] font-bold hover:opacity-90 transition-opacity shadow-xl shadow-primary/25"
          >
            Войти
          </Link>
        </div>
      </div>
    </main>
    </PageTransition>
  )
}

const FEATURES = [
  { icon: Zap,           text: 'Квесты и геймификация для адаптации' },
  { icon: MessageCircle, text: 'Chattie — ИИ ответит на любой вопрос' },
  { icon: MapPin,        text: 'Карта корпуса и схемы этажей ИВИТШ' },
]
