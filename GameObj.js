/**
 * GameObj.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains data structure for Bullet and Dust.
 * Both Bullet and Dust can be spawn from the Actor.
 */


/**
 * Bullet object interact with game entities and create
 * dust effect once it hit something.
 */
var Bullet = Object.create(SimpleObj);
Bullet.setDirection = function(dx, dy) {
    this.vector = [dx * BULLET_SPD, dy * BULLET_SPD]; 
};
Bullet.setEffect = function(dusts) {
    this.dusts = dusts;
};
Bullet.update = function() {
    if (frameCount % 6 == 0) {
        this.spawnDust(this.dusts, R_DUST);
    }
    this.x += this.vector[0];
    this.y += this.vector[1];
};
Bullet.render = function(offset) {
    let renderX = this.x - offset.x;
    let renderY = this.y - offset.y;
    fill(200, 0, 0);
    rect(renderX, renderY, this.width, this.height);
};


/**
 * Dust object produce explosion effect.
 */
var Dust = Object.create(SimpleObj);
Dust.init = function(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 6;
    this.type = type;
    this.alpha = 255;
};

/**
 * Update the dust effect base on its type.
 */
Dust.update = function() {
    if (this.alpha > 0) {
        if (this.type == R_DUST || this.type == B_DUST) {
            this.alpha -= 20;
            this.width += 0.5;
        }
        else if (this.type == SMOKE) {
            this.alpha -= 10;
            this.width += random();
            this.x -= random();
            this.y -= 2 * random();
        }
        else {
            this.alpha -= 10;
            this.width += 5;
        }
    }
    else {
        this.type = DEAD;
    }
};

/**
 * Render the image base on its type.
 *
 * @param offset: camera offset.
 */
Dust.render = function(offset) {

    let renderX = this.x - offset.x;
    let renderY = this.y - offset.y;

    push();
    if (this.type == G_DUST) {
        fill(255, 0, 0, this.alpha);
    }
    else if (this.type == R_DUST) {
        fill(140, 140, 140, this.alpha);
    }
    else if (this.type == SMOKE) {
        fill(150, 150, 150, this.alpha);
    }
    else {
        fill(255, 0, 0, this.alpha);
    }
    circle(renderX, renderY, this.width);
    pop();
};


