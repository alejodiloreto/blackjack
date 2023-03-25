import _ from 'underscore'

export const createDeck = (cardTypes, specialTypes) => {
  let deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let type of cardTypes) {
      deck.push(i + type);
    }
  }

  for (let type of cardTypes) {
    for (let special of specialTypes) {
      deck.push(special + type);
    }
  }

  return _.shuffle(deck);
}