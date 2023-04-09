import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FilePlus } from '@phosphor-icons/react';
import Input from './Input';
import styles from './Form.module.css';
import Checkbox from './Checkbox';

class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    const msgHasTrunfo = (
      <span className={ styles.msgHasTrunfo }>
        Você já tem um Super Trunfo em seu baralho
      </span>
    );

    return (
      <form className={ styles.formContent }>
        <Input
          dataTestId="image-input"
          typeInput="text"
          textLabel="Imagem"
          name="cardImage"
          value={ cardImage }
          onInputChange={ onInputChange }
        />

        <Input
          dataTestId="name-input"
          typeInput="text"
          textLabel="Nome"
          name="cardName"
          value={ cardName }
          maxLength="14"
          onInputChange={ onInputChange }
        />

        <label htmlFor="cardDescription">
          Descrição
          <textarea
            data-testid="description-input"
            name="cardDescription"
            id="cardDescription"
            value={ cardDescription }
            onChange={ onInputChange }
            maxLength={ 112 }
          />
        </label>

        <Input
          dataTestId="attr1-input"
          typeInput="number"
          textLabel="Ataque"
          name="cardAttr1"
          value={ cardAttr1 }
          onInputChange={ onInputChange }
        />

        <Input
          dataTestId="attr2-input"
          typeInput="number"
          textLabel="Defesa"
          name="cardAttr2"
          value={ cardAttr2 }
          onInputChange={ onInputChange }
        />

        <Input
          dataTestId="attr3-input"
          typeInput="number"
          textLabel="Inteligência"
          name="cardAttr3"
          value={ cardAttr3 }
          onInputChange={ onInputChange }
        />

        <label htmlFor="cardRare">
          Raridade
          <select
            data-testid="rare-input"
            name="cardRare"
            id="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
            defaultValue="normal"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>

        {
          hasTrunfo ? msgHasTrunfo : <Checkbox
            cardTrunfo={ cardTrunfo }
            onInputChange={ onInputChange }
          />
        }

        <button
          className={ styles.btnSave }
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          <FilePlus size={ 22 } />
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
