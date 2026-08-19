import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, Sun, Moon, Sunset } from 'lucide-react'
import Navbar from '../components/Navbar'
import MedicineCard from '../components/MedicineCard'
import { mockMedicines } from '../data/mockData'
import { Medicine } from '../types'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return { text: 'Good Morning', icon: <Sun className="text-yellow-400" size={32} /> }
  if (h < 17) return { text: 'Good Afternoon', icon: <Sunset className="text-orange-400" size={32} /> }
  return { text: 'Good Evening', icon: <Moon className="text-indigo-400" size={32} /> }
}

export default function ElderlyDashboard() {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines)
  const navigate = useNavigate()
  const greeting = getGreeting()

  const takenCount = medicines.filter(m => m.status === 'taken').length
  const totalCount = medicines.length
  const progressPct = Math.round((takenCount / totalCount) * 100)

  const handleTaken = (id: string) => {
    setMedicines(prev =>
      prev.map(m => m.id === id ? { ...m, status: 'taken' } : m)
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar userName="Margaret" />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Greeting */}
        <div className="flex items-center gap-3 mb-2">
          {greeting.icon}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
              {greeting.text},
            </h1>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 leading-tight">
              Margaret! 👋
            </p>
          </div>
        </div>
        <p className="text-slate-500 text-lg mt-1 mb-6">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>

        {/* Progress Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-700 font-bold text-lg">Today's Progress</span>
            <span className="text-blue-600 font-extrabold text-xl">{takenCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-slate-500 text-sm mt-2">
            {takenCount === totalCount
              ? '🎉 All medicines taken for today!'
              : `${totalCount - takenCount} medicine${totalCount - takenCount > 1 ? 's' : ''} remaining`}
          </p>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-700">Today's Medicines</h2>
          <button
            onClick={() => navigate('/add-medicine')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl shadow transition-all active:scale-95 text-sm"
          >
            <PlusCircle size={18} />
            Add New
          </button>
        </div>

        {/* Medicine Cards */}
        <div className="space-y-4">
          {medicines.map(med => (
            <MedicineCard key={med.id} medicine={med} onTaken={handleTaken} />
          ))}
        </div>

        {/* Floating Add Button (mobile) */}
        <button
          onClick={() => navigate('/add-medicine')}
          className="fixed bottom-6 right-6 sm:hidden bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl active:scale-95 transition-all"
          aria-label="Add medicine"
        >
          <PlusCircle size={30} />
        </button>
      </main>
    </div>
  )
}
