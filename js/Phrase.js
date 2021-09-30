/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
 constructor(phrase) {
  this.phrase = phrase.toLowerCase();
 }

 /**
  * Creates and appends to the DOM li objects for each character in the phrase
  */
 addPhraseToDisplay() {
  // convert the phrase to an array of characters containing only letters and spaces
  const characters = this.phrase
   .split('')
   .filter(character => /^[a-z ]$/.test(character));

  // create and append li element with the appropriate classes
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
  * @return (boolean) - true if the input matches one or more characters in the phrase
  */
 checkLetter(e) {
  // handle input from click events
  if (e.type === 'click') {
   const character = e.target.textContent;
   return this.phrase.includes(character) ? true : false;
  }

  // handle input from keyboard events
  if (e.type === 'keyup') {
   return this.phrase.includes(e.key) ? true : false;
  }
 }

 /**
  * Displays letters in the phrase that match the player's selection
  * @param (string) chosenLetter - the player's chosen character
  */
 showMatchedLetter(chosenLetter) {
  // Select all html elements with the letter class, and convert the htmlCollection to an array.
  const letters = Array.from(document.getElementsByClassName('letter'));

  // Map over the array of letters, if any letters in the phrase match the player's selection display those letters.
  letters.map(letter => {
   if (letter.classList.contains(chosenLetter)) {
    letter.classList.replace('hide', 'show');
   }
  });
 }
}