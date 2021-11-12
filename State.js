/**
 * State.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contains data structure for State.
 * State determine the behavior of the actor and
 * change to different state base on the inputs
 * from the actor. Following are the available states
 * for the actor:
 *
 * 1. Standing
 * 2. Moving 
 * 3. Dead 
 *
 * For Standing and Moving states, the actor can 
 * turn and/or fire bullets. See generateCommand4AI() 
 * inside the Command.js for detail.
 * Dead state produce special smoking effect.
 */


"use strict";

/**
 * Standing state
 *
 * move left/right input -> Moving state
 * DEAD -> Dead state
 * otherwise -> Standing state
 */
function Standing(actor) {
    actor.vector = [0, 0];
    var state = {
        id: "standing",
        execute: function() {
            if (actor.type === DEAD) {
                actor.state = Dead(actor);
            }
            if (actor.inputs[FORWARD] || actor.inputs[BACKWARD]) {
                actor.state = Moving(actor);
            }
        }
    };
    return state;
}


/**
 * Moving state
 *
 * DEAD -> Dead state
 * move left/right input -> Moving state
 * otherwise -> Standing state
 */
function Moving(actor) {
    var state = {
        id: "moving",
        execute: function() {
            if (actor.type === DEAD) {
                actor.state = Dead(actor);
            }
            let movement = false;
            if (actor.inputs[FORWARD]) {
                movement = true;
                actor.vector[0] = actor.direction[0][0] * actor.speed;
                actor.vector[1] = actor.direction[0][1] * actor.speed;
                actor.showEffect(FORWARD);
            }
            if (actor.inputs[BACKWARD]) {
                movement = true;
                actor.vector[0] = -actor.direction[0][0] * actor.speed;
                actor.vector[1] = -actor.direction[0][1] * actor.speed;
                actor.showEffect(BACKWARD);
            }
            if (!movement) {
                actor.state = Standing(actor);
            }
        }
    };
    return state;
}


/**
 * Dead state
 *
 * Always -> Dead state
 */
function Dead(actor) {
    actor.vector = [0, 0];
    actor.inputs = [false, false];
    var state = {
        id: "dead",
        execute: function() {
            actor.showEffect(undefined);
        }
    };
    return state;
}


