import { motion } from 'framer-motion'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { DailyTaskCard } from '@/components/dashboard/DailyTaskCard'
import { StreakCard } from '@/components/dashboard/StreakCard'
import { ChecklistCard } from '@/components/dashboard/ChecklistCard'
import { ScheduleCard } from '@/components/dashboard/ScheduleCard'
import { ChatCard } from '@/components/dashboard/ChatCard'
import { QuestsCard } from '@/components/dashboard/QuestsCard'

/*
  12-колоночная сетка из мокапа:
  Row 1-2-3 (span 3 rows): WelcomeCard    (col 1-5)
  Row 1-2:   DailyTaskCard                (col 6-9)
  Row 1-2:   StreakCard                   (col 10-12)
  Row 3-4:   ChecklistCard               (col 1-3) — начинается с row 4 т.к. welcome занимает 1-3
  Row 3-4:   ScheduleCard                (col 4-7)
  Row 4-5:   ChatCard                    (col 6-10) — сместил для соответствия мокапу
  Row 3-4:   QuestsCard                  (col 8-10)

  Используем CSS grid с именованными областями для точного соответствия мокапу.
*/

export function DashboardPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="p-4 md:p-5"
    >
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

        {/* Daily Task — 4 cols × 3 rows (taller to fit button) */}
        <div style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
          <DailyTaskCard />
        </div>

        {/* Streak — 3 cols × 2 rows */}
        <div style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
          <StreakCard />
        </div>

        {/* Checklist — 3 cols × 2 rows, starts new row after welcome (row 4) */}
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
    </motion.main>
  )
}
