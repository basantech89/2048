import React from 'react'

import { Board } from '../store/board'
import { consts } from '../utils/constants'

const useTiles = (board: Board, changeScore: (score: number) => void) => {
  const tiles = board.flat()
  const initialTiles = tiles.reduce((movement, score, index) => {
    if (score > 0) {
      movement[index] = index
    }
    return movement
  }, [] as number[])

  const [newTile, setNewTile] = React.useState(-1)

  const { current: tilesMovement } = React.useRef<number[]>(initialTiles)

  const columns = consts.BOARD_COLS
  const rows = consts.BOARD_ROWS

  let startIdx
  let moveToIdx = -1
  let tileScore
  let movedTileScore
  let innerTileIdx
  let innerTileScore

  const moveTiles = (tileIdx: number, movedTileScore: number) => {
    if (moveToIdx !== tileIdx) {
      tiles[moveToIdx] = movedTileScore
      tilesMovement[tileIdx] = moveToIdx
      tiles[tileIdx] = 0
    }
  }

  const moveTilesUp = () => {
    startIdx = columns
    for (let tileIdx = startIdx; tileIdx < tiles.length; tileIdx++) {
      tileScore = tiles[tileIdx]
      if (tileScore > 0) {
        movedTileScore = tileScore
        innerTileIdx = tileIdx - columns

        // go through inner tile to find which tile this tile would move to
        while (innerTileIdx >= 0) {
          innerTileScore = tiles[innerTileIdx]
          if (innerTileScore !== 0) {
            if (tileScore === innerTileScore) {
              moveToIdx = innerTileIdx
              movedTileScore += innerTileScore
              changeScore(movedTileScore)
              break
            } else {
              moveToIdx = innerTileIdx + columns
              break
            }
          } else if (innerTileIdx - columns < 0) {
            moveToIdx = innerTileIdx
            break
          }
          innerTileIdx -= columns
        }

        moveTiles(tileIdx, movedTileScore)
      }
    }
  }

  const moveTilesDown = () => {
    startIdx = (rows - 2) * columns + columns - 1
    for (let tileIdx = startIdx; tileIdx >= 0; tileIdx--) {
      tileScore = tiles[tileIdx]
      if (tileScore > 0) {
        let movedTileScore = tileScore
        let innerTileIdx = tileIdx + columns
        let innerTileScore

        while (innerTileIdx < tiles.length) {
          innerTileScore = tiles[innerTileIdx]
          if (innerTileScore !== 0) {
            if (tileScore === innerTileScore) {
              moveToIdx = innerTileIdx
              movedTileScore += innerTileScore
              changeScore(movedTileScore)
              break
            } else {
              moveToIdx = innerTileIdx - columns
              break
            }
          } else if (innerTileIdx + columns >= tiles.length) {
            moveToIdx = innerTileIdx
            break
          }
          innerTileIdx += columns
        }

        moveTiles(tileIdx, movedTileScore)
      }
    }
  }

  const moveTilesLeft = () => {
    startIdx = 1
    for (
      let tileIdx = startIdx;
      tileIdx < tiles.length;
      (tileIdx + 1) % columns === 0 ? (tileIdx += 2) : tileIdx++
    ) {
      tileScore = tiles[tileIdx]
      if (tileScore > 0) {
        let movedTileScore = tileScore
        let innerTileIdx = tileIdx - 1
        let innerTileScore

        while (tileIdx - innerTileIdx < columns) {
          innerTileScore = tiles[innerTileIdx]
          if (innerTileScore !== 0) {
            if (tileScore === innerTileScore) {
              moveToIdx = innerTileIdx
              movedTileScore += innerTileScore
              changeScore(movedTileScore)
              break
            } else {
              moveToIdx = innerTileIdx + 1
              break
            }
          } else if (innerTileIdx % columns === 0) {
            moveToIdx = innerTileIdx
            break
          }
          innerTileIdx -= 1
        }

        moveTiles(tileIdx, movedTileScore)
      }
    }
  }

  const moveTilesRight = () => {
    startIdx = tiles.length - 2
    for (
      let tileIdx = startIdx;
      tileIdx >= 0;
      tileIdx % columns === 0 ? (tileIdx -= 2) : tileIdx--
    ) {
      tileScore = tiles[tileIdx]
      if (tileScore > 0) {
        let movedTileScore = tileScore
        let innerTileIdx = tileIdx + 1
        let innerTileScore

        while (innerTileIdx - tileIdx < columns) {
          innerTileScore = tiles[innerTileIdx]
          if (innerTileScore !== 0) {
            if (tileScore === innerTileScore) {
              moveToIdx = innerTileIdx
              movedTileScore += innerTileScore
              changeScore(movedTileScore)
              break
            } else {
              moveToIdx = innerTileIdx - 1
              break
            }
          } else if ((innerTileIdx + 1) % columns === 0) {
            moveToIdx = innerTileIdx
            break
          }
          innerTileIdx += 1
        }

        moveTiles(tileIdx, movedTileScore)
      }
    }
  }

  return {
    tiles,
    tilesMovement,
    moveTilesUp,
    moveTilesDown,
    moveTilesLeft,
    moveTilesRight,
    newTile,
    setNewTile
  }
}

export default useTiles
