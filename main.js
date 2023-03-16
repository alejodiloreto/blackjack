import _ from 'underscore'
import './style.css'

let deck = [];
const types = ['C', 'D', 'H', 'S'], specials = ['A', 'K', 'Q', 'J'];
let score = [];

const newGameBtn = document.querySelector('#newGameBtn');
const stopBtn = document.querySelector('#stopBtn');
const askBtn = document.querySelector('#askBtn');
const playerCardsDiv = document.querySelector('#player-cards');
const PCCardsDiv = document.querySelector('#pc-cards');
const scoreDisplays = document.querySelectorAll('small');

const initializeGame = (playersQty = 2) => {
  deck = createDeck();
  score = [];
  for (let i = 0; i < playersQty; i++) {
    score.push(0)
  }

  scoreDisplays.forEach(elem => elem.innerText = 0);
  playerCardsDiv.innerHTML = '';
  PCCardsDiv.innerHTML = '';
  askBtn.disabled = false;
  stopBtn.disabled = false;
}

const createDeck = () => {
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }

  for (let type of types) {
    for (let special of specials) {
      deck.push(special + type);
    }
  }

  return _.shuffle(deck);
}

const requestCard = () => {
  if (deck.length === 0) {
    throw 'there are no more cards in the deck'
  }

  return deck.pop();
}

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return (isNaN(value)) ? (value === 'A' ? 11 : 10) : (value * 1);
}

const accScore = (card, turn) => {
  score[turn] = score[turn] + cardValue(card);
  scoreDisplays[turn].innerHTML = score[turn];
  return score[turn];
}

const renderCard = (card, turn) => {
  const cardImg = document.createElement('img');
  cardImg.src = `assets/cards/${card}.png`;
  cardImg.classList.add('card');
  (turn === 0) ? playerCardsDiv.append(cardImg) : PCCardsDiv.append(cardImg);
}

const calculateWinner = () => {
  const [minimumScore, PCScore] = score;
  setTimeout(() => {
    if (PCScore === minimumScore) {
      alert('Empate');
    } else if (PCScore > 21 || minimumScore === 21) {
      alert('Ganaste!');
    } else if (minimumScore > 21) {
      alert('Perdiste!');
    } else {
      alert('Perdiste!')
    }
  }, 100);
}

const PCTurn = (minimumScore) => {
  let PCScore = 0;
  do {
    const card = requestCard();
    PCScore = accScore(card, 1);
    renderCard(card, 1);
  } while ((PCScore < minimumScore) && (minimumScore < 21));
  calculateWinner();
}

askBtn.addEventListener('click', () => {
  const card = requestCard();
  const playerScore = accScore(card, 0);
  renderCard(card, 0);

  if (playerScore > 21) {
    askBtn.disabled = true;
    stopBtn.disabled = true;
    PCTurn(playerScore)
  } else if (playerScore === 21) {
    askBtn.disabled = true;
    stopBtn.disabled = true;
    PCTurn(playerScore)
  }

});

stopBtn.addEventListener('click', () => {
  askBtn.disabled = true;
  stopBtn.disabled = true;
  PCTurn(score[0]);
})

newGameBtn.addEventListener('click', () => {
  initializeGame();
})