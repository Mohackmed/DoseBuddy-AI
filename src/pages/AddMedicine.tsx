import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'

interface MedicineForm {
  name: string
  dosage: string
  time: string
  instruction: string
  frequency: string
}

// Mock AI parser — simulates a backend call
function parseAIPrompt(prompt: string): Partial<MedicineForm> {
  const lower = prompt.toLowerCase()
  const nameMatch = lower.match(/\b(amlodipine|metformin|aspirin|atorvastatin|lisinopril|omeprazole|paracetamol|ibuprofen)\b/i)
  const timeMatch = prompt.match(/\b(\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i)
  const dosageMatch = prompt.match(/(\d+\s*(?:mg|ml|mcg|tablet|capsule)s?)/i)

  const instructionMap: Record<string, string> = {
    'after breakfast': 'Take after breakfast',
    'before breakfast': 'Take before breakfast',
    'after lunch': 'Take after lunch',
    'after dinner': 'Take after dinner',
    'before bed': 'Take before bed',
    'with water': 'Take with water',
  }
  const instruction = Object.entries(instructionMap).find(([k]) => lower.includes(k))?.[1] ?? 'Take as directed'

  return {
    name: nameMatch ? nameMatch[0].charAt(0).toUpperCase() + nameMatch[0].slice(1) : '',
    dosage: dosageMatch ? dosageMatch[0] : '',
    time: timeMatch ? timeMatch[0].toUpperCase() : '',
    instruction,
    frequency: 'Daily',
  }
}

export default function AddMedicine() {
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<MedicineForm>()

  const handleAIFill = async () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    await new Promise(r => setTimeout(r, 1200)) // simulate API delay
    const parsed = parseAIPrompt(aiPrompt)
    Object.entries(parsed).forEach(([k, v]) => setValue(k as keyof MedicineForm, v))
    setAiLoading(false)
  }

  const onSubmit = async (_data: MedicineForm) => {
    setSaved(true)
    await new Promise(r => setTimeout(r, 1500))
    navigate('/elderly')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar userName="Margaret" />

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-1">Add New Medicine</h1>
        <p className="text-slate-500 text-base mb-8">Use AI to fill the form, or enter details manually.</p>

        {/* AI Assistant Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-yellow-300" size={22} />
            <h2 className="text-white font-bold text-xl">AI Assistant</h2>
          </div>
          <p className="text-blue-100 text-sm mb-4">
            Describe your medicine in plain English and let AI fill the form for you.
          </p>
          <textarea
            value={aiPrompt}
            onChange={e => setAiPrompt(e.target.value)}
            placeholder='e.g. "Take 1 Amlodipine 5mg after breakfast at 8 AM daily"'
            rows={3}
            className="w-full rounded-2xl px-4 py-3 text-slate-800 text-base resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300 placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={handleAIFill}
            disabled={aiLoading || !aiPrompt.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-slate-900 font-extrabold text-lg py-3.5 rounded-2xl transition-all active:scale-95"
          >
            {aiLoading ? (
              <><Loader2 className="animate-spin" size={20} /> Thinking...</>
            ) : (
              <><Sparkles size={20} /> Fill Form for Me</>
            )}
          </button>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-xl font-bold text-slate-700">Medicine Details</h2>

          {[
            { id: 'name', label: 'Medicine Name', placeholder: 'e.g. Amlodipine', type: 'text', required: true },
            { id: 'dosage', label: 'Dosage', placeholder: 'e.g. 5mg — 1 Tablet', type: 'text', required: true },
            { id: 'time', label: 'Time', placeholder: 'e.g. 8:00 AM', type: 'text', required: true },
            { id: 'instruction', label: 'Instruction', placeholder: 'e.g. Take after breakfast', type: 'text', required: false },
          ].map(field => (
            <div key={field.id}>
              <label className="block text-slate-700 font-semibold mb-2 text-base">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id as keyof MedicineForm, field.required ? { required: `${field.label} is required` } : {})}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-lg focus:outline-none focus:border-blue-500 transition-colors bg-white"
              />
              {errors[field.id as keyof MedicineForm] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.id as keyof MedicineForm]?.message}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-slate-700 font-semibold mb-2 text-base">Frequency</label>
            <select
              {...register('frequency', { required: true })}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-lg focus:outline-none focus:border-blue-500 transition-colors bg-white"
            >
              <option value="Daily">Daily</option>
              <option value="Twice Daily">Twice Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="As Needed">As Needed</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={saved}
            className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white font-extrabold text-2xl py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 mt-4"
          >
            {saved ? (
              <><CheckCircle2 size={28} /> Saved!</>
            ) : (
              '💊 Save Medicine'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
