import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.css';

class Checkbox extends Component {
  render() {
    const { cardTrunfo, onInputChange } = this.props;

    return (
      <label htmlFor="cardTrunfo" className={ styles.trunfoInputCheck }>
        <input
          className={ styles.squareBtn }
          data-testid="trunfo-input"
          type="checkbox"
          name="cardTrunfo"
          id="cardTrunfo"
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
        <span>Super Trybe Trunfo</span>
      </label>
    );
  }
}

Checkbox.propTypes = {
  cardTrunfo: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Checkbox;
