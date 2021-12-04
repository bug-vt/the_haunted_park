/**
 * Camera.js
 * Author: Bug Lee
 * Last modified: 12/3/21
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
     */
    init: function(x, y) {
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
