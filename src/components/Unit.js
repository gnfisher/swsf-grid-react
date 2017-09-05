import React, { Component } from 'react';
import PropType from 'prop-types';
import rocket from '../css/images/rocket.svg';

export class Unit extends Component {
  render() {
    const heading       = this.props.unit.heading;
    const alliance      = (this.props.friendly ? 'friendly' : 'enemy');
    const compiledClass = `unit unit--${heading} unit--${alliance}`;

    return (
      <img src={rocket} className={compiledClass} />
    )
  }
}

Unit.propTypes = {
  unit: PropType.object.isRequired,
  friendly: PropType.bool.isRequired
}

export default Unit;
