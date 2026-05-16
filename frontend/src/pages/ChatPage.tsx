import { Sparkles } from 'lucide-react'

export function ChatPage() {
  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Чат с Chattie</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Спроси что угодно про учёбу, общагу или корпус.
        </p>
      </header>

      <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.04] p-12 flex flex-col items-center text-center">
        <Sparkles size={32} className="text-primary mb-3" />
        <p className="text-foreground font-medium">Скоро здесь будет полноценный чат</p>
        <p className="text-[13px] text-muted-foreground mt-1 max-w-md">
          Пока что мини-чат доступен прямо на главной странице — в карточке «Chattie — спроси что угодно».
        </p>
      </div>
    </main>
  )
}
