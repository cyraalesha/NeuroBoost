const cards = document.querySelectorAll('.game-card');
cards.forEach((card) => card.addEventListener('click', flipCard));
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let difficulty = 4;
let flippedCards = 0;
const url = 'https://us-central1-neuroboost-4d912.cloudfunctions.net/app/game/';
console.log('HEREEE');
updateCards = ({cards: source}) => {
  let len = source.length;
  console.log('Souire', source);
  let cards = '';
  for (let i = 0; i < len; i++) {
    cards += `<div class="game-card" data-name = ${source[i].name} >
        <img class="back-face" src="https://image.freepik.com/free-icon/turn-around_318-10327.jpg" alt="React">
        <img class="front-face" src=${source[i].image} alt="Memory Card">
        ${source[i].name}
        </div>`;
  }
  flippedCards = 0;
  console.log('HERE att' + cards);
  let x = document.getElementById('.game-container');
  console.log(x);
  document.getElementById('game-container').innerHTML = cards;
  let cardsx = document.querySelectorAll('.game-card');
  cardsx.forEach((card) => card.addEventListener('click', flipCard));
};

async function getCards() {
  console.log('HEREEE');
  await fetch(url + difficulty.toString())
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateCards(data);
    });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  flippedCards += 1;
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    flippedCards -= 2;
    resetBoard();
  }, 1000);
}

function winner_check() {
  if (flippedCards === difficulty * 2) {
    alert(`YOU HAVE WON THIS ROUND IN CONGRATS!`);
  }
}

function resetBoard() {
  winner_check();
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
