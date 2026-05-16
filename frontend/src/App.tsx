import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { UserProvider } from '@/contexts/UserContext'
import { useUser } from '@/hooks/useUser'
import { Navbar } from '@/components/layout/Navbar'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { TeacherDashboardPage } from '@/pages/TeacherDashboardPage'
import { SchedulePage } from '@/pages/SchedulePage'
import { GuidePage } from '@/pages/GuidePage'
import { ChatPage } from '@/pages/ChatPage'
import { CampusPage } from '@/pages/CampusPage'
import { QuestsPage } from '@/pages/QuestsPage'
import { TeacherTicketsPage } from '@/pages/TeacherTicketsPage'

function AppRoutes() {
  const { isAuthenticated } = useAuth()
  const { user } = useUser()

  // Пока user грузится — null, не редиректим по роли раньше времени
  const isTeacher = user?.status === 'teacher'

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        {/* Главная: лендинг / дашборд студента / дашборд преподавателя */}
        <Route
          path="/"
          element={
            !isAuthenticated
              ? <LandingPage />
              : isTeacher
                ? <TeacherDashboardPage />
                : <DashboardPage />
          }
        />

        {/* Логин: только для гостей */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />

        {/* Страницы студента — доступны всем как превью */}
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/campus" element={<CampusPage />} />

        {/* Защищённые страницы студента */}
        <Route
          path="/quests"
          element={isAuthenticated ? <QuestsPage /> : <Navigate to="/login" replace />}
        />

        {/* Вопросы студентов — только для преподавателей */}
        <Route
          path="/questions"
          element={
            !isAuthenticated
              ? <Navigate to="/login" replace />
              : isTeacher
                ? <TeacherTicketsPage />
                : <Navigate to="/" replace />
          }
        />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
