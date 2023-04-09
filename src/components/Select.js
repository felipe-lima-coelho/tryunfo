import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import styles from './Select.module.css';

class Select extends Component {
  render() {
    const { filterRare, filterTrunfo, onInputChange } = this.props;

    return (
      <div>
        <strong>Tipo</strong>
        <select
          className={ styles.filterRare }
          data-testid="rare-filter"
          name="filterRare"
          id="filterRare"
          defaultValue="todas"
          value={ filterRare }
          onChange={ onInputChange }
          disabled={ filterTrunfo }
        >
          <Option value="todas" />
          <Option value="normal" />
          <Option value="raro" />
          <Option value="muito raro" />
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  filterRare: PropTypes.string.isRequired,
  filterTrunfo: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Select;
