import { gameClient } from '../lib/Game';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Unit from './Unit';

export class Gridspace extends Component {
  isLong = () => {
    return (this.props.long === true ? true : false);
  };

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
  // - create classes for 'can-drop', 'hover'
  // - conditionally include these in the className params, but think of a way
  //   to clean this up and make it not so nasty?
  render() {
    return (
      <div className={`gridspace-wrapper ${this.props.long && ' gridspace-wrapper--long'}`}
           onClick={() => this.handleClick(this.props.id)}>
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

export default Gridspace;
