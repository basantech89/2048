import create from 'zustand'

type State = {
  highestScore: number
  changeScore: (by: number) => void
}

const initialScore = 0

const useStore = create<State>(set => ({
  highestScore: initialScore,
  changeScore: by => set(state => ({ highestScore: state.highestScore + by })),
  resetScore: () => set({ highestScore: initialScore })
}))
