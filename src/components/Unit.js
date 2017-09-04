import React, { Component } form 'react';
import PropTypes from 'prop-types';

export class Unit extends Component {
}

Unit.propTypes = {
  unit: PropType.object.isRequired,
  friendly: PropType.bool.isRequired
}

export default Unit;
