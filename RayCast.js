


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

        var perpWallDist;

        let stepX;
        let stepY;

        let hit = 0;
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
        
        while (hit == 0)
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
            if (mapLayout[mapY][mapX] == 'w') {
                hit = 1;
            }
        }

        if (side == 0) {
            perpWallDist = sideDistX - deltaDistX;
        }
        else {
            perpWallDist = sideDistY - deltaDistY;
        }

        let lineHeight = floor(CANVAS_HEIGHT / perpWallDist);

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
            case 'w': 
                stroke(0, 0, 255);
                break;
        }

        if (side == 1) {
            stroke(0, 0, 120);
        }

        line(x, drawStart, x, drawEnd);
        depth[x] = perpWallDist;
    }

    // sprite casting
    for (let i = 0; i < sprite.length; i++) {
        spriteOrder[i] = i;
        spriteDistance[i] = pow(posX - sprite[i].x, 2) + pow(posY - sprite[i].y, 2);
    }
    //sortSprites(spriteOrder, spriteDistance, sprite.length);

    for (let i = 0; i < sprite.length; i++) {
        let spriteX = sprite[spriteOrder[i]].x - posX;
        let spriteY = sprite[spriteOrder[i]].y - posY;

        let invDet = 1.0 / (planeX * dirY - dirX * planeY);
        let transform = Matrix.mult([[dirY, -dirX],[-planeY,planeX]], [spriteX, spriteY]);
        transform[0] *= invDet;
        transform[1] *= invDet;

        let spriteScreenX = floor((CANVAS_WIDTH / 2) * (1 + transform[0] / transform[1]));

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
            let texX = floor((stripe - (spriteScreenX)) * 94 / spriteWidth);
            if (transform[1] > 0 && stripe > 0 && stripe < CANVAS_WIDTH &&
                transform[1] < depth[stripe]) {

                image(sprite[spriteOrder[i]].img[npc[0].frame], 
                        stripe, drawStartY, 1, drawEndY - drawStartY, texX);
                //stroke(255, 0, 0);
                //line(stripe, drawStartY, stripe, drawEndY);
            }
        }
    }
}

function sortSprites(order, dist, count) {
    
}
