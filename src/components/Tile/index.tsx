import './styles.scss'

import React from 'react'

import { consts } from '../../utils/constants'

declare type TileProps =
  | {
      row: number
      col: number
      tilesMovement: number[]
      tiles: number[]
      tileScore: number
    }
  | Record<string, any>

const getTransform = (row: number, col: number) =>
  `translate(${106.25 * col + col * 15}px, ${106.25 * row + row * 15}px)`

const columns = consts.BOARD_COLS

const Tile: React.FC<TileProps> = ({
  row,
  col,
  tileScore,
  tiles,
  tilesMovement
}) => {
  if (row !== 0 && !row) {
    return <div className="tile" />
  }

  const fromIdx = row * columns + col
  const toIdx = tilesMovement[fromIdx]
  const toRow = Math.floor(toIdx / columns)
  const toCol = toIdx % columns
  const score = tiles[toIdx]

  if (score > 0 && toRow >= 0 && toCol >= 0) {
    const transform = getTransform(toRow, toCol)

    return (
      <div
        id={`${row}-${col}`}
        className={`tile tile-${score}`}
        style={{ transform, transition: 'transform 0.1s ease-in-out' }}
      >
        <span>{score}</span>
      </div>
    )
  }

  if (tileScore > 0) {
    const transform = getTransform(row, col)

    return (
      <div
        id={`${row}-${col}`}
        className={`tile tile-${tileScore}`}
        style={{ transform, transition: 'transform 0.1s ease-in-out' }}
      >
        <span>{tileScore}</span>
      </div>
    )
  }

  return null
}

export default React.memo(Tile)
