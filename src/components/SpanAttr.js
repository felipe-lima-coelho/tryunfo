import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SpanAttr extends Component {
  render() {
    const { attrName, dataTestid, cardAttr } = this.props;
    return (
      <div>
        <span>{ attrName }</span>
        <span data-testid={ dataTestid }>{ cardAttr }</span>
      </div>
    );
  }
}

SpanAttr.propTypes = {
  attrName: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  cardAttr: PropTypes.string.isRequired,
};

export default SpanAttr;
