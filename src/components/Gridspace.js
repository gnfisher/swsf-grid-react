import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Unit from './Unit';
import { gameClient } from '../lib/Game';
import { canMove } from '../lib/moves/Moves';

const Types = {
  UNIT: 'unit'
};

const unitGridspaceTarget = {
  canDrop(props, monitor) {
    const { id, allUnits } = props;
    const item = monitor.getItem();
    const unit     = allUnits[item.id];
    console.log(item, unit);

    return canMove(id, unit, allUnits);
  },

  drop(props, monitor) {
    // This is where we emit change of state of unit dragged, replaces
    // handleClick() functionality.
    const unit = monitor.getItem();
    gameClient.emit('moveSelectedUnit', unit.id, props.id);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

export class Gridspace extends Component {
  renderFriendlyUnit = (key) => {
    return <Unit key={key} id={key} friendly={true} unit={this.props.friendlyUnits[key]} />;
  };

  renderEnemyUnit = (key) => {
    return <Unit key={key} id={key} friendly={false} unit={this.props.enemyUnits[key]} />;
  };

  setClass = () => {
    const { isOver, canDrop } = this.props;

    if (!isOver && canDrop) {
      return 'gridspace gridspace--can-move';
    } else if (isOver && canDrop) {
      return 'gridspace gridspace--is-over-can-move';
    } else if (isOver && !canDrop) {
      return 'gridspace gridspace--is-over-cant-move';
    } else {
      return 'gridspace';
    }
  };

  render() {
    const { long, id, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={`gridspace-wrapper ${long && ' gridspace-wrapper--long'}`}>
        <div className={this.setClass()}>
          {Object.keys(this.props.friendlyUnits).map(this.renderFriendlyUnit)}
          {Object.keys(this.props.enemyUnits).map(this.renderEnemyUnit)}
        </div>
      </div>
    );
  }
}

Gridspace.propTypes = {
  id: PropTypes.string.isRequired,
  long: PropTypes.bool.isRequired,
  friendlyUnits: PropTypes.object.isRequired,
  enemyUnits: PropTypes.object.isRequired,
  allUnits: PropTypes.object.isRequired
}

export default DropTarget(Types.UNIT, unitGridspaceTarget, collect)(Gridspace);
