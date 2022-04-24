import { createSlice, current } from '@reduxjs/toolkit'

import board from '../containers/Board'
import { generateBoard, getRandomItems, startGame } from '../utils'
import { consts } from '../utils/constants'
import { RootState } from './index'

export type Board = number[][]

export type BoardState = {
  board: Board
}

const initialBoard: Board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

const initialState: BoardState = { board: startGame(initialBoard) }

let boards: Board[] = [initialState.board]
const poppedBoards: Board[] = []
let currentBoardIdx = 0

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetBoard: state => {
      const newGame = startGame(initialBoard)
      boards = [newGame]
      currentBoardIdx = 0
      state.board = newGame
    },
    setBoard: (state, action) => {
      boards.push(action.payload)
      currentBoardIdx += 1
      state.board = action.payload
    },
    undoBard: state => {
      if (boards.length > 1) {
        const popped = boards.pop()
        if (popped) {
          poppedBoards.push(popped)
          currentBoardIdx -= 1
          state.board = boards[currentBoardIdx]
        }
      }
    },
    redoBoard: state => {
      const popped = poppedBoards.pop()
      if (popped) {
        boards.push(popped)
        currentBoardIdx += 1
        state.board = boards[currentBoardIdx]
      }
    }
  }
})

export const { resetBoard, setBoard, undoBard, redoBoard } = boardSlice.actions

export default boardSlice.reducer

export const selectBoard = (state: RootState) => state.board
