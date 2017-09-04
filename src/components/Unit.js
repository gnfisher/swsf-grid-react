import React, { Component } from 'react';
import PropType from 'prop-types';

export class Unit extends Component {
  render() {
    return (
      <div>Unit!</div>
    )
  }
}

Unit.propTypes = {
  unit: PropType.object.isRequired,
  friendly: PropType.bool.isRequired
}

export default Unit;
