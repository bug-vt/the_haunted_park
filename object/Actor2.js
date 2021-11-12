/**
 * Actor.js
 * Author: Bug Lee
 * Last modified: 11/4/21
 *
 * This module contains data structure for Actor.
 * Actor act base on its state and it state is
 * controlled from external inputs (such as 
 * User inputs or AI).
 */


"use strict";


var Actor = Object.create(SimpleObj);
Actor.angle = 0;
Actor.isAlive = true;
Actor.inputs = [false, false, false, false];
Actor.randNum = 0;
Actor.prevX = this.x;
Actor.prevY = this.y;
Actor.frame = 0;
//Actor.timeCheck = performance.now();

Actor.setSpeed = function(speed) {
    this.speed = speed;
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
        }
        else if (obj.type === PRIZE) {
            score++;
            obj.type = GONE;
        }
    }
};

/**
 * Update actor position and angle.
 */
Actor.update = function() {
    let tmpAngle = this.angle;
    this.prevX = this.x;
    this.prevY = this.y;
    if (this.inputs[MOVE_LEFT]) {
        this.x -= this.speed;
        tmpAngle = 0;
        this.inputs = [true, false, false, false];
    }
    if (this.inputs[MOVE_RIGHT]) {
        this.x += this.speed;
        tmpAngle = 180;
        this.inputs = [false, true, false, false];
    }
    if (this.inputs[MOVE_UP]) {
        this.y -= this.speed;
        tmpAngle = 90;
        this.inputs = [false, false, true, false];
    }
    if (this.inputs[MOVE_DOWN]) {
        this.y += this.speed;
        tmpAngle = -90;
        this.inputs = [false, false, false, true];
    }
    if (this.angle != tmpAngle) {
        this.angle = tmpAngle;
    }

    if (this.type == NPC) {
        this.inputs = [false, false, false, false];
    }
};

/**
 * Render actor and show animation.
 *
 * @param offset : camera object for offset.
 */
Actor.render = function(offset) {

    let renderX = this.x - offset.x;
    let renderY = this.y - offset.y;
    
    push();
    translate(renderX + 10, renderY + 10);
    if (this.type == NPC) {
        rotate(-HALF_PI);
    }
    rotate(this.angle * PI / 180);
    translate(-renderX - 10, -renderY - 10);
    if (this.type == PLAYER) {
        renderY -= 3;
    }
    image(this.imgs[this.frame], renderX, renderY);
    pop();

    // animation
    if (frameCount % 3 == 0) {
        this.frame = (this.frame + 1) % this.imgs.length;
    }

};


