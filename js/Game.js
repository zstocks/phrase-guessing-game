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
   const chosenLetter = e.target;
   if (chosenLetter.tagName === 'BUTTON') {
    chosenLetter.setAttribute('disabled', ''); // need to also disable keyboard inputs
    if (this.activePhrase.checkLetter(e)) {
     chosenLetter.classList.add('chosen');
     this.activePhrase.showMatchedLetter(chosenLetter.textContent);
     if (this.checkForWin()) {
      this.gameOver();
     }
    } else {
     chosenLetter.classList.add('wrong');
     this.removeLife();
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
   document.querySelector('#overlay').style.display = 'flex';
   const message = document.querySelector('#game-over-message');
   if (this.missed > 4) {
    message.insertAdjacentHTML('beforeend', `You Lost &#128531; Better Luck Next Time!`);
   } else {
    message.insertAdjacentHTML('beforeend', `You Won &#128518; You're Amazing!`);
   }
   
  }
 }