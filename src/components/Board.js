import React, { Component } from 'react';
import Gridspace from './Gridspace';

export class Board extends Component {
  createGridspaces = (key) => {
    return <Gridspace key={key} />;
  }

  renderInnerGrid = () => {
    const gridLetters = [
      "A", "B", "C", "D", "E",
      "F", "G", "H", "I", "J",
      "K", "L", "M", "N", "O",
      "P", "Q", "R", "S", "T",
      "U", "V", "X", "Y"
    ];

    return gridLetters.map(key => this.createGridspaces(key));
  }

  render() {
    return (
      <div id="board">
        <Gridspace key="TRANSIT" long={true} />
        <div className="inner-grid">
          {this.renderInnerGrid()}
        </div>
        <Gridspace key="Z" long={true} />
      </div>
    );
  }
}

export default Board;
