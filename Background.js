
"use strict";


function Background() {
    var imgs;
    var player;
    var dir;

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

    function render() {
        let angle = atan2(dir[1], dir[0]);
        let offsetX = (angle + PI) * CANVAS_WIDTH * 4 / TWO_PI;
        for (let i = 0; i < imgs.length; i++) {
            let renderX = CANVAS_WIDTH * i - offsetX;
            if (renderX >= -CANVAS_WIDTH && renderX <= CANVAS_WIDTH) {
                image(imgs[i], renderX, 0); 
            }
        }
        image(imgs[0], CANVAS_WIDTH * 4 - offsetX, 0); 
    }

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
