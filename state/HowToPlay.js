/**
 * HowToPlay.js
 * Author: Bug Lee
 * Last modified: 12/3/21
 *
 * This module contains HowToPlay data structure.
 * How to play screen include:
 * 1. Instruction title
 * 2. Game instructions.
 * 3. Back to main menu button.
 */

"use strict";


function HowToPlay() {
    var backButton = Object.create(ButtonObj);
    var candle = Object.create(AnimationObj);
    var candleLight = Object.create(AnimationObj);
    var ghost = Object.create(AnimationObj);

    var instruction =
        "1. Use arrow keys to move and rotate your point of view.\n\n" +
        "2. Avoid ghosts!\n\n" +
        "3. Collect keys, then find the exit door.\n\n" +  
        "4. If ghost haven't seen you yet, throw a rock (space bar) to distract the ghosts.\n"; 

    backButton.init(170, 320, 200, 50, BUTTON);
    backButton.text("< Back to main menu");

    candle.init(260, 120);
    candleLight.init(0, 0);

    ghost.init(50, 150);

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
        backButton.clickEvent(gameStates.start);
    }

    /**
     * Apply candle lighting set up to the instruction screen.
     */
    function applyCandleLighting() {
        if (frameCount % 8 == 0) {
            candle.frame = (candle.frame + 1) % 2;
            candleLight.frame = (candleLight.frame + 1) % 4;
        }
        image(candleImgs[candle.frame], candle.x, candle.y);
        image(candleLightImgs[candleLight.frame], candleLight.x, candleLight.y);
    }
    
    /**
     * Display game objects near the corresponding instruction.
     */
    function showGameObjs() {
        if (frameCount % 6 == 0) {
            ghost.frame = (ghost.frame + 1) % 2;
        }
        image(ghostImgs[ghost.frame], ghost.x, ghost.y, 50, 45);
        image(instructionImgs[0], 50, 95);
        image(instructionImgs[1], 50, 210);
        image(instructionImgs[2], 30, 230);
    }

    /**
     * Render How to play screen.
     */
    function render() {
        image(instructionImg, 0, 0); // background image

        showGameObjs();

        push();
        // instructions
        fill(0);
        textAlign(LEFT, TOP);
        textSize(DEFAULT_TEXT_SIZE);
        textWrap(WORD);
        text(instruction, 120, 90, 390);
        pop();

        backButton.render();

        applyCandleLighting();

    }

    var publicAPI = {
        handleInput: handleInput,
        update: update,
        render: render
    }

    return publicAPI;
}
