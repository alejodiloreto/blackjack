
let deck = [];

let types = ['C', 'D', 'H', 'S'];
let specials = ['A', 'K', 'Q', 'J'];

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
}

createDeck();