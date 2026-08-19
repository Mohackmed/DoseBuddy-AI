import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Pill, User, Users, Eye, EyeOff } from 'lucide-react'
import { UserRole } from '../types'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>('elderly')
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

  const onSubmit = (_data: LoginForm) => {
    navigate(role === 'elderly' ? '/elderly' : '/family')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-blue-600 p-4 rounded-2xl shadow-lg mb-4">
            <Pill className="text-white" size={36} />
          </div>
          <h1 className="text-4xl font-extrabold text-blue-700">DoseBuddy AI</h1>
          <p className="text-slate-500 mt-2 text-lg">Your smart medication companion</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>

          {/* Role Selector */}
          <p className="text-slate-600 font-semibold mb-3 text-base">I am...</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('elderly')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all font-semibold text-sm
                ${role === 'elderly'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-500 hover:border-blue-300'}`}
            >
              <User size={28} />
              <span className="text-center leading-tight">Taking Medication</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('family')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all font-semibold text-sm
                ${role === 'family'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-slate-200 text-slate-500 hover:border-purple-300'}`}
            >
              <Users size={28} />
              <span className="text-center leading-tight">Monitoring Family</span>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-2 text-base">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 text-base">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-lg focus:outline-none focus:border-blue-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xl py-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 mt-2"
            >
              {isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-5 text-base">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 font-bold hover:underline"
            >
              {isRegister ? 'Sign In' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
