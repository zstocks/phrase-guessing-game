/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
 class Game {
  constructor() {
   this.missed = 0;
   this.phrases = [
    new Phrase('zebras zig and zebras zag'),
    new Phrase('she sees cheese on top of louise'),
    new Phrase('four fine fresh fish for you'),
    new Phrase('she sells seashells on the seashore'),
    new Phrase('sheep should sleep in a shed'),
    new Phrase('lucky rabbits like to cause a ruckus'),
    new Phrase('kitty caught the kitten in the kitchen'),
    new Phrase('we surely shall see the sunshine soon'),
    new Phrase('six slimy snails slid slowly seaward'),
    new Phrase('bob the big bunny bobbled by the blueberry bush')
   ];
   this.activePhrase = null;

   // the ready property prevents keyboard input while the overlay is displayed
   this.ready = false; 
  }

  /**
   * Resets the game, hides the overlay, enables keyboard input, and displays a random hidden phrase
   */
  startGame() {
   this.reset();
   document.querySelector('#overlay').style.display = 'none';
   this.ready = true;
   this.activePhrase = this.getRandomPhrase();
   this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Randomly selects a phrase for the game
   * @returns (string) A random phrase from the phrases array
   */
  getRandomPhrase() {
   return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * Handles input when a user clicks a button or enters a letter with their physical keyboard
   * @param (object) e - the event object - either a 'click' or a 'keyup' event
   */
  handleInteraction(e) {
   const phrase = this.activePhrase;
   const usedKeys = phrase.usedKeys;

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

      // if chosenLetter is not in the phrase
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

    /* get the button element that corresponds to the keyboard input **
    ** if key has already been used, matchingBtn will be undefined   */
    const keys = Array.from(document.getElementsByClassName('key'));
    const matchingBtn = keys.find(key => key.textContent === chosenLetter);

    if (matchingBtn !== undefined) {
     matchingBtn.setAttribute('disabled', '');

     // if chosenLetter is in the phrase
     if (phrase.checkLetter(e)) {
      matchingBtn.className = 'chosen';
      phrase.showMatchedLetter(chosenLetter);

      if (this.checkForWin()) {
       this.gameOver();
      }

      // if chosenLetter is not in the phrase
     } else {
      matchingBtn.className = 'wrong';
      this.removeLife();
     }
    }
   }
  }

  /**
   * Increments the missed property and swaps the live heart for a lost heart
   */
  removeLife() {
   this.missed += 1;

   // create an array containing all heart images and filter to keep only the live hearts in the array
   let liveHearts = Array.from(document.querySelectorAll('#scoreboard img'));
   liveHearts = liveHearts.filter(heart => heart.src.includes('images/liveHeart.png'));

   // swap the first heart image in the array for a lost heart
   liveHearts[0].src = 'images/lostHeart.png';

   if (this.missed > 4) {
    this.gameOver();
   }
  }

  /**
   * Check to see if the player has any hidden letters left in the phrase
   * @returns (boolean) true means the player has won.
   */
  checkForWin() {
   const stillHidden = Array.from(document.getElementsByClassName('hide'));
   return stillHidden.length < 1 ? true : false;
  }

  /**
   * Displays a winning or losing overlay and message when the game has ended
   */
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

  /**
   * Removes phrase li elements, enables onscreen keyboard, and displays all live hearts
   */
  reset() {
   const letters = Array.from(document.querySelectorAll('#phrase li'));
   const usedKeys = Array.from(document.querySelectorAll('button.wrong, button.chosen'));
   const hearts = Array.from(document.querySelectorAll('#scoreboard img'));

   // clear out the previous phrase
   letters.forEach(letter => letter.remove());

   // enable any used keys in the onscreen keyboard
   usedKeys.forEach(key => {
    key.className = 'key';
    key.removeAttribute('disabled');
   });

   // reset all hearts to live hearts
   hearts.forEach(heart => heart.src = 'images/liveHeart.png');
  }
 }