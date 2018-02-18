import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Square extends Component {

  static propTypes = {
    black: propTypes.bool
  }

  render() {
    const { black, children } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return (
      <div className="chess_square" style={{
        backgroundColor: fill,
        width: '100%',
        height: '100%',
        color: stroke
      }} >
        {children}
      </div>
    )
  }
}