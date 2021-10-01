/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
 constructor(phrase) {
  this.phrase = phrase.toLowerCase();
 }

 /**
  * Creates and appends li elements for each character in the phrase
  */
 addPhraseToDisplay() {

  // convert the phrase to an array of characters containing only lowercase letters and spaces
  const characters = this.phrase
   .split('')
   .filter(character => /^[a-z ]$/.test(character));

  // create and append li element with the appropriate class names
  characters.forEach(character => {
   const li = document.createElement('li');

   if (character === ' ') {
    li.className = 'space';
   } else {
    li.classList.add('hide', 'letter', character);
   }

   li.textContent = character;
   document.querySelector('#phrase ul').append(li);
  });
 }

 /**
  * Checks if the input from the user matches a character in the phrase
  * @param (object) e - the event object
  * @return (boolean) - true if the input matches at least one character in the phrase
  */
 checkLetter(e) {
  if (e.type === 'click') {
   return this.phrase.includes(e.target.textContent) ? true : false;
  }

  if (e.type === 'keyup') {
   return this.phrase.includes(e.key) ? true : false;
  }
 }

 /**
  * Displays letters in the phrase that match the player's selection
  * @param (string) chosenLetter - the player's chosen character
  */
 showMatchedLetter(chosenLetter) {

  // create an array of all html elements with the letter class
  const letters = Array.from(document.getElementsByClassName('letter'));

  // display any letters in the phrase match the player's selection
  letters.map(letter => {
   if (letter.classList.contains(chosenLetter)) {
    letter.classList.replace('hide', 'show');
   }
  });
 }
}