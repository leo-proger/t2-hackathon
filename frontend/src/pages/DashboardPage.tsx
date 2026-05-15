import { useUser } from '@/hooks/useUser'
import { useSchedule } from '@/hooks/useSchedule'
import { useQuests } from '@/hooks/useQuests'
import { useChecklist } from '@/hooks/useChecklist'
import { useDailyTask } from '@/hooks/useDailyTask'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { DailyTaskCard } from '@/components/dashboard/DailyTaskCard'
import { StreakCard } from '@/components/dashboard/StreakCard'
import { ChecklistCard } from '@/components/dashboard/ChecklistCard'
import { ScheduleCard } from '@/components/dashboard/ScheduleCard'
import { ChatCard } from '@/components/dashboard/ChatCard'
import { QuestsCard } from '@/components/dashboard/QuestsCard'

export function DashboardPage() {
  const user = useUser()
  const schedule = useSchedule()
  const quests = useQuests()
  const checklist = useChecklist()
  const dailyTask = useDailyTask()

  return (
    <main className="p-4 md:p-5">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '80px' }}
      >
        <div style={{ gridColumn: 'span 5', gridRow: 'span 3' }}>
          <WelcomeCard user={user.data} loading={user.loading} />
        </div>

        <div style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
          <DailyTaskCard task={dailyTask.task} loading={dailyTask.loading} onComplete={dailyTask.complete} />
        </div>

        <div style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
          <StreakCard days={user.data?.streakDays} history={user.data?.streakHistory} loading={user.loading} />
        </div>

        <div style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
          <ChecklistCard items={checklist.items} loading={checklist.loading} onComplete={checklist.complete} />
        </div>

        <div style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
          <ScheduleCard lessons={schedule.data ?? []} loading={schedule.loading} />
        </div>

        <div style={{ gridColumn: 'span 5', gridRow: 'span 3' }}>
          <ChatCard />
        </div>

        <div style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
          <QuestsCard quests={quests.data ?? []} loading={quests.loading} />
        </div>
      </div>
    </main>
  )
}
