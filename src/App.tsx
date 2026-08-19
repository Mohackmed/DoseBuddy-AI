import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ElderlyDashboard from './pages/ElderlyDashboard'
import AddMedicine from './pages/AddMedicine'
import FamilyDashboard from './pages/FamilyDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/elderly" element={<ElderlyDashboard />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/family" element={<FamilyDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
