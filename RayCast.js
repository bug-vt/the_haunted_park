/**
 * RayCast.js
 * Author : Bug Lee
 * Last modified : 11/12/21
 *
 * This module contain data strucutre for ray casting. 
 * Ray casting can be easily apply to existing tile map game and provide
 * illusion of 3d world.
 * This version of ray casing is based on DDA (Digital Differential Analysis)
 * algorithm and adpated from Lode Vandevenne's website.
 * https://lodev.org/cgtutor/raycasting3.html
 */


"use strict";


var Sprite = {
    init: function(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }
};

function RayCast(player, npc) {
    var posX = player.x / TILE_SIZE;
    var posY = player.y / TILE_SIZE;
    var dirX = -player.direction[0];
    var dirY = -player.direction[1];
    var planeX = player.plane[0];
    var planeY = player.plane[1];
    var depth = []; 
    var spriteOrder = [];
    var spriteDistance = [];
    var sprite = new Array(npc.length);

    for (let i = 0; i < npc.length; i++) {
        sprite[i] = Object.create(Sprite);
        sprite[i].init(npc[i].x / TILE_SIZE, npc[i].y / TILE_SIZE, npc[i].img);
    }
    
    // wall casting
    for (let x = 0; x < CANVAS_WIDTH; x++)
    {
        let cameraX = 2 * x / CANVAS_WIDTH - 1;
        let rayDirX = dirX + planeX * cameraX;
        let rayDirY = dirY + planeY * cameraX;

        let mapX = floor(posX);
        let mapY = floor(posY);

        let sideDistX;
        let sideDistY;

        let deltaDistX = abs(1 / rayDirX);
        let deltaDistY = abs(1 / rayDirY);

        var perpendicularWallDist;

        let stepX;
        let stepY;

        let hit = false;
        let side;

        if (rayDirX < 0) {
            stepX = -1;
            sideDistX = (posX - mapX) * deltaDistX;
        }
        else {
            stepX = 1;
            sideDistX = (mapX + 1.0 - posX) * deltaDistX;
        }
        if (rayDirY < 0) {
            stepY = -1;
            sideDistY = (posY - mapY) * deltaDistY;
        }
        else {
            stepY = 1;
            sideDistY = (mapY + 1.0 - posY) * deltaDistY;
        }
      
        // DDA algorithm
        // move ray until it hit the wall
        while (!hit)
        {
            //print(mapX, mapY);
            if (sideDistX < sideDistY) {
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
            }
            else {
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
            }
            if (mapLayout[mapY][mapX] == WALL) {
                hit = true;
            }
        }

        if (side == FRONT) {
            perpendicularWallDist = sideDistX - deltaDistX;
        }
        else {
            perpendicularWallDist = sideDistY - deltaDistY;
        }

        // calcuate drawing size of the wall that would be project to the screen
        let lineHeight = floor(CANVAS_HEIGHT / perpendicularWallDist);

        let drawStart = -lineHeight / 2 + CANVAS_HEIGHT / 2;
        if (drawStart < 0) {
            drawStart = 0;
        }
        let drawEnd = lineHeight / 2 + CANVAS_HEIGHT / 2;
        if (drawEnd >= CANVAS_HEIGHT) {
            drawEnd = CANVAS_HEIGHT - 1;
        }

        switch(mapLayout[mapY][mapX])
        {
            case WALL: 
                stroke(120, 120, 120, 255);
                break;
        }
        
        // darker shade for side view of the wall 
        if (side == SIDE) {
            stroke(50, 50, 50, 255);
        }

        line(x, drawStart, x, drawEnd);
        // store depth info of the wall
        // this will be used for determining drawing order between sprites
        depth[x] = perpendicularWallDist;
    }
    
    // --------------------------
    // sprite casting
    for (let i = 0; i < sprite.length; i++) {
        spriteOrder[i] = i;
        spriteDistance[i] = pow(posX - sprite[i].x, 2) + pow(posY - sprite[i].y, 2);
    }
    //sortSprites(spriteOrder, spriteDistance, sprite.length);

    for (let i = 0; i < sprite.length; i++) {
        // sprite position relative to player/camera
        let spriteX = sprite[spriteOrder[i]].x - posX;
        let spriteY = sprite[spriteOrder[i]].y - posY;

        // calculate sprite's base and depth 
        let invDet = 1.0 / (planeX * dirY - dirX * planeY);
        let transform = Matrix.mult([[dirY, -dirX],[-planeY,planeX]], [spriteX, spriteY]);
        transform[0] *= invDet; // base 
        transform[1] *= invDet; // depth

        let spriteScreenX = floor((CANVAS_WIDTH / 2) * (1 + transform[0] / transform[1]));

        // calculate drawing size of the sprite to the screen that would projec
        // to the screen
        let spriteHeight = abs(floor(CANVAS_HEIGHT / transform[1]));

        let drawStartY = floor(-spriteHeight / 2 + CANVAS_HEIGHT / 2);
        let drawEndY = floor(spriteHeight / 2 + CANVAS_HEIGHT / 2);

        let spriteWidth = abs( floor(CANVAS_HEIGHT / transform[1]));
        let drawStartX = floor(-spriteWidth / 2 + spriteScreenX);
        if (drawStartX < 0) {
            drawStartX = 0;
        }
        let drawEndX = floor(spriteWidth / 2 + spriteScreenX);
        if (drawEndX >= CANVAS_WIDTH) {
            drawEndX = CANVAS_WIDTH - 1;
        }

        
        for (let stripe = drawStartX; stripe < drawEndX; stripe++) {
            let textureX = floor((stripe - (-spriteWidth / 2 + spriteScreenX)) * 94 / spriteWidth);
            // following condition need to be met:
            // 1. sprite is not behind the camera
            // 2. sprite is within the left camera boundary
            // 3. sprite is within the right camera boundary
            // 4. sprite is front of the wall
            if (transform[1] > 0 && stripe > 0 && stripe < CANVAS_WIDTH &&
                transform[1] < depth[stripe]) {

                image(sprite[spriteOrder[i]].img[npc[0].frame], 
                        stripe, drawStartY, 1, drawEndY - drawStartY, textureX);
                //stroke(255, 0, 0);
                //line(stripe, drawStartY, stripe, drawEndY);
            }
        }
    }
}

/**
 * To be implemented.
 */
function sortSprites(order, dist, count) {
    
}
