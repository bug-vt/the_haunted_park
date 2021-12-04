/**
 * Background.js
 * Author: Bug Lee
 * Last modified: 12/3/21
 *
 * This module contains data structure for creating/displaying background.
 */

"use strict";


function Background() {
    var imgs;
    var player;
    var dir;
    
    /**
     * Initialize background in the player point of view.
     * @param currPlayer : object that will be the reference for the point of view 
     * @param backgroundImgs : array containing 4 background images
     *                         (east, west, north, and south)
     */
    function init(currPlayer, backgroundImgs) {
        if (backgroundImgs.length != 4) {
            throw `Background.init\n
                   Please provide array containing 4 background images:
                   east, west, north, and south`;

        }
        imgs = backgroundImgs;
        player = currPlayer;
        update();
    }

    /**
     * Render background in the player point of view.
     */
    function render() {
        let angle = atan2(dir[1], dir[0]);
        // calcuate offset and which image to display on screen base on angle
        let offsetX = (angle + PI) * CANVAS_WIDTH * 4 / TWO_PI;
        for (let i = 0; i < imgs.length; i++) {
            let renderX = CANVAS_WIDTH * i - offsetX;
            if (renderX >= -CANVAS_WIDTH && renderX <= CANVAS_WIDTH) {
                image(imgs[i], renderX, 0); 
            }
        }
        image(imgs[0], CANVAS_WIDTH * 4 - offsetX, 0); 
    }
    
    /**
     * update current point of view.
     */
    function update() {
        dir = player.direction;
    }

    var publicAPI = {
        init: init,
        update: update,
        render: render
    }
    
    return publicAPI;
}
