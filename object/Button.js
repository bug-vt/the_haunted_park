/**
 * Actor.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains data structures for MouseObj and ButtonObj.
 */


"use strict";

/**
 * This object track mouse click.
 */
var MouseObj = {
    x: -1,
    y: -1 
}
/**
 * ButtonObj have additional properties added on
 * compare to the SimpleObj.
 * 1, 2, 3. same as SimpleObj
 * 4. contain text
 * 5. change state of the game when it get clicked
 */
var ButtonObj = Object.create(SimpleObj);
ButtonObj.mode = undefined;
/**
 * Set text display for the button.
 * @param text: text that will display on top of button.
 */
ButtonObj.text = function(text) {
    this.text = text;
}
/**
 * Record mouse poistion when clicked.
 */
ButtonObj.clicked = function() {
    MouseObj.x = mouseX;
    MouseObj.y = mouseY;
};
/**
 * Change state of the game when user click the button.
 *
 * @param nextState : suceeding state after click.
 */
ButtonObj.clickEvent = function(nextState) {
    if (this.collision(MouseObj.x, MouseObj.y, 0, 0)) {
        currentState = nextState;
        MouseObj.x = -1;
        MouseObj.y = -1;
        if (this.mode != undefined) {
            gameMode = this.mode;
        }
    }
}

/**
 * Render button.
 */
ButtonObj.render = function() {
    push();
    fill(255,255,255,80);
    rect(this.x, this.y, this.width, this.height);
    fill(0);
    textSize(DEFAULT_TEXT_SIZE);
    text(this.text, this.x + this.width / 2, this.y + this.height / 2);
    pop();
};
