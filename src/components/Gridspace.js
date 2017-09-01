import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Gridspace extends Component {
  isLong = () => {
    return (this.props.long === true ? true : false);
  }

  render() {
    return (
      <div className={"gridspace-wrapper" + (this.isLong() ? ' gridspace-wrapper--long' : '')}>
        <div className="gridspace">
        </div>
      </div>
    );
  }
}

Gridspace.propTypes = {
  long: PropTypes.bool
}

export default Gridspace;
