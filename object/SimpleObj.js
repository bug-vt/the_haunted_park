/**
 * SimpleObj.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains data structure for SimpleObj,
 * which provide a baseline for many objects used in game.
 */

"use strict";

/**
 * SimpleObj have following properties:
 * 1. initialziation of coordiante, object size, and type
 * 2. box collision
 * 3. render
 * 4. set image
 * 5. spawn dust (spawn effect)
 */
var SimpleObj = {
    /**
     * Initialize the object
     * @param x: x coordinate
     * @param y: y coordiante
     * @param width: width of the object
     * @param height: height of the object
     * @type: type of the object, such as wall, ground, etc...
     */
    init: function(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    },
    
    /**
     * Set the image data that would represent the object.
     * Offset appropriately so that img will be centered.
     * @param img : array containing pixel positions.
     */
    setImg: function(liner, filler) {
        /*
        Matrix.cartesian2homogeneous(liner);
        Matrix.cartesian2homogeneous(filler);
        this.imgLine = ShiftMatrix(-10, -10).mult(liner);
        this.imgFill = ShiftMatrix(-10, -10).mult(filler);
        Matrix.homogeneous2cartesian(this.imgLine);
        Matrix.homogeneous2cartesian(this.imgFill);
        */
    },

    /**
     * Check box collision between this object and things on the game.
     * This give flexibility for the things that are not objects.
     *
     * @param x: x coordinate of the things.
     * @param y: y corrdinate of the things.
     * @param width: width of the things.
     * @param height: hieght of the things.
     */
    collision: function(x, y, width, height) {
        if (this.x + this.width > x && this.x < x + width &&
            this.y + this.height > y && this.y < y + height) {
            return true;
        }
        return false;
    },

    /**
     * Render the image base on its type.
     *
     * @param offset: camera offset.
     */
    render: function(offset) {

        let renderX = this.x - offset.x;
        let renderY = this.y - offset.y;

        if (this.type == PRIZE) {
            fill(255,255,0);
            for (let pixel of this.img) {
                rect(renderX + pixel[0], renderY + pixel[1], 1, 1);
            }
        }
    },

    /**
     * Generate explosion effect.
     *
     * @param dusts : array containing dust objects.
     * @param type : effect type.
     */
    spawnDust: function(dusts, type) {
        let dust = Object.create(Dust);
        dust.init(this.x + this.width / 2, this.y + this.height / 2, type);
        dusts.push(dust);
    }
};


