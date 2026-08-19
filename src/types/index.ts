export type MedicineStatus = 'pending' | 'taken' | 'missed' | 'due'

export interface Medicine {
  id: string
  name: string
  dosage: string
  instruction: string
  time: string
  frequency: string
  status: MedicineStatus
}

export interface ElderlyUser {
  id: string
  name: string
  age: number
  medicines: Medicine[]
}

export type UserRole = 'elderly' | 'family'

export interface AppUser {
  name: string
  role: UserRole
}
