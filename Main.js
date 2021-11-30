/**
 * Main.js
 * Author: Bug Lee
 * Last modified: 11/12/21
 *
 * The objective of the game is to escaping the park by finding the escape route
 * and the key to unlock the escape route that are randomly placed somewhere in the
 * game world. However, there are ghosts scatter around the map and player must avoid
 * them. When a ghost see the player, ghost will chase him/her. The player can distract 
 * a ghost by throwing a rock (not yet implemented), but ghosts cannot be eliminated. The player lose
 * when a ghost catch him/her. The player win when he/she successfully escape and
 * score will be based on the time it took to escape (for now, winning condtion
 * is obtaining certain amount of key. Will be changed in the future).
 * The user can move player forward, backward, or rotate player using arrow keys.
 * Pressing a space bar will throw rock. The player and ghosts cannot go through a
 * wall. The structure of the map will be initialized by the tile map and the game
 * will utilize ray-casting algorithm to give the user illusion of 3-d world.
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
    gameWorld: GameWorld,
    result: Result
};

var canvas;
var currentState;
var score;
var mapLayout;
var titleImgs = [];
var ghostImgs = [];
var lightningImg;
var instructionImg;
var candleImgs = [];
var candleLightImgs = [];
var instructionImgs = [];
var wallImgs = [];


function preload() {
    // start screen imgs
    titleImgs[0] = loadImage("images/title_background.png");
    titleImgs[1] = loadImage("images/title.png");
    titleImgs[2] = loadImage("images/title_dark.png");
    lightningImg = loadImage("images/lightning.png");
    // instruction screen imgs
    candleImgs[0] = loadImage("images/candle1.png");
    candleImgs[1] = loadImage("images/candle2.png");
    candleLightImgs[0] = loadImage("images/candle_light.png");
    candleLightImgs[1] = loadImage("images/candle_light2.png");
    candleLightImgs[2] = loadImage("images/candle_light3.png");
    candleLightImgs[3] = loadImage("images/candle_light4.png");
    instructionImg = loadImage("images/instruction.png");
    instructionImgs[0] = loadImage("images/arrow_keys.png");
    instructionImgs[1] = loadImage("images/key.png");
    instructionImgs[2] = loadImage("images/rock.png");
    // game imgs
    background = loadImage("images/dawn.png");
    wallImgs[0] = loadImage("images/wall.png");
    wallImgs[1] = loadImage("images/wall_side.png");
    ghostImgs[0] = loadImage("images/ghost_front1.png");
    ghostImgs[1] = loadImage("images/ghost_front2.png");
    ghostImgs[2] = loadImage("images/ghost_front_angle1.png");
    ghostImgs[3] = loadImage("images/ghost_front_angle2.png");
    ghostImgs[4] = loadImage("images/ghost_side1.png");
    ghostImgs[5] = loadImage("images/ghost_side2.png");
    ghostImgs[6] = loadImage("images/ghost_back_angle1.png");
    ghostImgs[7] = loadImage("images/ghost_back_angle2.png");
    ghostImgs[8] = loadImage("images/ghost_back1.png");
    ghostImgs[9] = loadImage("images/ghost_back2.png");
    ghostImgs[10] = loadImage("images/ghost_front_angle3.png");
    ghostImgs[11] = loadImage("images/ghost_front_angle4.png");
    ghostImgs[12] = loadImage("images/ghost_back_angle3.png");
    ghostImgs[13] = loadImage("images/ghost_back_angle4.png");
    ghostImgs[14] = loadImage("images/ghost_side3.png");
    ghostImgs[15] = loadImage("images/ghost_side4.png");
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
