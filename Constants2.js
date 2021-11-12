/**
 * Constants.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains constant values for the game.
 */

"use strict";

// set up 
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2;
const HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;
const FRAME_RATE = 60;
const ONE_SEC = 1000;
const HALF_SEC = 500;
const NORMAL = 0;
const HARD = 1;
const SPACE_BAR = 32;

// Tile map
const TILE_SIZE = 20;
const MAP_WIDTH = 440;
const MAP_HEIGHT = 440;
const MAP_ROW = MAP_HEIGHT / TILE_SIZE;
const MAP_COLUMN = MAP_WIDTH / TILE_SIZE;
//const CEILING = "^";
const WALL = "w";
const GROUND = "-"; 
const EMPTY = " ";
const PRIZE = "*";
const NPC = "N";
const PLAYER = "P";
const DEAD = "X";
const GONE = "$";
const GRASS = "^";

// Game world
const NUM_OF_NPC = 5;
const G_DUST = "G";
const B_DUST = "B";
const R_DUST = "R";
const SMOKE = "S";
const BULLET = ".";
//--unused
//const GRAVITY = 1;
//const NUM_OF_PRIZE = 20;

// Actor 
const FORWARD = 0;
const BACKWARD = 1;
const NPC_SPD = 1;
const PLAYER_SPD = 1;
const ON_SIGHT = 28900;
const TOO_FAR = 32400;
const TOO_CLOSE = 14400;
const CLOSE = -1;
const FAR = 1;
const TURN_RATE = 4;
const BULLET_SIZE = 4;
const BULLET_SPD = 2;
const AVOID_ANGLE = 30 * Math.PI / 180;
const SMALL_ANGLE = 5 * Math.PI / 180;
const LINE_OF_SIGHT = (function() {
    let line = [];
    for (let i = 1; i < 16; i++) {
        line.push([0, -TILE_SIZE * i]);
    }
    return line;
})();
//--unused
//const JUMP_SPD = 17;
//const TRANSITION_PROB = 0.25;

// Start, How to play, Result screen
const BUTTON = "@";
const BIG_TEXT_SIZE = 40;
const DEFAULT_TEXT_SIZE = 20;
const WIN = true;
const OVER = false;
