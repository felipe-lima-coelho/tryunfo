import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
  render() {
    const { value } = this.props;
    return (
      <option value={ value }>{ value }</option>
    );
  }
}

Option.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Option;
