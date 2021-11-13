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
Actor.angle = 0;
Actor.vector = [0, 0];
Actor.isAlive = true;
Actor.inputs = [false, false, false, false];
Actor.randNum = 0;
Actor.prevX = this.x;
Actor.prevY = this.y;
Actor.timeCheck = performance.now();
Actor.frame = 0;

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
 * Rotate the actor.
 * @param degree : degree to rotate (not radian)
 */
Actor.rotate = function(degree) {
    if (this.type == PLAYER) {
        this.plane = RotationMatrix(degree).mult(this.plane);
    }
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
        if (obj.type == NPC) {
            if (this.type === PLAYER) {
                this.isAlive = false;
            }
            obj.type = DEAD;
        }
        else if (obj.type === PRIZE) {
            score++;
            obj.type = GONE;
        }
    }
};

/**
 * Update state of actor and its position.
 */
Actor.update = function() {
    if (frameCount % 6 == 0) {
        this.frame = (this.frame + 1) % this.img.length;
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
        if (this.inputs[TURN_LEFT]) {
            this.rotate(-TURN_RATE);
        }
        if (this.inputs[TURN_RIGHT]) {
            this.rotate(TURN_RATE);
        }
        if (this.inputs[FORWARD]) {
            this.x += this.direction[0] * this.speed;
            this.y += this.direction[1] * this.speed;
        }
        if (this.inputs[BACKWARD]) {
            this.x -= this.direction[0] * this.speed;
            this.y -= this.direction[1] * this.speed;
        }
    }

    this.inputs = [false, false, false, false];
};

/**
 * Render actor base on actor's current state.
 *
 * @param offset : camera object for offset.
 */
Actor.render = function(offset) {
    // mutate img for rendering

    let renderX = this.x - offset.x;
    let renderY = this.y - offset.y;

    fill(150, 150, 255);
    if (this.type === NPC) {
        fill(255, 100, 100);
    } 
    else if (this.type === DEAD) {
        fill(100);
    }

    rect(renderX, renderY, 20, 20);


    // restore original img so that it can be reuse for next render.
};


