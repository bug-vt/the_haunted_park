/**
 * Actor.js
 * Author: Bug Lee
 * Last modified: 11/12/21
 *
 * This module contains data structure for Actor.
 * Actor act base on its state and it state is
 * controlled from external inputs (such as 
 * User inputs or AI).
 */


"use strict";


var Actor = Object.create(SimpleObj);
Actor.isAlive = true;
Actor.inputs = [false, false, false, false];
Actor.randNum = 0;
Actor.prevX = this.x;
Actor.prevY = this.y;
Actor.timeCheck = performance.now();
Actor.frame = 0;
Actor.maxFrame = 2;

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
 * Spawn bullet object to shoot.
 * Direction of the bullet is same as direction of the actor.
 */
Actor.spawnBullet = function() {
    if (performance.now() - this.timeCheck > TWO_SEC) {
        let bullet = Object.create(Bullet);
        bullet.setImg([instructionImgs[2], instructionImgs[2]]);
        bullet.init(this.x, this.y, BULLET_SIZE, BULLET_SIZE, BULLET);
        bullet.setDirection(-this.direction[0], -this.direction[1]);
        this.bullets.push(bullet); 

        this.timeCheck = performance.now();
    }
}

/** 
 * Rotate the actor.
 * @param degree : degree to rotate (not radian)
 */
Actor.rotate = function(degree) {
    if (this.type == PLAYER) {
        this.plane = RotationMatrix(degree).mult(this.plane);
    }
    this.direction = RotationMatrix(degree).mult(this.direction);
};

/**
 * Check collision between objects.
 * If the object is a bullet, then explode.
 * Otherwise, prevent the actor from moving.
 * @param obj : object that is in contacting with.
 */
Actor.checkCollision = function(obj) {
    if (this.collision(obj.x, obj.y, obj.width, obj.height)) {
        if (obj.type == NPC) {
            if (this.type === PLAYER) {
                let heading = createVector(-this.direction[0], -this.direction[1], 0);
                let target = createVector(obj.x - this.x, obj.y - this.y, 0);
                let targetAngle = heading.angleBetween(target) * 180 / PI;
                if (abs(targetAngle) < 40) {
                    this.caughtOffGaurd = false;
                }
                this.isAlive = false;
            }
        }
        else if (obj.type === PRIZE) {
            score++;
            obj.type = GONE;
        }
    }
};

/**
 * Update animaion frame of actor and its position.
 */
Actor.update = function() {
    if (frameCount % 6 == 0) {
        this.frame = (this.frame + 1) % this.maxFrame;
    }
    this.prevX = this.x;
    this.prevY = this.y;
    if (this.type == PLAYER) {
        if (this.inputs[TURN_LEFT]) {
            this.rotate(-TURN_RATE);
        }
        if (this.inputs[TURN_RIGHT]) {
            this.rotate(TURN_RATE);
        }
        if (this.inputs[FORWARD]) {
            this.x -= this.direction[0] * this.speed;
            this.y -= this.direction[1] * this.speed;
        }
        if (this.inputs[BACKWARD]) {
            this.x += this.direction[0] * this.speed;
            this.y += this.direction[1] * this.speed;
        }
    }
    else {
        let tmpDir = this.direction;
        if (this.inputs[MOVE_LEFT]) {
            this.x -= this.speed;
            tmpDir = [1,0];
        }
        if (this.inputs[MOVE_RIGHT]) {
            this.x += this.speed;
            tmpDir = [-1,0];
        }
        if (this.inputs[MOVE_UP]) {
            this.y -= this.speed;
            tmpDir = [0,1];
        }
        if (this.inputs[MOVE_DOWN]) {
            this.y += this.speed;
            tmpDir = [0,-1];
        }
        if (this.direction != tmpDir) {
            this.direction = tmpDir;
        }
    }

    this.inputs = [false, false, false, false];
};

/**
 * Render actor on the world map.
 *
 * @param offset : camera object for offset.
 */
Actor.render = function(offset) {

    let renderX = this.x - offset.x;
    let renderY = this.y - offset.y;

    if (this.type === PLAYER) {
        fill(150, 150, 255);
        circle(renderX + this.width / 2, renderY + this.height / 2, 20);
    }
    else if (this.type === NPC) {
        image(this.img[this.frame], renderX - 5, renderY - 5, 30, 30); 
    } 
    

};



