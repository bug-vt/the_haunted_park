/**
 * Camera.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains Camera data structure.
 * The camera will follow the object that is set to.
 */



"use strict";

var Camera = {
    /**
     * initialize camera.
     * @param x : initial x position.
     * @param y : initial y position.
     * @param xlim : camera scroll limit for x coordinate.
     * @param ylim : camera scroll limit for y coordinate.
     */
    init: function(x, y, xlim, ylim) {
        this.x = x;
        this.y = y;
        this.xlim = xlim;
        this.ylim = ylim;
        this.xMin = TILE_SIZE;
        this.yMin = TILE_SIZE;
    },

    /**
     * Camera will follow the given object.
     * @param obj : object that camera would be center to.
     */
    focusOn: function(obj) {
        if (this.x >= this.xMin && this.x + CANVAS_WIDTH <= this.xlim) {
            if ((obj.vector[0] > 0 && obj.x - this.x > HALF_CANVAS_WIDTH) ||
                (obj.vector[0] < 0 && obj.x - this.x < HALF_CANVAS_WIDTH)) {
                this.x += obj.vector[0];
            }
            if (this.x < this.xMin) {
                this.x = this.xMin;
            }
            else if (this.x + CANVAS_WIDTH > this.xlim) {
                this.x = this.xlim - CANVAS_WIDTH;
            }
        }
        if (this.y >= this.yMin && this.y + CANVAS_HEIGHT <= this.ylim) { 
            if ((obj.vector[1] > 0 && obj.y - this.y > HALF_CANVAS_HEIGHT) ||
                (obj.vector[1] < 0 && obj.y - this.y < HALF_CANVAS_HEIGHT)) {
                this.y += obj.vector[1];
            }
            if (this.y < this.yMin) {
                this.y = this.yMin;
            }
            else if (this.y + CANVAS_HEIGHT > this.ylim) {
                this.y = this.ylim - CANVAS_HEIGHT;
            }
        }
    }
}
