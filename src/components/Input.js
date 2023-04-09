import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Inputs.module.css';

class Input extends Component {
  render() {
    const {
      name,
      dataTestId,
      textLabel,
      typeInput,
      value,
      maxLength,
      onInputChange,
    } = this.props;

    return (
      <label htmlFor={ name }>
        { textLabel }
        <input
          className={ styles.classInput }
          data-testid={ dataTestId }
          type={ typeInput }
          name={ name }
          id={ name }
          value={ value }
          maxLength={ name === 'cardName' ? maxLength : '' }
          onChange={ onInputChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  textLabel: PropTypes.string.isRequired,
  typeInput: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Input;
