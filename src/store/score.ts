import { createSlice, current } from '@reduxjs/toolkit'

import board from '../containers/Board'
import { getRandomItems } from '../utils'
import { consts } from '../utils/constants'
import { RootState } from './index'

export type Score = {
  score: number
  best: number
  lastScore: number
  nextScore: number
}

const initialState: Score = { score: 0, best: 0, lastScore: 0, nextScore: 0 }

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    changeScore: (state, action) => {
      const currentState = current(state)
      state.lastScore = currentState.score
      state.score = currentState.score + action.payload
      if (action.payload > currentState.best) {
        state.best = action.payload
      }
    },
    resetScore: state => {
      state.lastScore = current(state).score
      state.score = 0
    },
    undoScore: state => {
      const currentState = current(state)
      state.nextScore = currentState.score
      state.score = currentState.lastScore
    },
    redoScore: state => {
      const currentState = current(state)
      state.lastScore = currentState.score
      state.score = currentState.nextScore
    }
  }
})

export const { resetScore, changeScore, undoScore, redoScore } =
  scoreSlice.actions

export default scoreSlice.reducer

export const selectScore = (state: RootState) => state.score
