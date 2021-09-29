/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const keyboard = document.querySelector('#qwerty');

const myPhrase = new Phrase('Jacqalyn is amazing!');
myPhrase.addPhraseToDisplay();

keyboard.addEventListener('click', (e) => {
 myPhrase.checkLetter(e);
});

document.addEventListener('keyup', (e) => {
 myPhrase.checkLetter(e);
});