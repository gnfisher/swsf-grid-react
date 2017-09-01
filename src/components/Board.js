import React, { Component } from 'react';
import Gridspace from './Gridspace';

export class Board extends Component {
  render() {
    return (
      <div id="board">
        <Gridspace key="TRANSIT" long={true} />
        <div className="inner-grid">

        </div>
        <Gridspace key="Z" long={true} />
      </div>
    );
  }
}

export default Board;
