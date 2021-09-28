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

  checkLetter() {

  }

  showMatchedLetter() {

  }
 }