/**
 * Actor.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains data structure for Actor.
 * Actor act base on its state and it state is
 * controlled from external inputs (such as 
 * User inputs or AI).
 */


"use strict";


var Actor = Object.create(SimpleObj);
Actor.setImg(liner, filler);
Actor.angle = 0;
Actor.vector = [0, 0];
Actor.isAlive = true;
Actor.inputs = [false, false];
Actor.randNum = 0;
Actor.prevX = this.x;
Actor.prevY = this.y;
Actor.timeCheck = performance.now();

Actor.setBullets = function(bullets) {
    this.bullets = bullets;
};
Actor.setEffect = function(dusts) {
    this.dusts = dusts;
}
Actor.setSpeed = function(speed) {
    this.speed = speed;
};
Actor.setDirection = function(direction) {
    this.direction = direction;
};

/**
 * Generate fire effects when actor is moving.
 * When actor is dead, generate smoke effects.
 *
 * @param direction : moving direction (FORWARD or BACKWARD).
 */
Actor.showEffect = function(direction) {
    if (frameCount % 6 == 0) {
        if (this.state.id === "dead") {
            let dust = Object.create(Dust);
            let dustX = this.x + 10;
            let dustY = this.y + 10;
            dust.init(dustX, dustY, SMOKE);
            this.dusts.push(dust);
        }
        else if (direction === FORWARD) {
            let dust = Object.create(Dust);
            let dustX = this.x + 10 - this.direction[0][0] * 15;
            let dustY = this.y + 10 - this.direction[0][1] * 15;
            dust.init(dustX + random(-1, 2), dustY + random(-1, 2), B_DUST);
            this.dusts.push(dust);
        }
        else {
            let dust = Object.create(Dust);
            let dustX = this.x + 10 + this.direction[0][0] * 15;
            let dustY = this.y + 10 + this.direction[0][1] * 15;
            dust.init(dustX + random(-1, 2), dustY + random(-1, 2), B_DUST);
            this.dusts.push(dust);
        }
    }
};

/**
 * Spawn bullet object to shoot.
 * Direction of the bullet is same as direction of the actor.
 */
Actor.spawnBullet = function() {
    if (performance.now() - this.timeCheck > ONE_SEC) {
        let bullet = Object.create(Bullet);
        let offsetX = this.width / 2 + (this.direction[0][0] * 18);
        let offsetY = this.height / 2 + (this.direction[0][1] * 18);
        bullet.init(this.x + offsetX , this.y + offsetY, BULLET_SIZE, BULLET_SIZE, BULLET);
        bullet.setDirection(this.direction[0][0], this.direction[0][1]);
        bullet.setEffect(this.dusts);
        this.bullets.push(bullet); 

        this.timeCheck = performance.now();
    }
}

/**
 * Change coordinate of the actor.
 */
Actor.move = function() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.vector[0];
    this.y += this.vector[1];
};

/** 
 * Rotate the actor.
 * @param degree : degree to rotate (not radian)
 */
Actor.rotate = function(degree) {
    this.direction = RotationMatrix(degree).mult(this.direction);
    this.angle += degree;
};

/**
 * Check collision between objects.
 * If the object is a bullet, then explode.
 * Otherwise, prevent the actor from moving.
 * @param obj : object that is in contacting with.
 */
Actor.checkCollision = function(obj) {
    if (this.collision(obj.x, obj.y, obj.width, obj.height)) {
        if (obj.type == BULLET) {
            if (this.type === NPC) {
                this.type = DEAD;
                score++;
            }
            obj.type = DEAD;
            this.isAlive = false;
        }
        else
        {
            this.x = this.prevX;
            this.y = this.prevY;
        }
    }
};

/**
 * Update state of actor and its position.
 */
Actor.update = function() {
    this.state.execute();
    this.move();
};

/**
 * Render actor base on actor's current state.
 *
 * @param offset : camera object for offset.
 */
Actor.render = function(offset) {
    // mutate img for rendering
    this.imgLine = RotationMatrix(this.angle).mult(this.imgLine); 
    this.imgFill = RotationMatrix(this.angle).mult(this.imgFill); 

    let renderX = this.x - offset.x;
    let renderY = this.y - offset.y;

    fill(0);
    for (let pixel of this.imgLine) {
        rect(renderX + pixel[0] + 10, renderY + pixel[1] + 10, 1, 1);
    }
    
    fill(150, 150, 255);
    if (this.type === NPC) {
        fill(255, 100, 100);
    } 
    else if (this.type === DEAD) {
        fill(100);
    }
    for (let pixel of this.imgFill) {
        rect(renderX + pixel[0] + 10, renderY + pixel[1] + 10, 1, 1);
    }

    // restore original img so that it can be reuse for next render.
    this.imgLine = RotationMatrix(-this.angle).mult(this.imgLine); 
    this.imgFill = RotationMatrix(-this.angle).mult(this.imgFill); 
};


