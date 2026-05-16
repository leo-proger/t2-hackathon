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
import { AuthGate } from '@/components/AuthGate'

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

        {/* Страницы студента — с заглушкой для незалогиненных */}
        <Route path="/schedule" element={
          <AuthGate hint="Войдите, чтобы увидеть расписание">
            <SchedulePage />
          </AuthGate>
        } />
        <Route path="/guide" element={
          <AuthGate hint="Войдите, чтобы читать инструкцию">
            <GuidePage />
          </AuthGate>
        } />
        <Route path="/chat" element={
          <AuthGate hint="Войдите, чтобы общаться с Chattie">
            <ChatPage />
          </AuthGate>
        } />
        <Route path="/campus" element={
          <AuthGate hint="Войдите, чтобы посмотреть корпус">
            <CampusPage />
          </AuthGate>
        } />

        {/* Защищённые страницы студента */}
        <Route path="/quests" element={
          <AuthGate hint="Войдите, чтобы проходить квесты">
            <QuestsPage />
          </AuthGate>
        } />

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
