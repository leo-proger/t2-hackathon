import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { Navbar } from '@/components/layout/Navbar'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { SchedulePage } from '@/pages/SchedulePage'
import { GuidePage } from '@/pages/GuidePage'
import { ChatPage } from '@/pages/ChatPage'
import { CampusPage } from '@/pages/CampusPage'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        {/* Главная: лендинг для гостей, дашборд для авторизованных */}
        <Route
          path="/"
          element={isAuthenticated ? <DashboardPage /> : <LandingPage />}
        />

        {/* Логин: только для гостей */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />

        {/* Страницы с фейковыми данными — доступны всем как превью */}
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/campus" element={<CampusPage />} />

        {/* Защищённые страницы */}
        <Route
          path="/quests"
          element={isAuthenticated ? <div className="p-6">Квесты — скоро</div> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tutor"
          element={isAuthenticated ? <div className="p-6">Куратор — скоро</div> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
