/**
 * TileMap.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains TileMap data structure.
 */


"use strict";


function TileMap() {
    var tiles = [];
    var mapLayout = [];

    /**
     * Initialize wide tile map.
     * Boarder are fill with walls. Position of walls are randomize, but
     * no consecutive walls will be form.
     */
    function init() {
        for (let row = 0; row < MAP_ROW; row++) {
            mapLayout.push([]);
            for (let col = 0; col < MAP_COLUMN; col++) {
                let posY = row * TILE_SIZE;
                let posX = col * TILE_SIZE;
                let randNum = random();
                // Place wall at the boarder and
                // some randomly inside the game world
                if ((row == 0 || row == MAP_ROW - 1 || col == 0 || col == MAP_COLUMN - 1
                    || randNum < 0.01) && (row != 10 || col != 18)) {
                    let wall = Object.create(SimpleObj);
                    wall.init(posX, posY, TILE_SIZE, TILE_SIZE, WALL);
                    wall.imgLine = rock_liner;
                    wall.imgFill = rock_filler;
                    tiles.push(wall);
                    mapLayout[row].push(WALL);
                }
                else {
                    let ground = Object.create(SimpleObj);
                    if (randNum < 0.05) {
                        ground.init(posX, posY, TILE_SIZE, TILE_SIZE, GRASS);
                    }
                    else {
                        ground.init(posX, posY, TILE_SIZE, TILE_SIZE, GROUND);
                    }
                    tiles.push(ground);
                    mapLayout[row].push(GROUND);
                }
            }
        }
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
     * @param obj: Actor or bullet.
     */
    function collision(obj) {
        let column = floor(obj.x / TILE_SIZE);
        let row = floor(obj.y / TILE_SIZE); 
        let index = column + row * MAP_COLUMN;

        // check collision with bullets
        if (obj.type == BULLET) {
            if (tiles[index].type === WALL) {
                obj.type = DEAD;
            }
            return;
        }
        // check left, right, up, and down
        // base one given positin of object
        let neighbors = [index, index + 1, 
                         index + MAP_COLUMN, index + MAP_COLUMN + 1];
                
        for (let neighbor of neighbors) {
            if (tiles[neighbor].type === WALL &&
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
        // grass field 
        let gradation = 0;
        for (let y = CANVAS_HEIGHT; y >= 0; y -= 10) {
            fill(0 + gradation, 200 + gradation,  0 + gradation);
            gradation++;
            rect(0, y, CANVAS_WIDTH, 10); 
        }
        for (let tile of tiles) {
            let renderX = tile.x - offset.x;
            let renderY = tile.y - offset.y;

            if (tile.type === WALL) {
                image(images[3], renderX, renderY, tile.width, tile.height);
            }
            else if (tile.type === GRASS) {
                image(images[4], renderX, renderY, tile.width, tile.height);
            }
        }
    }

    var publicAPI = {
        init: init,
        getMapLayout: getMapLayout,
        collision: collision,
        render: render 
    };

    return publicAPI;
}





