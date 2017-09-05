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

  render() {
    return (
      <div className={"gridspace-wrapper" + (this.isLong() ? ' gridspace-wrapper--long' : '')}>
        <div className="gridspace">
          {this.props.friendlyUnits.map(this.renderFriendlyUnit)}
          {this.props.enemyUnits.map(this.renderEnemyUnit)}
        </div>
      </div>
    );
  }
}

Gridspace.propTypes = {
  id: PropTypes.string.isRequired,
  long: PropTypes.bool,
  friendlyUnits: PropTypes.array,
  enemyUnits: PropTypes.array
}

export default Gridspace;
