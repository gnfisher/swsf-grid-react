import React, { Component } from 'react';
import PropType from 'prop-types';
import rocket from '../css/images/rocket.svg';

export class Unit extends Component {
  render() {
    return (
      <img src={rocket} className={'unit unit--' + this.props.unit.heading} />
    )
  }
}

Unit.propTypes = {
  unit: PropType.object.isRequired,
  friendly: PropType.bool.isRequired
}

export default Unit;
