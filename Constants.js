/**
 * Constants.js
 * Author: Bug Lee
 * Last modified: 11/12/21
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
const TWO_SEC = 2000;
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
const MAP_WIDTH = 800;
const MAP_HEIGHT = 800;
const MAP_ROW = MAP_HEIGHT / TILE_SIZE;
const MAP_COLUMN = MAP_WIDTH / TILE_SIZE;
//const CEILING = "^";
const WALL = "w";
const DOOR = "E";
const GROUND = "-"; 
const EMPTY = " ";
const PRIZE = "*";
const NPC = "N";
const PLAYER = "P";
const DEAD = "X";
const GONE = "$";
const GRASS = "^";

// Game world
const NUM_OF_NPC = 10;
const NUM_OF_PRIZE = 3;
const G_DUST = "G";
const B_DUST = "B";
const R_DUST = "R";
const SMOKE = "S";
const BULLET = ".";
const NOISE = "O";

// error
const NOT_ENOUGH_KEYS = 1;

// Actor 
const FORWARD = 0;
const BACKWARD = 1;
const TURN_LEFT = 2;
const TURN_RIGHT = 3;
const MOVE_LEFT = 0;
const MOVE_RIGHT = 1;
const MOVE_UP = 2;
const MOVE_DOWN = 3;

const TRANSITION_PROB = 0.25;
const NPC_SPD = 0.5;
const PLAYER_SPD = 1;
const ON_SIGHT = 19600;
const TURN_RATE = 4;
const BULLET_SIZE = 4;
const BULLET_SPD = 2;

// Ray casting
const PLAYER_SIGHT = 7;
const FRONT = 0;
const SIDE = 1;
const FRONT_VIEW = 0;
const FRONT_LEFT_VIEW = 1;
const SIDE_LEFT_VIEW = 2;
const BACK_LEFT_VIEW = 3;
const BACK_VIEW = 4;
const FRONT_RIGHT_VIEW = 5;
const BACK_RIGHT_VIEW = 6;
const SIDE_RIGHT_VIEW = 7;

// world map
const MAP1 = ["wwwwwwwwwwwwwwwwwwww",
              "w        ww        w",
              "w                  w",
              "w                  w",
              "w       wwww       w",
              "wwwwwwwww          w",
              "w       w          w",
              "w       w          w",
              "w       wwww       w",
              "w                  w",
              "w                  E",
              "w                  w",
              "w                  w",
              "w                  w",
              "w    wwwwww        w",
              "w         w        w",
              "w         w        w",
              "w         w        w",
              "w         w        w",
              "wwwwwwwwwwwwwwwwwwww"];                  

const MAP2 = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w            ww               www      w",
"w                             w        w",
"w                                      w",
"w                      w               w",
"w         wwwww        w               w",
"w         w            w               w",
"wwwwwwwwwww            w   wwwwww      w",
"w                      w               w",
"w                      w            wwww",
"w                      w            wwww",
"w                                      w",
"w                                      w",
"w                                      w",
"w                  w                   w",
"w           wwww   w                   w",
"E           w  wwwww   ww      wwww    w",
"w           w           w      wwww    w",
"w           w           w      wwww    w",
"w           w           w      wwww    w",
"w           w           w              w",
"w           w                          w",
"w           w                          w",
"w           w                          w",
"w           w   wwwwwwwww              w",
"wwwwwwwwwww w                wwwwwwwwwww",
"w         w w                w         w",
"w           w               ww         w",
"w         wwwwwww           w          w",
"w                           w          w",
"w                           w          w",
"w                                      w",
"w                               w      w",
"w     wwwwwwww                  w      w",
"w            w                  w      w",
"w            w                  w      E",
"w            w                  w      w",
"w            w       www        w      w",
"w            w       www        w      w",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];
