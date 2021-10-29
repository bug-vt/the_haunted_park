/**
 * Main.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This program simulate the tank battle inside the 400x400 canvas.
 * User can control playable character using arrow keys and
 * the objective is to destroy all enemy tanks. 
 * Player can achieve that by firing missiles to enemies and 
 * avoiding missiles from enemies.
 *
 * Game is compose with 4 game state:
 * 1. start state (StartScreen)
 * 2. how to play state (HowToPlay)
 * 3. game (or game world) state (GameWorld)
 * 4. result state (Result)
 */


"use strict";

var gameStates = {
    start: StartScreen,
    howToPlay: HowToPlay,
//    gameWorld: GameWorld,
//    result: Result
};
var canvas;
var currentState;
var score;
var images = [];


function preload() {
    images[0] = loadImage("./images/title_background.png");
    images[1] = loadImage("./images/title.png");
}


/**
 * Game intialization.
 */
function setup() {
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
//    customImg();
    noStroke();
    textAlign(CENTER,CENTER);
    frameRate(FRAME_RATE);
    currentState = gameStates.start();
    
}

/**
 * Game loop
 */
function draw() {
    currentState.handleInput();
    currentState.update();
    currentState.render();
}
