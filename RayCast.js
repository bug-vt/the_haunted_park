


"use strict";


function RayCast(player) {
    var posX = player.x / TILE_SIZE;
    var posY = player.y / TILE_SIZE;
    var dirX = -player.direction[0];
    var dirY = -player.direction[1];
    var planeX = player.plane[0];
    var planeY = player.plane[1];
    var h = CANVAS_HEIGHT;

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

        let perpWallDist;

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

        let lineHeight = floor(h / perpWallDist);

        let drawStart = -lineHeight / 2 + h / 2;
        if (drawStart < 0) {
            drawStart = 0;
        }
        let drawEnd = lineHeight / 2 + h / 2;
        if (drawEnd >= h) {
            drawEnd = h - 1;
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
    }
}



