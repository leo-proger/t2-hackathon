import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { DailyTaskCard } from '@/components/dashboard/DailyTaskCard'
import { StreakCard } from '@/components/dashboard/StreakCard'
import { ChecklistCard } from '@/components/dashboard/ChecklistCard'
import { ScheduleCard } from '@/components/dashboard/ScheduleCard'
import { ChatCard } from '@/components/dashboard/ChatCard'
import { QuestsCard } from '@/components/dashboard/QuestsCard'

export function DashboardPage() {
  return (
    <main className="p-4 md:p-5">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '80px',
        }}
      >
        {/* Welcome — 5 cols × 3 rows */}
        <div style={{ gridColumn: 'span 5', gridRow: 'span 3' }}>
          <WelcomeCard />
        </div>

        {/* Daily Task — 4 cols × 3 rows */}
        <div style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
          <DailyTaskCard />
        </div>

        {/* Streak — 3 cols × 2 rows */}
        <div style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
          <StreakCard />
        </div>

        {/* Checklist — 3 cols × 2 rows */}
        <div style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
          <ChecklistCard />
        </div>

        {/* Schedule — 4 cols × 2 rows */}
        <div style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
          <ScheduleCard />
        </div>

        {/* Chat — 5 cols × 3 rows */}
        <div style={{ gridColumn: 'span 5', gridRow: 'span 3' }}>
          <ChatCard />
        </div>

        {/* Quests — 3 cols × 2 rows */}
        <div style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
          <QuestsCard />
        </div>
      </div>
    </main>
  )
}
