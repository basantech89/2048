import React from 'react'
import './styles.scss'
import { Button } from 'react-bootstrap'

const Home = () => {
  return (
    <div className="home">
      <div className="header">
        <div>
          <h1> 2048 </h1>
          <div className="score-card">
            <span> SCORE </span>
            <span> 0 </span>
          </div>
          <div className="score-card">
            <span> BEST </span>
            <span> 1624 </span>
          </div>
        </div>
        <div className="title">
          <div>
            join the tiles, get to <strong>2048! </strong>
          </div>
          <Button> New Game </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
