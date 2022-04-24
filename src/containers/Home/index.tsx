import './styles.scss'

import React from 'react'
import { Button } from 'react-bootstrap'

import { useAppDispatch, useAppSelector } from '../../store'
import { redoBoard, resetBoard, undoBard } from '../../store/board'
import {
  redoScore,
  resetScore,
  selectScore,
  undoScore
} from '../../store/score'
import Board from '../Board'

const Home = () => {
  const dispatch = useAppDispatch()
  const { score, best } = useAppSelector(selectScore)

  const undo = () => {
    dispatch(undoBard())
    dispatch(undoScore())
  }

  const redo = () => {
    dispatch(redoBoard())
    dispatch(redoScore())
  }

  const reset = () => {
    dispatch(resetBoard())
    dispatch(resetScore())
  }

  return (
    <div className="home">
      <div className="header">
        <div>
          <h1> 2048 </h1>
          <div>
            <div className="score-card">
              <span> SCORE </span>
              <span> {score} </span>
            </div>
            <div className="score-card">
              <span> BEST </span>
              <span> {best} </span>
            </div>
          </div>
        </div>
        <div className="title">
          <div>
            join the tiles, get to <strong>2048! </strong>
          </div>
          <Button onClick={reset}> New Game </Button>
        </div>
        <div className="actions">
          <Button onClick={redo}> Redo </Button>
          <Button onClick={undo}> Undo </Button>
        </div>
      </div>
      <Board />
    </div>
  )
}

export default Home
