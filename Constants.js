/**
 * Constants.js
 * Author: Bug Lee
 * Last modified: 10/29/21
 *
 * This module contains constant values for the game.
 */

"use strict";

// set up 
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 400;
const HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2;
const HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;
const FRAME_RATE = 60;
const ONE_SEC = 1000;
const HALF_SEC = 500;
const SPACE_BAR = 32;

// Start, How to play screen
const BUTTON = "@";
const BIG_TEXT_SIZE = 40;
const DEFAULT_TEXT_SIZE = 20;
const WIN = true;
const OVER = false;

// Tile map
const TILE_SIZE = 20;
const MAP_WIDTH = 400;
const MAP_HEIGHT = 400;
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
const NUM_OF_PRIZE = 3;
const G_DUST = "G";
const B_DUST = "B";
const R_DUST = "R";
const SMOKE = "S";
const BULLET = ".";

// Actor 
const FORWARD = 0;
const BACKWARD = 1;
const TURN_LEFT = 2;
const TURN_RIGHT = 3;
const NPC_SPD = 0.5;
const PLAYER_SPD = 1.5;
const ON_SIGHT = 19600;
const TURN_RATE = 4;
const BULLET_SIZE = 4;
const BULLET_SPD = 2;
const SMALL_ANGLE = 5 * Math.PI / 180;
