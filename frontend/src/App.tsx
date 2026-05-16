import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { DashboardPage } from '@/pages/DashboardPage'
import { SchedulePage } from '@/pages/SchedulePage'
import { GuidePage } from '@/pages/GuidePage'
import { ChatPage } from '@/pages/ChatPage'
import { CampusPage } from '@/pages/CampusPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/campus" element={<CampusPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
