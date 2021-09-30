/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const start = document.querySelector('#btn__reset');
const keyboard = document.querySelector('#qwerty');

// initiating the game class outside of the start button event handler so handleInteraction in the keyup event won't be undefined.
const game = new Game();

start.addEventListener('click', () => {
 game.startGame();
});

keyboard.addEventListener('click', (e) => {
 game.handleInteraction(e);
});

document.addEventListener('keyup', (e) => {
 game.handleInteraction(e);
});