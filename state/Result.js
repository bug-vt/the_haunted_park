/**
 * Result.js
 * Author: Bug Lee
 * Last modified: 11/4/21
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
    var first = true;
    var backButton = Object.create(ButtonObj);

    backButton.init(100, CANVAS_HEIGHT * 3/4, 200, 50, undefined);
    backButton.text("Back to main menu");

    /**
     * Identify whether player won or lose the game,
     * then, initialize accordingly.
     */
    function init(result) {
        state = result;
        if (result === WIN) {
            title = "YOU WIN!";
        }
        else {
            title = "YOU LOSE!";
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
        backButton.clickEvent(gameStates.start);
    }

    /**
     * Set up and display the result window.
     */
    function setUpResultWindow() {
        // background window 
        fill(0, 0, 0, 170);
        rect(40, 50, CANVAS_WIDTH - 80, 300);
        // win or lose image
        if (state == WIN) {
            // title window
            fill(150, 150, 150, 200);
            rect(40, 10, CANVAS_WIDTH - 80, 40);

            fill(0, 255, 255); // title color
            image(images[0], 100, 100, 200, 200); // star
        }
        else { // set up for lose
            // title window
            fill(100, 100, 100, 200);
            rect(40, 10, CANVAS_WIDTH - 80, 40);

            fill(255, 0, 0); // title color
            push();
            image(pacmanImg[1], 150, 180, 100, 100); // pacman
            // explosion
            for (let radius = 0; radius < 120; radius += 6) {
                fill(255, 0, 0, 100 - radius);
                circle(160, 200, radius * 1.3);
            }
            translate(360, 160);
            rotate(PI * 0.65);
            image(enemyImg[0], 80, 150, 100, 100); // enemy 
            pop();
        }
    }

    /**
     * Render result screen.
     */
    function render() {
        if (!first) {
            return;
        }
        first = false;

        setUpResultWindow();

        // title with win or lose indication 
        push();
        textSize(BIG_TEXT_SIZE);
        textStyle(BOLD);
        text(title, CANVAS_WIDTH / 2, 40);
        pop();

        // display score
        textSize(DEFAULT_TEXT_SIZE);
        fill(255);
        text("Score: " + floor(score) + " / " + starCount, CANVAS_WIDTH / 2, 100);

        // back button
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
