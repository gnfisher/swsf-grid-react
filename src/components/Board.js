import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gridspace from './Gridspace';

export class Board extends Component {
  unitsWithin = (gridspaceKey, units) => {
    return Object.keys(units)
      .filter(key => {
        return units[`${key}`].location === gridspaceKey;
    });
  };

  createGridspaces = (key) => {
    return (
      <Gridspace
        key={key}
        id={key}
        friendlyUnits={this.unitsWithin(key, this.props.friendlyUnits)}
        enemyUnits={this.unitsWithin(key, this.props.enemyUnits)}
      />
    )
  };

  renderInnerGrid = () => {
    const gridLetters = [
      "A", "B", "C", "D", "E",
      "F", "G", "H", "I", "J",
      "K", "L", "M", "N", "O",
      "P", "Q", "R", "S", "T",
      "U", "V", "W", "X", "Y"
    ];

    return gridLetters.map(key => this.createGridspaces(key));
  }

  render() {
    return (
      <div id="board">
        <Gridspace 
          key="TRANSIT"
          id="TRANSIT"
          long={true}
          friendlyUnits={this.unitsWithin("TRANSIT", this.props.friendlyUnits)}
          enemyUnits={this.unitsWithin("TRANSIT", this.props.enemyUnits)}
        />
        <div className="inner-grid">
          {this.renderInnerGrid()}
        </div>
        <Gridspace
          key="Z"
          id="Z"
          long={true}
          friendlyUnits={this.unitsWithin("Z", this.props.friendlyUnits)}
          enemyUnits={this.unitsWithin("Z", this.props.enemyUnits)}
        />
      </div>
    );
  }
}

Board.PropTypes = {
  friendlyUnits: PropTypes.object,
  enemyUnits: PropTypes.object
}

export default Board;
