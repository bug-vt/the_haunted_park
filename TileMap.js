/**
 * TileMap.js
 * Author: Bug Lee
 * Last modified: 11/12/21
 *
 * This module contains TileMap data structure.
 */


"use strict";


function TileMap() {
    var map = ["wwwwwwwwwwwwwwwwwwww",
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
    var tiles = [];
    var mapLayout = [];
    var noises = [];

    /**
     * Initialize tile map using the pre-defined array of strings.
     */
    function init() {
        for (let row = 0; row < MAP_ROW; row++) {
            mapLayout.push([]);
            for (let col = 0; col < MAP_COLUMN; col++) {
                let posY = row * TILE_SIZE;
                let posX = col * TILE_SIZE;
                let type = map[row][col];
                let randNum = random();

                if (type === WALL) {
                    let wall = Object.create(SimpleObj);
                    wall.init(posX, posY, TILE_SIZE, TILE_SIZE, WALL);
                    tiles.push(wall);
                    mapLayout[row].push(WALL);
                }
                else if (type === DOOR) {
                    let door = Object.create(SimpleObj);
                    door.init(posX, posY, TILE_SIZE, TILE_SIZE, DOOR);
                    tiles.push(door);
                    mapLayout[row].push(DOOR);
                }
                else {
                    let ground = Object.create(SimpleObj);
                    ground.init(posX, posY, TILE_SIZE, TILE_SIZE, GROUND);
                    tiles.push(ground);
                    mapLayout[row].push(GROUND);
                }
            }
        }
    }

    function rockNoise(rock_noises) {
        noises = rock_noises;
    }

    /** 
     * Get the current layout of the tile map.
     */
    function getMapLayout() {
        return mapLayout;
    }


    /**
     * Check collision between given object and surrounding tiles.
     *
     * @param obj: Actor.
     */
    function collision(obj) {
        let column = floor(obj.x / TILE_SIZE);
        let row = floor(obj.y / TILE_SIZE); 
        let index = column + row * MAP_COLUMN;

        // check collision with bullets
        if (obj.type == BULLET) {
            if (tiles[index].type != GROUND) {
                obj.type = DEAD;
                noise = Object.create(SimpleObj);
                noise.init(obj.prevX, obj.prevY, 5, 5, NOISE);
                noises.push(noise);
            }
            return;
        }
        // check left, right, up, and down
        // base one given positin of object
        let neighbors = [index, index + 1, 
                         index + MAP_COLUMN, index + MAP_COLUMN + 1];
                
        for (let neighbor of neighbors) {
            if (tiles[neighbor].type != GROUND &&
                tiles[neighbor].collision(obj.x, obj.y, obj.width, obj.height)) {
                
                obj.x = obj.prevX;
                obj.y = obj.prevY;
            }
        }
    }

    /**
     * render entire tile map.
     *
     * @param offset : camera object for offset. 
     */
    function render(offset) {
        for (let tile of tiles) {
            let renderX = tile.x - offset.x;
            let renderY = tile.y - offset.y;

            if (tile.type === WALL) {
                fill(0);
                rect(renderX, renderY, 20, 20);
            }
            else if (tile.type === DOOR) {
                fill(0,0,255);
                rect(renderX, renderY, 20, 20);
            }
        }
    }

    var publicAPI = {
        init: init,
        rockNoise: rockNoise,
        getMapLayout: getMapLayout,
        collision: collision,
        render: render 
    };

    return publicAPI;
}





