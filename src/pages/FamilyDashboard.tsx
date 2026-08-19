import { useState } from 'react'
import { CheckCircle2, Clock, XCircle, AlertTriangle, ChevronDown, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import { mockElderlyUsers } from '../data/mockData'
import { Medicine, MedicineStatus } from '../types'

const statusDisplay: Record<MedicineStatus, { label: string; color: string; icon: React.ReactNode }> = {
  taken: {
    label: 'Taken',
    color: 'text-green-700 bg-green-100',
    icon: <CheckCircle2 size={16} className="text-green-600" />,
  },
  due: {
    label: 'Due Now',
    color: 'text-orange-700 bg-orange-100',
    icon: <AlertTriangle size={16} className="text-orange-500" />,
  },
  pending: {
    label: 'Upcoming',
    color: 'text-blue-700 bg-blue-100',
    icon: <Clock size={16} className="text-blue-500" />,
  },
  missed: {
    label: 'Missed',
    color: 'text-red-700 bg-red-100',
    icon: <XCircle size={16} className="text-red-500" />,
  },
}

function ProgressSummary({ medicines }: { medicines: Medicine[] }) {
  const taken = medicines.filter(m => m.status === 'taken').length
  const total = medicines.length
  const pct = total > 0 ? Math.round((taken / total) * 100) : 0

  const barColor =
    pct === 100 ? 'from-green-400 to-green-600' :
    pct >= 50 ? 'from-blue-400 to-blue-600' :
    'from-orange-400 to-red-500'

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-700 mb-4">Today's Progress</h2>
      <div className="flex items-end gap-4 mb-3">
        <span className="text-5xl font-extrabold text-slate-800">{taken}</span>
        <span className="text-2xl text-slate-400 font-semibold mb-1">/ {total} taken</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-5 mb-2">
        <div
          className={`bg-gradient-to-r ${barColor} h-5 rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-slate-500 font-medium">
        <span>{pct}% complete</span>
        <span>{total - taken} remaining</span>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-2 mt-5">
        {(['taken', 'due', 'pending', 'missed'] as MedicineStatus[]).map(s => {
          const count = medicines.filter(m => m.status === s).length
          const cfg = statusDisplay[s]
          return (
            <div key={s} className={`rounded-xl p-3 text-center ${cfg.color}`}>
              <div className="text-2xl font-extrabold">{count}</div>
              <div className="text-xs font-semibold mt-0.5">{cfg.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ScheduleTable({ medicines }: { medicines: Medicine[] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-700">Today's Schedule</h2>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {['Medicine', 'Dosage', 'Time', 'Instruction', 'Status'].map(h => (
                <th key={h} className="text-left px-6 py-3 text-slate-500 font-semibold text-sm uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {medicines.map(med => {
              const cfg = statusDisplay[med.status]
              return (
                <tr key={med.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 text-base">{med.name}</td>
                  <td className="px-6 py-4 text-slate-600">{med.dosage}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{med.time}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{med.instruction}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${cfg.color}`}>
                      {cfg.icon}
                      {cfg.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden divide-y divide-slate-100">
        {medicines.map(med => {
          const cfg = statusDisplay[med.status]
          return (
            <div key={med.id} className="px-4 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-800">{med.name}</p>
                <p className="text-slate-500 text-sm">{med.dosage} · {med.time}</p>
              </div>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${cfg.color}`}>
                {cfg.icon}
                {cfg.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function FamilyDashboard() {
  const [selectedUserId, setSelectedUserId] = useState(mockElderlyUsers[0].id)
  const selectedUser = mockElderlyUsers.find(u => u.id === selectedUserId)!

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar userName="Sarah (Family)" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Family Monitor</h1>
            <p className="text-slate-500 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* User Selector */}
          <div className="relative">
            <div className="flex items-center gap-2 bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
              <Users size={18} className="text-purple-500 flex-shrink-0" />
              <select
                value={selectedUserId}
                onChange={e => setSelectedUserId(e.target.value)}
                className="appearance-none bg-transparent font-semibold text-slate-700 text-base focus:outline-none pr-6 cursor-pointer"
              >
                {mockElderlyUsers.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} (Age {u.age})
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="text-slate-400 absolute right-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Selected User Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-5 mb-6 flex items-center gap-4 shadow-md">
          <div className="bg-white/20 rounded-full p-3">
            <Users size={28} className="text-white" />
          </div>
          <div>
            <p className="text-purple-200 text-sm font-medium">Currently Monitoring</p>
            <p className="text-white text-2xl font-extrabold">{selectedUser.name}</p>
            <p className="text-purple-200 text-sm">Age {selectedUser.age} · {selectedUser.medicines.length} medicines today</p>
          </div>
        </div>

        <ProgressSummary medicines={selectedUser.medicines} />
        <ScheduleTable medicines={selectedUser.medicines} />
      </main>
    </div>
  )
}
