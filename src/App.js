import React, { Component } from 'react';
import Board from './components/board';
import { observe } from './gam';

const style = {
  width: '400px',
  height: '400px',
  margin: '20px auto'
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      knightPosition: null
    }
  }

  componentWillMount() {
    observe((knightPosition) => {
      this.setState({ knightPosition });
    });
  }

  render() {
    const { knightPosition } = this.state;
    return (
      <div style={style} >
        <Board knightPosition={ knightPosition } />
      </div>
    );
  }
}

export default App;
