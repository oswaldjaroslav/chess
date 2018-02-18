import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../constants';
import { horse } from '../horse-pic';
import propTypes from 'prop-types';

const knightSource = {
  beginDrag(props) {
    return {};
  }
}

function collect(connect, monitor) {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Knight extends Component {

  componentDidMount() {
    const img = new Image();
    img.src = horse;
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <span style={{
        fontSize: '38px',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold'
      }} >
        ♘
      </span>
    )
  }
}

Knight.propTypes = {
  connectDragSource: propTypes.func.isRequired,
  isDragging: propTypes.bool.isRequired,
  connectDragPreview: propTypes.func.isRequired
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);