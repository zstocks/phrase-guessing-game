/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
  constructor() {
   this.missed = 0;
   this.phrases = [
    'Frogs are amphibians',
    'Deer are mammals',
    'Snakes are reptiles',
    'Kangaroos are marsupials',
    'Zoology is fun'
   ];
   this.activePhrase = null;

   // the ready property prevents keyboard input while overlay is displayed
   this.ready = false; 
  }

  /**
   * Resets the game, hides the overlay, enables keyboard input, and displays a random hidden phrase
   */
  startGame() {
   this.reset();
   document.querySelector('#overlay').style.display = 'none';
   this.ready = true;
   this.activePhrase = new Phrase(this.getRandomPhrase());
   this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Randomly selects a phrase for the game
   * @returns (string) A random phrase from the phrases array
   */
  getRandomPhrase() {
   return this.phrases[Math.floor(Math.random() * 5)];
  }

  handleInteraction(e) {
   const phrase = this.activePhrase;
   const usedKeys = phrase.usedKeys;

   // if interaction is a click anywhere on the keyboard element
   if (e.type === 'click') {
    const chosenLetter = e.target;

    // Continue the method ONLY IF the click occured on a button
    if (chosenLetter.tagName === 'BUTTON') {
     chosenLetter.setAttribute('disabled', '');

     // if chosenLetter is in the phrase
     if (phrase.checkLetter(e)) {
      chosenLetter.className = 'chosen';
      phrase.showMatchedLetter(chosenLetter.textContent);

      if (this.checkForWin()) {
       this.gameOver();
      }

     } else {
      chosenLetter.className = 'wrong';
      this.removeLife();
     }
    }
   }
   
   // if interaction is keyboard input 
   // AND selection is a lowercase letter
   // AND the game's ready state is true
   if (e.type === 'keyup' 
       && /^[a-z]$/.test(e.key) 
       && this.ready === true) {
    const chosenLetter = e.key;

    // get the matching button element that corresponds to the keyboard input 
    // - if key has already been used, matchingBtn will contain undefined
    const keys = Array.from(document.getElementsByClassName('key'));
    const matchingBtn = keys.find(key => key.textContent === chosenLetter);

    // if the matching button has not previously been selected by the player
    if (matchingBtn !== undefined) {
     matchingBtn.setAttribute('disabled', '');

     // if chosenLetter is in the phrase
     if (phrase.checkLetter(e)) {
      matchingBtn.className = 'chosen';
      phrase.showMatchedLetter(chosenLetter);

      if (this.checkForWin()) {
       this.gameOver();
      }

     } else {
      matchingBtn.className = 'wrong';
      this.removeLife();
     }
    }
   }
  }

  removeLife() {
   this.missed += 1;

   let liveHearts = Array.from(document.querySelectorAll('#scoreboard img'));
   liveHearts = liveHearts.filter(heart => heart.src.includes('images/liveHeart.png')); 
   liveHearts[0].src = 'images/lostHeart.png';

   if (this.missed > 4) {
    this.gameOver();
   }
  }

  checkForWin() {
   const stillHidden = Array.from(document.getElementsByClassName('hide'));
   return stillHidden.length < 1 ? true : false;
  }

  gameOver() {
   const overlay = document.querySelector('#overlay');
   const message = document.querySelector('#game-over-message');

   // clear out previous message and display the overlay
   message.textContent = '';
   overlay.style.display = 'flex';

   // determine which overlay style and message to display
   if (this.missed > 4) {
    overlay.className = 'lose';
    message.insertAdjacentHTML('beforeend', `You Lost &#128531; Better Luck Next Time!`);
   } else {
    overlay.className = 'win';
    message.insertAdjacentHTML('beforeend', `You Won &#128518; You're Amazing!`);
   }

   this.ready = false;
  }

  reset() {
   const letters = Array.from(document.querySelectorAll('#phrase li'));
   const usedKeys = Array.from(document.querySelectorAll('button.wrong, button.chosen'));
   const hearts = Array.from(document.querySelectorAll('#scoreboard img'));

   // clear out the previous phrase
   letters.forEach(letter => letter.remove());

   // enable used keys on the onscreen keyboard
   usedKeys.forEach(key => {
    key.className = 'key';
    key.removeAttribute('disabled');
   });

   // reset all hearts to live hearts
   hearts.forEach(heart => heart.src = 'images/liveHeart.png');
  }
 }