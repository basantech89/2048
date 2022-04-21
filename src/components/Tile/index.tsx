import React from 'react'

declare interface TileProps {
  children: any
}

const Tile = props => {
  return <div> {props.children} </div>
}

export default Tile
