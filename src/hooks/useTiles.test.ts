import { generateBoard } from '../utils'
import useTiles from './useTiles'

const sampleTiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 4, 0, 0, 0, 0]
const board = generateBoard(sampleTiles)

describe('useUtils custom hook', () => {
  it('should move tiles correctly', function () {
    const { tiles, tilesMovement, moveTilesUp } = useTiles(board, () => {})
    moveTilesUp()
    expect(tiles[1]).toBe(2)
    expect(tiles[3]).toBe(4)
  })
})
