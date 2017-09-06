import React, { Component } from 'react';
import PropType from 'prop-types';
import friendlyRocket from '../css/images/rocket.svg';
import enemyRocket from '../css/images/enemy-rocket.svg';

export class Unit extends Component {
  render() {
    const heading       = this.props.unit.heading;
    const rocket        = (this.props.friendly ? friendlyRocket : enemyRocket);
    const compiledClass = `unit unit--${heading}`;

    return (
      <img src={rocket} className={compiledClass} />
    )
  }
}

Unit.propTypes = {
  id: PropType.string.isRequired,
  unit: PropType.object.isRequired,
  friendly: PropType.bool.isRequired
}

export default Unit;
