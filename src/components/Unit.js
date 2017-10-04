import { gameClient } from '../lib/Game';
import React, { Component } from 'react';
import PropType from 'prop-types';

import friendlyRocket from '../css/images/rocket.svg';
import enemyRocket from '../css/images/enemy-rocket.svg';

export class Unit extends Component {
  handleClick = (id) => {
    gameClient.emit('selectUnit', id);
  };

  render() {
    const heading       = this.props.unit.heading;
    const rocket        = (this.props.friendly ? friendlyRocket : enemyRocket);
    const compiledClass = `unit unit--${heading}`;

    return (
      <img src={rocket}
        className={compiledClass}
        onClick={() => this.handleClick(this.props.id)} />
    )
  }
}

Unit.propTypes = {
  id: PropType.string.isRequired,
  unit: PropType.object.isRequired,
  friendly: PropType.bool.isRequired
}

export default Unit;
