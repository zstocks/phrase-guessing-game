# phrase-guessing-game
 A game where users guess a phrase. Object oriented JavaScript.

 1: Style Changes - documentation of how styles have changed from the original project files

  Note: all style changes were made using CSS in the css/styles.css file

  1.1 Overlay

   #overlay:
    -> removed border-radius property

   .start:
    -> changed background-color to #000

   .btn__reset:
    -> set new border property to value: 1px solid #000
    -> removed border-bottom property
    -> removed border-right property

  1.2 Phrase

   .letter:
    -> changed background to #000

   .show:
    -> changed background-color to #78cf82
    -> set new property border to value: 1px solid #000
    -> set new property font-weight to value: bold

  1.3 Onscreen Keyboard

   Added new selector .keyrow button:
    -> set new property border to value: 1px solid #000

   Added new selector .key:
    -> set new property background-color to value: #fff

   .chosen:
    -> changed background to #78cf82

   .wrong:
    -> changed background to #f5785f




2: Ready Property of Game class

 Note: I chose to set a new property in the Game class
  to track whether the game was ready for input or not.
  This feature eliminates players ability to enter
  keyboard guesses in between games.

 2.1 Ready state throughout game cycle:
  1. The initial value for ready is false (game.js:22)
  2. When the game starts, ready is set to true (Game.js:31)
  3. Keyboard input is allowed ONLY IF ready = true (app.js:30)
  4. When the game ends, ready is set to false (Game.js:116)