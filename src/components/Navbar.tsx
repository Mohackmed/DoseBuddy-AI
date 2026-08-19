import { useNavigate } from 'react-router-dom'
import { Pill, LogOut } from 'lucide-react'

interface NavbarProps {
  userName?: string
}

export default function Navbar({ userName }: NavbarProps) {
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Pill className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold text-blue-700 tracking-tight">
            DoseBuddy
            <span className="text-blue-400 font-medium"> AI</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {userName && (
            <span className="hidden sm:block text-slate-500 text-sm font-medium">
              {userName}
            </span>
          )}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
