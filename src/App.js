import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Form from './components/Form';
import styles from './App.module.css';
import Card from './components/Card';
import logo from './assets/logo.svg';
import Select from './components/Select';
// import cardsList from './data';

class App extends React.Component {
  state = {
    hiddenPrevCard: true,
    cardId: '',
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [],
    filterNameCard: '',
    filterRare: 'todas',
    filterTrunfo: false,
  };

  validationFields = () => {
    const {
      cardName, cardDescription, cardImage, cardAttr1, cardAttr2, cardAttr3,
    } = this.state;

    const nonEmptyValues = cardName && cardDescription && cardImage;
    // Verifica os valores dos atributos
    const maxSum = 210;
    const maxNumAttr = 90;
    const numbers = [Number(cardAttr1), Number(cardAttr2), Number(cardAttr3)];
    const sumAttrValue = numbers.reduce((acc, curr) => acc + curr, 0);
    const verifyAtt1 = numbers[0] >= 0 && numbers[0] <= maxNumAttr;
    const verifyAtt2 = numbers[1] >= 0 && numbers[1] <= maxNumAttr;
    const verifyAtt3 = numbers[2] >= 0 && numbers[2] <= maxNumAttr;
    const verSum = sumAttrValue <= maxSum;
    // Verificação geral e final
    const isValid = nonEmptyValues && verSum && verifyAtt1 && verifyAtt2 && verifyAtt3;
    // altera o estado do botão
    this.setState({
      isSaveButtonDisabled: !isValid,
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
      hiddenPrevCard: false,
    }, this.validationFields);
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();

    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, savedCards,
    } = this.state;

    const newCardState = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    // Verifica se a carta é um Trunfo e se for alterar a propriedade hasTrunfo
    if (cardTrunfo) {
      this.setState({
        cardTrunfo: false,
        hasTrunfo: true,
      });
    }
    // Cria um id para a carta e adiciona ao objeto newCardState
    const generateId = `${cardName}${cardAttr1}${cardAttr2}${cardAttr3}`;
    newCardState.cardId = generateId;
    // Copiar o array do estado e substituir o seu valor pelo valor da cópia
    const copyCardList = savedCards.slice();
    copyCardList.push(newCardState);
    this.setState({
      hiddenPrevCard: true,
      cardId: '',
      savedCards: copyCardList,
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
    });
  };

  onDeleteButtonClick = (event) => {
    event.preventDefault();
    const { savedCards } = this.state;
    // Pega o id da carta através do botão
    const elementId = event.target.id;
    // Faz uma cópia da lista de cartas salvas
    const copyArrayCards = savedCards.slice();
    // Procura o index da carta
    let index = 0;
    copyArrayCards.forEach((card, i) => {
      if (card.cardId === elementId) {
        index = i;
      }
    });
    // Verifica se é trunfo
    if (copyArrayCards[index].cardTrunfo === true) {
      this.setState({
        hasTrunfo: false,
      });
    }
    // Deleta o elemento por meio do index
    copyArrayCards.splice(index, 1);
    // Atualiza a lista de cartas salvas
    this.setState({
      savedCards: copyArrayCards,
    });
  };

  render() {
    const {
      hiddenPrevCard, cardId, cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, isSaveButtonDisabled, hasTrunfo, savedCards,
      filterNameCard, filterRare, filterTrunfo,
    } = this.state;
    const boolPosNeg = [true, false];

    return (
      <div className={ styles.wrapper }>
        <aside className={ styles.sideBar }>
          <Form
            onInputChange={ this.onInputChange }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onSaveButtonClick={ this.onSaveButtonClick }
            hasTrunfo={ hasTrunfo }
          />
          <Card
            hiddenPrevCard={ hiddenPrevCard }
            cardId={ cardId }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            cardPreview={ boolPosNeg[0] }
            onDeleteButtonClick={ this.onDeleteButtonClick }
          />
        </aside>
        <main>
          <header>
            <img className={ styles.logo } src={ logo } alt="logo" />
            <div className={ styles.containerSearchName }>
              <MagnifyingGlass size={ 20 } />
              <strong>Nome</strong>
              <input
                className={ styles.filterNameCard }
                type="text"
                data-testid="name-filter"
                name="filterNameCard"
                id="filterNameCard"
                onChange={ this.onInputChange }
                disabled={ filterTrunfo }
              />
            </div>
            <Select
              filterRare={ filterRare }
              filterTrunfo={ filterTrunfo }
              onInputChange={ this.onInputChange }
            />
            <div className={ styles.containerFilterTrunfo }>
              <strong>Trunfo?</strong>
              <input
                className={ styles.filterTrunfo }
                type="checkbox"
                data-testid="trunfo-filter"
                name="filterTrunfo"
                id="filterTrunfo"
                checked={ filterTrunfo }
                onChange={ this.onInputChange }
              />
            </div>
          </header>
          <div className={ styles.cardsContainerMain }>
            { savedCards
              .filter((element) => {
                if (filterNameCard !== '') {
                  return element.cardName.toLowerCase()
                    .includes(filterNameCard.toLowerCase());
                }
                return true;
              }).filter((elem) => {
                if (filterRare !== 'todas') {
                  return elem.cardRare === filterRare;
                }
                return true;
              }).filter((e) => (filterTrunfo ? e.cardTrunfo === true : true))
              .map((card) => {
                if (savedCards.length === 0) {
                  return '';
                }
                return (<Card
                  key={ card.cardId }
                  cardId={ card.cardId }
                  cardName={ card.cardName }
                  cardDescription={ card.cardDescription }
                  cardAttr1={ card.cardAttr1 }
                  cardAttr2={ card.cardAttr2 }
                  cardAttr3={ card.cardAttr3 }
                  cardImage={ card.cardImage }
                  cardRare={ card.cardRare }
                  cardTrunfo={ card.cardTrunfo }
                  cardPreview={ boolPosNeg[1] }
                  onDeleteButtonClick={ this.onDeleteButtonClick }
                />);
              }) }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
