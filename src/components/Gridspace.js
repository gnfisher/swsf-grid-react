import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Unit from './Unit';
import { gameClient } from '../lib/Game';

const Types = {
  UNIT: 'unit'
};

const unitGridspaceTarget = {
  canDrop() {
    // This is where we check if the unit can be dropped or not
    return true;
  },

  drop(props, monitor) {
    // This is where we emit change of state of unit dragged, replaces
    // handleClick() functionality.
  }
};

const collect = (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

export class Gridspace extends Component {
  renderFriendlyUnit = (key) => {
    return <Unit key={key} id={key} friendly={true} unit={this.props.friendlyUnits[`${key}`]} />;
  };

  renderEnemyUnit = (key) => {
    return <Unit key={key} id={key} friendly={false} unit={this.props.enemyUnits[`${key}`]} />;
  };

  handleClick = (space) => {
    gameClient.emit('moveSelectedUnit', space);
  };

  setClass = () => {
    const { isOver } = this.props;

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

  // Notes on making this drop target:
  // - (DONE) create classes for 'can-drop', 'hover'
  // - (DONE) conditionally include these in the className params
  // - make this a DragTarget
  render() {
    const { long, id, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={`gridspace-wrapper ${long && ' gridspace-wrapper--long'}`}
           onClick={() => this.handleClick(id)}>
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
  friendlyUnits: PropTypes.object,
  enemyUnits: PropTypes.object
}

export default DropTarget(Types.UNIT, unitGridspaceTarget)(Gridspace);
