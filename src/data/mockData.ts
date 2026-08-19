import { Medicine, ElderlyUser } from '../types'

export const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Amlodipine',
    dosage: '5mg — 1 Tablet',
    instruction: 'Take after breakfast',
    time: '8:00 AM',
    frequency: 'Daily',
    status: 'taken',
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg — 1 Tablet',
    instruction: 'Take with lunch',
    time: '1:00 PM',
    frequency: 'Daily',
    status: 'due',
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '10mg — 1 Tablet',
    instruction: 'Take after dinner',
    time: '8:00 PM',
    frequency: 'Daily',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Aspirin',
    dosage: '75mg — 1 Tablet',
    instruction: 'Take before bed',
    time: '10:00 PM',
    frequency: 'Daily',
    status: 'missed',
  },
]

export const mockElderlyUsers: ElderlyUser[] = [
  {
    id: 'u1',
    name: 'Margaret Johnson',
    age: 72,
    medicines: mockMedicines,
  },
  {
    id: 'u2',
    name: 'Robert Williams',
    age: 68,
    medicines: [
      {
        id: '5',
        name: 'Lisinopril',
        dosage: '10mg — 1 Tablet',
        instruction: 'Take in the morning',
        time: '9:00 AM',
        frequency: 'Daily',
        status: 'taken',
      },
      {
        id: '6',
        name: 'Omeprazole',
        dosage: '20mg — 1 Capsule',
        instruction: 'Take before meals',
        time: '12:00 PM',
        frequency: 'Daily',
        status: 'pending',
      },
    ],
  },
]
