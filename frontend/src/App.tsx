import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { DashboardPage } from '@/pages/DashboardPage'
import { SchedulePage } from '@/pages/SchedulePage'
import { GuidePage } from '@/pages/GuidePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
