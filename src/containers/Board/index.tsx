import './styles.scss'

import React from 'react'

import Tile from '../../components/Tile'
import useArrowKeys from '../../hooks/useArrowKeys'
import useTiles from '../../hooks/useTiles'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectBoard, setBoard } from '../../store/board'
import { changeScore } from '../../store/score'
import { getRandomItems, getRandomTiles } from '../../utils'
import { consts, keys } from '../../utils/constants'

const Board: React.FC = () => {
  const { board } = useAppSelector(selectBoard)

  const dispatch = useAppDispatch()
  const setScoreBy = (score: number) => dispatch(changeScore(score))

  const {
    tiles,
    tilesMovement,
    moveTilesUp,
    moveTilesDown,
    moveTilesLeft,
    moveTilesRight,
    setNewTile
  } = useTiles(board, setScoreBy)

  const setNewBoard = (tiles: number[]) => {
    const newBoard = tiles.reduce((board, tileScore, index) => {
      if (index % consts.BOARD_COLS === 0) {
        board.push([])
      }
      board[board.length - 1].push(tileScore)

      return board
    }, [] as number[][])

    dispatch(setBoard(newBoard))
  }

  const addNewTile = () => {
    const newTiles = [...tiles]
    const newTile = getRandomTiles(tiles, 1)
    newTiles[newTile] = getRandomItems([2, 4], 1)
    // tilesMovement[newTile] = newTile
    // setNewTile(newTile)
    setNewBoard(newTiles)
  }

  console.log('cc', board)

  const arrowKeyHandler = React.useCallback(
    (keyCode: string | number) => {
      if (keyCode === keys.UP) {
        moveTilesUp()
      } else if (keyCode === keys.DOWN) {
        moveTilesDown()
      } else if (keyCode === keys.LEFT) {
        moveTilesLeft()
      } else if (keyCode === keys.RIGHT) {
        moveTilesRight()
      }

      if (Object.values(keys).includes(keyCode as number)) {
        addNewTile()
      }
    },
    [board]
  )

  useArrowKeys(arrowKeyHandler)

  return (
    <div className="board">
      <div className="base-board">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="board-row">
            {row.map((_, colIdx) => (
              <Tile key={`base-${rowIdx}-${colIdx}`} />
            ))}
          </div>
        ))}
      </div>

      <div className="tile-board">
        {board.map((row, rowIdx) =>
          row.map((tileScore, colIdx) => (
            <Tile
              key={`${rowIdx}-${colIdx}`}
              row={rowIdx}
              col={colIdx}
              tiles={tiles}
              tileScore={tileScore}
              tilesMovement={tilesMovement}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Board
