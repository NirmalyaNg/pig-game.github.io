//DOM elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//Initial conditions
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let scores = [0,0];
let playing  = true;

//Event Listeners
btnRoll.addEventListener('click',function(){
  if(playing){
    //Generate random number for dice
    const diceNumber = Math.floor(Math.random()*6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1){
      currentScore+= diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    }else{
      togglePlayer();
    }
  }
})

btnHold.addEventListener('click',function(){
  if(playing){
  //Update scores array
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
  checkWin(activePlayer);
  }
})


btnNew.addEventListener('click',function(){
  scores[0] = 0;
  scores[1] = 0;

  score0.textContent = 0;
  score1.textContent = 0;

  currentScore = 0;
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  activePlayer = 0;
  document.querySelector('.player--0').classList.add('player--active');
  dice.classList.add('hidden');
  playing  = true;
})

//Win function
const checkWin = (activePlayer)=>{
  if(scores[activePlayer] >= 100){
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    playing = false;
  }else{
    togglePlayer();
  }
}

//Toggle Player function
const togglePlayer = ()=>{
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  //Remove active class from current player
  document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Add active class to other player
  document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
  currentScore = 0;
}