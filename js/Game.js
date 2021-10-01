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
   * @returns (string) A random phrase object from the phrases array
   */
  getRandomPhrase() {
   return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * Disables selected onscreen button, reveals correct guesses, and checks for win
   * @param (object) e - the event object
   * @param (HTMLElement) button - the onscreen button that was selected
   */
  handleInteraction(e, button) {
   // disable the button corresponding to the click or keyup
   button.setAttribute('disabled', '');

   // if player's selection is in the phrase
   if (this.activePhrase.checkLetter(e)) {
    button.className = 'chosen';
    this.activePhrase.showMatchedLetter(button.textContent);

    if (this.checkForWin()) {
     this.gameOver();
    }

    // if player's selection is not in the phrase
   } else {
    button.className = 'wrong';
    this.removeLife();
   }
  }

  /**
   * Increments the missed property and swaps the live heart for a lost heart
   */
  removeLife() {
   this.missed += 1;

   // create and filter an array containing all live heart image elements
   let liveHearts = Array.from(document.querySelectorAll('#scoreboard img'));
   liveHearts = liveHearts.filter(heart => heart.src.includes('images/liveHeart.png'));

   // swap the first heart image in the array for a lost heart
   liveHearts[0].src = 'images/lostHeart.png';

   if (this.missed > 4) {
    this.gameOver();
   }
  }

  /**
   * Check to see if the player has uncovered all letters in the phrase
   * @returns (boolean) true = all letters uncovered
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
    message.insertAdjacentHTML('beforeend', `You Ran Out of Lives<br>Better Luck Next Time!<br>&#128531;`);
   } else {
    overlay.className = 'win';
    message.insertAdjacentHTML('beforeend', `You Guessed the Phrase:<br>${this.activePhrase.phrase}!<br>&#128518;`);
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