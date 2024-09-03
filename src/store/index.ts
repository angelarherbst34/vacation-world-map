import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { Vacation } from '@/types'

interface VacationState {
  vacations: Vacation[]
}
interface VacationActions {
  setVacations: (vacations: Vacation[]) => void
  addVacation: (vacation: Vacation) => void
}

export const useVacationStore = create<VacationState & VacationActions>(
  (set) => ({
    vacations: [
      {
        address: '',
        coord: [51.505, -0.09],
        id: uuidv4(),
        description: 'A food tour of London',
        imageSrc: '',
      },
      {
        address: '',
        coord: [49, -0.09],
        id: uuidv4(),
        description: 'D-day celebration in Normandie',
        imageSrc: '',
      },
      {
        address: '',
        coord: [49, 10],
        id: uuidv4(),
        description: 'A camping trip close to Hohenberg, Germany',
        imageSrc: '',
      },
    ] as Vacation[],
    setVacations: (vacations: Vacation[]) => set({ vacations }),
    addVacation: (vacation: Vacation) =>
      set((store) => ({ vacations: [...store.vacations, vacation] })),
  }),
)
