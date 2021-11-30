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
    init: function(x, y, order, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.dist = 0;
        this.order = order;
    }
};

function RayCast(player, npc) {
    var posX = (player.x + player.width / 2) / TILE_SIZE;
    var posY = (player.y + player.height / 2) / TILE_SIZE;
    var dirX = -player.direction[0];
    var dirY = -player.direction[1];
    var planeX = player.plane[0];
    var planeY = player.plane[1];
    var depth = []; 
    var sprite = new Array(npc.length);

    for (let i = 0; i < npc.length; i++) {
        sprite[i] = Object.create(Sprite);
        sprite[i].init((npc[i].x + npc[i].width / 2) / TILE_SIZE, 
                       (npc[i].y + npc[i].height / 2) / TILE_SIZE, 
                        i, npc[i].img);
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
        let drawEnd = lineHeight / 2 + CANVAS_HEIGHT / 2;

        // calculate exact position where wall was hit
        let wallX;
        if (side == FRONT) {
            wallX = posY + perpendicularWallDist * rayDirY;
        }
        else {
            wallX = posX + perpendicularWallDist * rayDirX;
        }
        wallX -= floor((wallX));

        // x position on the texture
        let textureX = floor(wallX * wallImgs[0].width);
        if (side == FRONT && rayDirX > 0) {
            textureX = wallImgs[0].width - textureX - 1;
        }
        if (side == SIDE && rayDirY < 0) {
            textureX = wallImgs[0].width - textureX - 1;
        }
        if (perpendicularWallDist > PLAYER_SIGHT * 2) {
            fill(0);
            rect(x, drawStart, 1, drawEnd - drawStart);
        }
        else {
            if (side == SIDE) {
                image(wallImgs[1], x, drawStart,    // img, destX, destY
                        1, drawEnd - drawStart,     // dest_width, dest_height 
                        textureX, 0,                // sourceX, sourceY 
                        1, wallImgs[0].height);     // source_width, source_height
            }
            else {
                image(wallImgs[0], x, drawStart,    // img, destX, destY
                        1, drawEnd - drawStart,     // dest_width, dest_height 
                        textureX, 0,                // sourceX, sourceY 
                        1, wallImgs[0].height);     // source_width, source_height
            }
            if (perpendicularWallDist >= PLAYER_SIGHT - 3) {
                fill(0, perpendicularWallDist * 15);
                rect(x, drawStart, 1, drawEnd - drawStart);
            }
        }

        // store depth info of the wall
        // this will be used for determining drawing order between sprites
        depth[x] = perpendicularWallDist;
    }
    
    // --------------------------
    // sprite casting
    for (let i = 0; i < sprite.length; i++) {
        sprite[i].dist = pow(posX - sprite[i].x, 2) + pow(posY - sprite[i].y, 2);
    }
    sprite.sort(sortBy('dist'));

    for (let i = 0; i < sprite.length; i++) {
        // sprite position relative to player/camera
        let spriteX = sprite[i].x - posX;
        let spriteY = sprite[i].y - posY;

        // calculate sprite's base and depth 
        let invDet = 1.0 / (planeX * dirY - dirX * planeY);
        let transform = Matrix.mult([[dirY, -dirX],[-planeY,planeX]], [spriteX, spriteY]);
        transform[0] *= invDet; // base 
        transform[1] *= invDet; // depth
        
        // x position of the sprite on screen
        let spriteScreenX = floor((CANVAS_WIDTH / 2) * (1 + transform[0] / transform[1]));

        // calculate drawing size of the sprite that would project to the screen
        let spriteHeight = floor(CANVAS_HEIGHT / transform[1]);

        let drawStartY = floor(-spriteHeight / 2 + CANVAS_HEIGHT / 2);
        let drawEndY = floor(spriteHeight / 2 + CANVAS_HEIGHT / 2);

        let spriteWidth = floor(CANVAS_HEIGHT / transform[1]);
        let drawStartX = floor(-spriteWidth / 2 + spriteScreenX);
        if (drawStartX < 0) {
            drawStartX = 0;
        }
        let drawEndX = floor(spriteWidth / 2 + spriteScreenX);
        if (drawEndX >= CANVAS_WIDTH) {
            drawEndX = CANVAS_WIDTH - 1;
        }

        
        for (let stripe = drawStartX; stripe < drawEndX; stripe++) {

            // following condition need to be met:
            // 1. sprite is not behind the camera
            // 2. sprite is within the left camera boundary
            // 3. sprite is within the right camera boundary
            // 4. sprite is front of the wall
            if (transform[1] > 0 && stripe >= 0 && stripe < CANVAS_WIDTH &&
                transform[1] < depth[stripe]) {
                let currNpc = npc[sprite[i].order];
                let frame = currNpc.frame;
                if (transform[1] > PLAYER_SIGHT) {
                    if (currNpc.type == NPC) {
                        frame += 16;
                    }
                }
                else if (currNpc.type == NPC) {
                    frame += pointOfView(player.direction, currNpc.direction) * currNpc.maxFrame;
                }
                let img = sprite[i].img[frame];
                let textureX = 
                        floor( (stripe - spriteScreenX + spriteWidth / 2) // texture offset
                                * img.width / spriteWidth); // convert to x pos in texture 
                
                //stroke(255, 0, 0);
                //line(stripe, drawStartY, stripe, drawEndY);

                image(img, stripe, drawStartY,      // img, destX, destY
                        1, drawEndY - drawStartY,   // dest_width, dest_height 
                        textureX, 0,                // sourceX, sourceY 
                        1, img.height);             // source_width, source_height
            }
        }
    }
}

function pointOfView(plyDir, npcDir) {
    let heading = createVector(plyDir[0], plyDir[1], 0);
    let view = createVector(plyDir[0] + npcDir[0], plyDir[1] + npcDir[1], 0);
    let viewAngle = heading.angleBetween(view);
    let npcAngle = viewAngle * 180 / PI;
    
    if (npcAngle < -78) {
        return FRONT_VIEW;
    }
    else if (npcAngle < -56) {
        return FRONT_LEFT_VIEW;
    }
    else if (npcAngle < -34) {
        return SIDE_LEFT_VIEW;
    }
    else if (npcAngle < -11) {
        return BACK_LEFT_VIEW;
    }
    if (npcAngle < 11) {
        return BACK_VIEW;
    }
    else if (npcAngle < 34) {
        return BACK_RIGHT_VIEW;
    }
    else if (npcAngle < 56) {
        return SIDE_RIGHT_VIEW;
    }
    else if (npcAngle < 78) {
        return FRONT_RIGHT_VIEW;
    }
    return FRONT_VIEW;
}

/**
 * Custom comparator for sort.
 * compare the object base on specified key.
 */
function sortBy(key) {
    return function(a, b) {
        if (a[key] > b[key]) {
            return -1;
        }
        else if (a[key] < b[key]) {
            return 1;
        }
        return 0;
    };
}
