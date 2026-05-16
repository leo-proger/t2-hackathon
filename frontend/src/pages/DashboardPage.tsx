import { Link } from 'react-router-dom'
import { ArrowRight, Map } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { useQuests } from '@/hooks/useQuests'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { ScheduleCard } from '@/components/dashboard/ScheduleCard'
import { QuestsCard } from '@/components/dashboard/QuestsCard'

export function DashboardPage() {
  const { user, loading: userLoading } = useUser()
  const quests = useQuests()

  return (
    <main className="p-4 md:p-6 max-w-2xl mx-auto flex flex-col gap-3">
      <WelcomeCard user={user} loading={userLoading} />

      <Link
        to="/guide"
        className="flex items-center justify-between rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 hover:bg-amber-100/70 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">
            <Map size={18} className="text-amber-600" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-amber-900 leading-tight">
              Твой план по адаптации
            </p>
            <p className="text-[13px] text-amber-700 mt-0.5">
              Пошаговая инструкция — что делать прямо сейчас
            </p>
          </div>
        </div>
        <ArrowRight size={18} className="text-amber-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      <ScheduleCard />

      <QuestsCard quests={quests.data ?? []} loading={quests.loading} />
    </main>
  )
}
