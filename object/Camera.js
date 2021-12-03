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
    },

    /**
     * Camera will follow the given object.
     * @param obj : object that camera would be center to.
     */
    focusOn: function(obj) {
        this.x = obj.x - HALF_CANVAS_WIDTH;
        this.y = obj.y - HALF_CANVAS_HEIGHT;
    }
}
