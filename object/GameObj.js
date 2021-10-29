/**
 * GameObj.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains data structure for Bullet and Dust.
 * Both Bullet and Dust can be spawn from the Actor.
 */



var Lightning = {
    init: function(x, y) {
        this.x = x;
        this.y = y;
        this.alpha = 150;
        this.size = 400;
        this.timeCheck = performance.now();
        this.flashTime = performance.now();
        this.flashAlpha = 255;
    },

    update: function() {
        if (performance.now() - this.flashTime > HALF_SEC)
        {
            if (this.alpha >= -20) {
                this.alpha -= 6;
            }
        }
        if (this.flashAlpha >= 0) {
            this.flashAlpha -= 6;
        }
    },

    render: function() {
        push(); 
        fill(255, 255, 255, this.flashAlpha);
        rect(0, 0, 550, 400);
        tint(255, this.alpha + 20);
        image(lightningImg, this.x, this.y);
        pop();
    }
};

var AnimationObj = {
    init: function(x, y) {
        this.x = x;
        this.y = y;
        this.frame = 0;
    }
}


   
