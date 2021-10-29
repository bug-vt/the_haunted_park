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
var titleImgs = [];
var ghostImgs = [];
var lightningImg;
var instructionImg;
var candleImgs = [];
var candleLightImgs = [];
var instructionImgs = [];


function preload() {
    titleImgs[0] = loadImage("images/title_background.png");
    titleImgs[1] = loadImage("images/title.png");
    titleImgs[2] = loadImage("images/title_dark.png");
    lightningImg = loadImage("images/lightning.png");
    ghostImgs[0] = loadImage("images/ghost_front1.png");
    ghostImgs[1] = loadImage("images/ghost_front2.png");
    instructionImg = loadImage("images/instruction.png");
    candleImgs[0] = loadImage("images/candle1.png");
    candleImgs[1] = loadImage("images/candle2.png");
    candleLightImgs[0] = loadImage("images/candle_light.png");
    candleLightImgs[1] = loadImage("images/candle_light2.png");
    candleLightImgs[2] = loadImage("images/candle_light3.png");
    candleLightImgs[3] = loadImage("images/candle_light4.png");
    instructionImgs[0] = loadImage("images/arrow_keys.png");
    instructionImgs[1] = loadImage("images/key.png");
    instructionImgs[2] = loadImage("images/rock.png");
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
