import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Trash } from '@phosphor-icons/react';
import styles from './Card.module.css';
import SpanAttr from './SpanAttr';

class Card extends Component {
  render() {
    const {
      hiddenPrevCard,
      cardId,
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      cardPreview,
      onDeleteButtonClick,
    } = this.props;

    const btnDelete = (
      <div className={ styles.btnDeleteContainer }>
        <button
          id={ cardId }
          data-testid="delete-button"
          onClick={ onDeleteButtonClick }
        >
          <Trash size={ 20 } />
          Excluir
        </button>
      </div>
    );

    return (
      <div className={ styles.containerCompleteCard }>
        <section
          className={ `
          ${cardTrunfo ? styles.cardTrunfo : styles.normalCard}
          ${hiddenPrevCard ? styles.hiddenPrevCard : ''}
        ` }
        >
          <div className={ styles.cardContent }>
            { cardTrunfo ? <span data-testid="trunfo-card">Super Trunfo</span> : '' }
            <div className={ styles.name }>
              <strong data-testid="name-card">{ cardName }</strong>
              <span data-testid="rare-card" className={ styles.rare }>{ cardRare }</span>
            </div>
            <img data-testid="image-card" src={ cardImage } alt={ cardName } />
            <p data-testid="description-card" className={ styles.desc }>
              { cardDescription }
            </p>
            <footer className={ styles.attrContainer }>
              <SpanAttr
                attrName="Ataque"
                dataTestid="attr1-card"
                cardAttr={ cardAttr1 }
              />
              <SpanAttr
                attrName="Defesa"
                dataTestid="attr2-card"
                cardAttr={ cardAttr2 }
              />
              <SpanAttr
                attrName="Inteligência"
                dataTestid="attr3-card"
                cardAttr={ cardAttr3 }
              />
            </footer>
          </div>
        </section>
        { cardPreview ? '' : btnDelete }
      </div>
    );
  }
}

Card.propTypes = {
  hiddenPrevCard: PropTypes.bool.isRequired,
  cardId: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  cardPreview: PropTypes.bool.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

export default Card;
