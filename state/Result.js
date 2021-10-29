/**
 * Result.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains Result data structure.
 * Result screen contains the following:
 * 1. Indication of Win or lose
 * 2. score
 * 3. Corresponding image for win or lose
 * 4. back to main menu button
 */


"use strict";


function Result() {
    var title;
    var img;
    var state;
    var backButton = Object.create(ButtonObj);

    backButton.init(170, CANVAS_HEIGHT * 3/4, 200, 50, undefined);
    backButton.text("Back to main menu");

    /**
     * Identify whether player won or lose the game,
     * then, initialize accordingly.
     */
    function init(result) {
        state = result;
        if (result === WIN) {
            title = "CHAMPION!";
        }
        else {
            title = "DESTROYED!";
        }
    }

    /**
     * Handle mouse click from the user.
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
     * Render result screen.
     */
    function render() {
        // win or lose image
        if (state == WIN) {
            fill(60);
            rect(0, 0, CANVAS_WIDTH, 50);
            let gradation = 0;
            for (let y = 50; y < CANVAS_HEIGHT; y += 4) {
                fill(100 + gradation, 100 + gradation,  100 + gradation);
                gradation++;
                rect(0, y, CANVAS_WIDTH, 5); 
            }

            fill(0, 255, 255); // title color
            // background
            image(images[2], 100, 100, 200, 200);
        }
        else { // set up for lose
            fill(20);
            rect(0, 0, CANVAS_WIDTH, 50);
            let gradation = 0;
            for (let y = 50; y < CANVAS_HEIGHT; y += 4) {
                fill(40 + gradation, 40 + gradation,  40 + gradation);
                gradation++;
                rect(0, y, CANVAS_WIDTH, 5); 
            }

            fill(255, 0, 0); // title color
            push();
            image(images[1], 150, 180, 100, 100); // blue tank
            // explosion
            for (let radius = 0; radius < 120; radius += 6) {
                fill(255, 0, 0, 100 - radius);
                circle(180, 220, radius * 1.3);
            }
            translate(360, 160);
            rotate(PI * 0.65);
            image(images[0], 80, 200, 100, 100); // red tank
            pop();
        }

        // win or lose indication 
        push();
        textSize(BIG_TEXT_SIZE);
        textStyle(BOLD);
        text(title, CANVAS_WIDTH / 2, 40);
        pop();

        // display score
        textSize(DEFAULT_TEXT_SIZE);
        fill(255);
        text("Score: " + floor(score) + " / " + NUM_OF_NPC, CANVAS_WIDTH / 2, 100);
        // back button
        fill(66, 66, 106);
        backButton.render();
    }

    var publicAPI = {
        init: init,
        handleInput: handleInput,
        update: update,
        render: render
    }

    return publicAPI;
}
