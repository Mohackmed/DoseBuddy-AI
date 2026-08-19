import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react'
import { Medicine } from '../types'

interface MedicineCardProps {
  medicine: Medicine
  onTaken?: (id: string) => void
}

const statusConfig = {
  taken: {
    border: 'border-green-300',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
    label: 'Taken',
    icon: <CheckCircle2 className="text-green-500" size={20} />,
  },
  due: {
    border: 'border-orange-300',
    bg: 'bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    label: 'Due Now',
    icon: <Clock className="text-orange-500" size={20} />,
  },
  pending: {
    border: 'border-blue-200',
    bg: 'bg-white',
    badge: 'bg-blue-100 text-blue-700',
    label: 'Upcoming',
    icon: <Clock className="text-blue-400" size={20} />,
  },
  missed: {
    border: 'border-red-300',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    label: 'Missed',
    icon: <XCircle className="text-red-500" size={20} />,
  },
}

export default function MedicineCard({ medicine, onTaken }: MedicineCardProps) {
  const cfg = statusConfig[medicine.status]

  return (
    <div
      className={`rounded-2xl border-2 ${cfg.border} ${cfg.bg} p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 transition-all`}
    >
      {/* Left: Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {cfg.icon}
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mt-2 leading-tight">
          {medicine.name}
        </h3>
        <p className="text-lg text-slate-600 font-medium mt-0.5">{medicine.dosage}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-slate-500 text-base">
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {medicine.time}
          </span>
          <span className="flex items-center gap-1.5">
            <AlertCircle size={15} />
            {medicine.instruction}
          </span>
        </div>
      </div>

      {/* Right: Action */}
      <div className="flex-shrink-0">
        {medicine.status === 'taken' ? (
          <div className="flex flex-col items-center gap-1">
            <CheckCircle2 className="text-green-500" size={52} strokeWidth={1.5} />
            <span className="text-green-600 font-bold text-sm">Done!</span>
          </div>
        ) : (
          <button
            onClick={() => onTaken?.(medicine.id)}
            disabled={medicine.status === 'missed'}
            className={`w-full sm:w-auto text-xl font-extrabold px-8 py-4 rounded-2xl shadow-md transition-all active:scale-95
              ${medicine.status === 'missed'
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:shadow-lg'
              }`}
          >
            {medicine.status === 'missed' ? 'Missed' : '✓ TAKEN'}
          </button>
        )}
      </div>
    </div>
  )
}
