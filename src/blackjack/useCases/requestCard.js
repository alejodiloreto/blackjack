
export const requestCard = ( deck ) => {
  if (deck.length === 0) {
    throw 'there are no more cards in the deck'
  }

  return deck.pop();
}