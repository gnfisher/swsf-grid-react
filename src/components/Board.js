import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gridspace from './Gridspace';

export class Board extends Component {
  unitsWithin = (gridspaceKey, units) => {
    const unitKeysWithin = (unitKeysArray) =>
      unitKeysArray.filter(key =>
        units[`${key}`].location === gridspaceKey);

    const findUnitsByKey = (keysArray) =>
      keysArray.reduce((unitsObj, key) => {
        unitsObj[key] = units[key];
        return unitsObj;
      }, {});

    return findUnitsByKey(unitKeysWithin(Object.keys(units)));
  };

  createGridspaces = (key) => {
    const { selectedUnit, friendlyUnits, enemyUnits } = this.props;
    const allUnits = Object.assign({}, friendlyUnits, enemyUnits);

    return (
      <Gridspace
        key={key}
        id={key}
        long={false}
        selectedUnit={selectedUnit}
        friendlyUnits={this.unitsWithin(key, friendlyUnits)}
        enemyUnits={this.unitsWithin(key, enemyUnits)}
        allUnits={allUnits}
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
    const { selectedUnit, friendlyUnits, enemyUnits } = this.props;
    const allUnits = Object.assign({}, friendlyUnits, enemyUnits);

    return (
      <div id="board">
        <Gridspace
          key="TRANSIT"
          id="TRANSIT"
          long={true}
          selectedUnit={selectedUnit}
          friendlyUnits={this.unitsWithin("TRANSIT", friendlyUnits)}
          enemyUnits={this.unitsWithin("TRANSIT", enemyUnits)}
          allUnits ={allUnits}
        />
        <div className="inner-grid">
          {this.renderInnerGrid()}
        </div>
        <Gridspace
          key="Z"
          id="Z"
          long={true}
          selectedUnit={selectedUnit}
          friendlyUnits={this.unitsWithin("Z", friendlyUnits)}
          enemyUnits={this.unitsWithin("Z", enemyUnits)}
          allUnits={allUnits}
        />
      </div>
    );
  }
}

Board.PropTypes = {
  selectedUnit: PropTypes.string,
  friendlyUnits: PropTypes.object,
  enemyUnits: PropTypes.object
}

export default Board;
