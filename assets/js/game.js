
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'K', 'Q', 'J'];
let deck = [];
let playerScore = 0;
let PCScore = 0;

const newGameBtn = document.querySelector('#newGameBtn');
const stopBtn = document.querySelector('#stopBtn');
const askBtn = document.querySelector('#askBtn');
const playerCardsDiv = document.querySelector('#player-cards');
const PCCardsDiv = document.querySelector('#pc-cards');
const HTMLScores = document.querySelectorAll('small');

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

  const PCTurn = ( minimumScore ) => {
    do {
      const card = requestCard();
      PCScore = PCScore + cardValue(card);
      HTMLScores[1].innerHTML = PCScore;
    
      const cardImg = document.createElement('img');
      cardImg.src = `assets/cards/${ card }.png`;
      cardImg.classList.add('card');
      PCCardsDiv.append( cardImg );

      if(minimumScore > 21){
        break;
      }

    } while ( (PCScore < minimumScore) && (minimumScore < 21)  );
    
    setTimeout(() => {
      if(PCScore === minimumScore){
        alert('Tie');
      } else if(PCScore > 21 || minimumScore === 21){
        alert('You win!');
      } else if(minimumScore > 21){
        alert('Game over!');
      } else {
        alert('Game over!')
      }
    }, 10);

  }

askBtn.addEventListener('click', () => {
  const card = requestCard();
  playerScore = playerScore + cardValue(card);
  HTMLScores[0].innerHTML = playerScore;
  
  const cardImg = document.createElement('img');
  cardImg.src = `assets/cards/${ card }.png`;
  cardImg.classList.add('card');
  playerCardsDiv.append( cardImg );

  if(playerScore > 21){
    askBtn.disabled = true;
    stopBtn.disabled = true;
    PCTurn(playerScore)
  } else if(playerScore === 21) {
    askBtn.disabled = true;
    stopBtn.disabled = true;
    PCTurn(playerScore)
  }

});

newGameBtn.addEventListener('click', () => {
  deck = [];
  deck = createDeck();
  playerScore = 0;
  PCScore = 0;
  HTMLScores[0].innerText = PCScore;
  HTMLScores[1].innerText = PCScore;
  askBtn.disabled = false;
  stopBtn.disabled = false;
  playerCardsDiv.innerHTML = '';
  PCCardsDiv.innerHTML = '';
})

stopBtn.addEventListener('click', () => {
  askBtn.disabled = true;
  stopBtn.disabled = true;
  PCTurn( playerScore );
})