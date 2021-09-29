/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const start = document.querySelector('#btn__reset');
const keyboard = document.querySelector('#qwerty');
const game = new Game();

start.addEventListener('click', () => {
 game.startGame();
});

keyboard.addEventListener('click', (e) => {
 game.handleInteraction(e);
});

document.addEventListener('keyup', (e) => {
 
});