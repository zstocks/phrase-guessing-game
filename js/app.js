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
 game.handleInteraction(e);
});

// handle keyboard inputs
document.addEventListener('keyup', (e) => {
 if (game !== undefined) {
  game.handleInteraction(e);
 }
});