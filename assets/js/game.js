
let deck = [];

const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'K', 'Q', 'J'];

const createDeck = () => {
  for( let i = 2; i <= 10; i++ ) {
    for(let type of types){
      deck.push( i + type );
    }
  }

  for(let type of types){
    for( let special of specials) {
      deck.push( special + type );
    }
  }

  deck = _.shuffle( deck );
  console.log( deck );
  return deck;
}

createDeck();

const requestCard = () => {
  if(deck.length === 0) {
    throw 'No hay mas cartas en el mazo'
  }

  const card = deck.pop();
  return card;
}

const cardValue = ( card ) => {

  const value = card.substring(0, card.length - 1);
  return (isNaN( value )) ? (value === 'A' ? 11 : 10) : (value * 1);
  
}

cardValue( requestCard() );