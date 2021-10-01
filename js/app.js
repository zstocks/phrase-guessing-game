/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const start = document.querySelector('#btn__reset');
const keyboard = document.querySelector('#qwerty');

// declare game variable with global scope
let game;

// when the start button is clicked, instantiate a new game object and start the game 
start.addEventListener('click', () => {
 game = new Game();
 game.startGame();
});

// handle interactions with the onscreen keyboard 
keyboard.addEventListener('click', (e) => {
 if (e.target.tagName === 'BUTTON') {
  game.handleInteraction(e, e.target);
 }
});

// handle keyboard inputs
document.addEventListener('keyup', (e) => {
 // prevent handler from firing if the game has not started
 if (game !== undefined) {
  const playerSelection = e.key;

  // if input is a lowercase letter and game state is true
  if (/^[a-z]$/.test(playerSelection) && game.ready === true) {

   /* select the HTML button element that corresponds to the player's selection **
   ** if key has already been used, onscreenBtn will be undefined */
   const keys = Array.from(document.getElementsByClassName('key'));
   const onscreenBtn = keys.find(key => key.textContent === playerSelection);

   if (onscreenBtn !== undefined) {
    game.handleInteraction(e, onscreenBtn);
   }
  }
 }
});