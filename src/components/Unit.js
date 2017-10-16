import React, { Component } from 'react';
import PropType from 'prop-types';
import { DragSource } from 'react-dnd';
import { gameClient } from '../lib/Game';
import friendlyRocket from '../css/images/rocket.svg';
import enemyRocket from '../css/images/enemy-rocket.svg';

const Types = {
  UNIT: 'unit'
};

const unitSource = {
  canDrag(props, monitor) {
    return props.friendly;
  },

  beginDrag(props, monitor, component) {
    return { id: props.id };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
  };
};

export class Unit extends Component {
  handleClick = (id) => {
    gameClient.emit('selectUnit', id);
  };

  render() {
    const { id, unit, connectDragSource } = this.props;
    const rocket        = (this.props.friendly ? friendlyRocket : enemyRocket);
    const compiledClass = `unit unit--${unit.heading}`;

    return connectDragSource(
      <img src={rocket}
        className={compiledClass}
        onClick={() => this.handleClick(id)} />
    )
  }
}

Unit.propTypes = {
  id: PropType.string.isRequired,
  unit: PropType.object.isRequired,
  friendly: PropType.bool.isRequired
}

export default DragSource(Types.UNIT, unitSource, collect)(Unit);
