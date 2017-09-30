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
    // moveUnit(space);
  };

  render() {
    return (
      <div className={"gridspace-wrapper" + (this.isLong() ? ' gridspace-wrapper--long' : '')}
           onClick={() => this.handleClick(this.props.id)}>
        <div className="gridspace">
          {Object.keys(this.props.friendlyUnits).map(this.renderFriendlyUnit)}
          {Object.keys(this.props.enemyUnits).map(this.renderEnemyUnit)}
        </div>
      </div>
    );
  }
}

Gridspace.propTypes = {
  id: PropTypes.string.isRequired,
  long: PropTypes.bool,
  friendlyUnits: PropTypes.object,
  enemyUnits: PropTypes.object
}

export default Gridspace;
