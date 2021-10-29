/**
 * StartScreen.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains StartScreen data structure.
 * Start screen include:
 * 1. Title of the game
 * 2. Title Image
 * 3. start button
 * 4. how to play button
 */


"use strict";



function StartScreen() {
    var startButton = Object.create(ButtonObj);
    var howToPlayButton = Object.create(ButtonObj);
    var credit = "Created by Bug Lee";

    startButton.init(250, 240, 100, 50, BUTTON);
    startButton.text("");

    howToPlayButton.init(210, 300, 140, 50, BUTTON);
    howToPlayButton.text("");

    /**
     * Handle mouse click from the user.
     */
    function handleInput() {
        canvas.mouseClicked(ButtonObj.clicked);
    }
    /**
     * Start the game of show how to play instruction
     * according to the button that user clicked.
     */
    function update() {
        //startButton.clickEvent(gameStates.gameWorld());
        howToPlayButton.clickEvent(gameStates.howToPlay());
    }

    /**
     * Render start screen.
     */
    function render() {
        image(images[0], 0, 0);
        image(images[0], 0, 0);
        // buttons
        startButton.render();
        howToPlayButton.render();


        // credit
        push();
        textSize(DEFAULT_TEXT_SIZE);
        fill(255);
        text(credit, CANVAS_WIDTH / 2, 380);
        pop();
    }

    var publicAPI = {
        handleInput: handleInput,
        update: update,
        render: render
    }

    return publicAPI;
}


