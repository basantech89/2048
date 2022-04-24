import { Board } from '../store/board'
import { consts } from './constants'

export function getRandomItems(arr: any[], howMany: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return howMany <= 1 ? shuffled[0] : shuffled.slice(0, howMany)
}

export const getRandomTiles = (tiles: number[], howMany: number) => {
  const availableTiles = tiles.reduce((indexes, tileScore, index) => {
    if (tileScore <= 0) {
      indexes.push(index)
    }

    return indexes
  }, [] as number[])

  return getRandomItems(availableTiles, howMany)
}

export const generateBoard = (tiles: number[]): Board => {
  return tiles.reduce((board, tileScore, index) => {
    if (index % consts.BOARD_COLS === 0) {
      board.push([])
    }
    board[board.length - 1].push(tileScore)

    return board
  }, [] as number[][])
}

export const startGame = (board: number[][]): Board => {
  const BOARD_SIZE = consts.BOARD_ROWS * consts.BOARD_COLS
  const items = getRandomItems(Array.from(Array(BOARD_SIZE).keys()), 2)
  const [tile1, tile2] = items
  const [val1, val2] = getRandomItems([2, 2, 4], 2)
  const tiles = board.flat()
  // tiles[tile1] = val1
  // tiles[tile2] = val2
  tiles[9] = 2
  tiles[11] = 4
  return generateBoard(tiles)
}
