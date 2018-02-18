import React, { Component } from 'react';
import propTypes from 'prop-types';
import Square from './square';
import SquareBoard from './squareBoard';
import Knight from './knight';
import { moveKnight, canMoveKnight } from '../gam';
import { DragDropContext } from 'react-dnd';
import HTML5Backed from 'react-dnd-html5-backend';

const styles = {
  board: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    border: '2px solid black'
  },
  square: {
    width: '12.5%',
    height: '12.5%'
  }
}

class Board extends Component {

  static propTypes = {
    knightPosition: propTypes.arrayOf(
      propTypes.number.isRequired
    ).isRequired
  }

  handleSquareClick = (x, y) => {
    if (canMoveKnight(x, y)) {
      moveKnight(x, y)
    }
  }

  renderPiece = (x, y) => {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y === knightY) {
      return (
        <Knight/>
      )
    }
  }

  renderSquare = (i) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i} style={styles.square} 
      onClick={() => { this.handleSquareClick(x, y) }} >
        <SquareBoard x={x} y={y} >
          {this.renderPiece(x, y)}
        </SquareBoard>
      </div>
    )
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i))
    }
    return (
      <div className="chess_board" style={styles.board} >
        { squares }
      </div>
    )
  }

}

export default DragDropContext(HTML5Backed)(Board)