/**
 * HowToPlay.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains HowToPlay data structure.
 * How to play screen include:
 * 1. How to play title
 * 2. Game instructions.
 * 3. Back to main menu button.
 */

"use strict";


function HowToPlay() {
    var backButton = Object.create(ButtonObj);
    var title = "HOW TO PLAY";
    var instruction =
        "Greeting soldier! Here is your mission.\n\n" +
        "1. Use arrow keys to move and rotate your tank.\n" +
        "2. Avoid missiles!\n" +
        "3. Fire missile using space bar and destroy all enemy tanks.\n"; 

    backButton.init(170, CANVAS_HEIGHT * 3/4, 200, 50, BUTTON);
    backButton.text("Back to main menu");

    /**
     * handle mouse click from user.
     */
    function handleInput() {
        canvas.mouseClicked(ButtonObj.clicked);
    }
    
    /**
     * Go back to start screen when user click on the button.
     */
    function update() {
        backButton.clickEvent(gameStates.start());
    }

    /**
     * Render How to play screen.
     */
    function render() {
        // background 
        fill(60);
        rect(0, 0, CANVAS_WIDTH, 50);
        let gradation = 0;
        for (let y = 50; y < CANVAS_HEIGHT; y += 4) {
            fill(100 + gradation, 100 + gradation,  100 + gradation);
            gradation++;
            rect(0, y, CANVAS_WIDTH, 5); 
        }

        // Title
        push();
        fill(200); 
        textSize(BIG_TEXT_SIZE);
        textStyle(BOLD);
        text(title, CANVAS_WIDTH / 2, 40);
        pop();

        push();
        // instructions
        fill(255);
        textAlign(LEFT, TOP);
        textSize(DEFAULT_TEXT_SIZE);
        textWrap(WORD);
        text(instruction, 50, 70, 300);
        pop();

        backButton.render();
    }

    var publicAPI = {
        handleInput: handleInput,
        update: update,
        render: render
    }

    return publicAPI;
}
