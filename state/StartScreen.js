/**
 * StartScreen.js
 * Author: Bug Lee
 * Last modified: 10/29/21
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
    var lightning = Object.create(Lightning);
    var ghost = Object.create(AnimationObj);
    var credit = "Created by Bug Lee";

    startButton.init(170, 210, 130, 40, BUTTON);
    startButton.text("");

    howToPlayButton.init(210, 140, 140, 50, BUTTON);
    howToPlayButton.text("");

    lightning.init(random(0, 300), 0); 
    ghost.init(300, 150);

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
        startButton.clickEvent(gameStates.gameWorld);
        howToPlayButton.clickEvent(gameStates.howToPlay);
        lightning.update();
    }

    /**
     * Show image of the ghost when lightning struck.
     */
    function showGhosts() {
        if (frameCount % 6 == 0) {
            ghost.frame = (ghost.frame + 1) % 2;
        }
        push();
        tint(150, 150, 255, lightning.alpha - 50);
        image(ghostImgs[ghost.frame], ghost.x, ghost.y, 220, 200);
        pop();
    }

    /**
     * Reveal title and title image of the game when lightning struck.
     */
    function revealTitle() {
        if (performance.now() - lightning.timeCheck > ONE_SEC * 3) {
            lightning.timeCheck = performance.now();
            lightning.flashTime = performance.now();
            lightning.alpha = 150;
            lightning.flashAlpha = 255;
            lightning.x = random(0, 300);
        }
        push();
        tint(255, lightning.alpha + 20);
        image(titleImgs[1], 0, 0);
        pop();
    }

    /**
     * Render start screen.
     */
    function render() {

        image(titleImgs[0], 0, 0); // darken title and title image
        lightning.render();
        image(titleImgs[2], 0, 0); // background tree image
        revealTitle();
        showGhosts();

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


