import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Hud extends Component {

  render() {
    const { selectedUnit } = this.props;
    return (
      <div className="hud" style={{backgroundColor: 'yellow'}}>
        <ul>
          <li>Unit: {selectedUnit.name}</li>
          <li>Location/Heading: {selectedUnit.location}/{selectedUnit.heading}</li>
          <li>Moves Left: {selectedUnit.speed}</li>
          <li>Turns Left: {selectedUnit.maneuverability}</li>
        </ul>
      </div>
    )
  }
};

Hud.propTypes = {
  selectedUnit: PropTypes.object.isRequired
};

export default Hud;
