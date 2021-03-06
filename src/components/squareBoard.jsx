import React, { Component } from 'react';
import propTypes from 'prop-types';
import Square from './square';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../constants';
import { moveKnight, canMoveKnight } from '../gam';

const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.x, props.y);
  },
  drop(props) {
    moveKnight(props.x, props.y);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class SquareBoard extends Component {

  renderOverlay = (color) => {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    )
  }

  render() {
    const { x, y, children, connectDropTarget, isOver, canDrop } = this.props;
    const black = (x + y) % 2 === 1;
    return connectDropTarget(
      <div className="drop-target" style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }} >
        <Square black={black} >
          {children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {isOver && canDrop && this.renderOverlay('green')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
      </div>
    )
  }
}

SquareBoard.propTypes = {
  x: propTypes.number.isRequired,
  y: propTypes.number.isRequired,
  connectDropTarget: propTypes.func.isRequired,
  isOver: propTypes.bool.isRequired,
  canDrop: propTypes.bool.isRequired
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(SquareBoard);