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
  }

  /**
   * Starts a new game by hiding the start-overlay and displaying a random hidden phrase
   */
  startGame() {
   document.querySelector('#overlay').style.display = 'none';
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
      chosenLetter.classList.add('chosen');
      phrase.showMatchedLetter(chosenLetter.textContent);

      if (this.checkForWin()) {
       this.gameOver();
      }

     } else {
      chosenLetter.classList.add('wrong');
      this.removeLife();
     }
    }
   }
   
   // if interaction is keyboard input AND a lowercase letter - ignore all other keys
   if (e.type === 'keyup' && /^[a-z]$/.test(e.key)) {
    const chosenLetter = e.key;

    // get the matching button element that corresponds to the keyboard input
    const keys = Array.from(document.getElementsByClassName('key'));
    const matchingBtn = keys.find(key => key.textContent === chosenLetter);

    // ensure the keyboard input has not already been used
    if (!usedKeys.includes(chosenLetter)) {
     usedKeys.push(chosenLetter);

     // if chosenLetter is in the phrase
     if (phrase.checkLetter(e)) {
      matchingBtn.classList.add('chosen');
      phrase.showMatchedLetter(chosenLetter);

      if (this.checkForWin()) {
       this.gameOver();
      }

     } else {
      matchingBtn.classList.add('wrong');
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

   overlay.style.display = 'flex';

   if (this.missed > 4) {
    overlay.classList.replace('start', 'lose');
    message.insertAdjacentHTML('beforeend', `You Lost &#128531; Better Luck Next Time!`);
   } else {
    overlay.classList.replace('start', 'win');
    message.insertAdjacentHTML('beforeend', `You Won &#128518; You're Amazing!`);
   }
  }
 }