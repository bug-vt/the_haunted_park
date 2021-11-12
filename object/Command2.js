/**
 * Command.js
 * Author: Bug Lee
 * Last modified: 11/4/21
 *
 * This module contains data structure for Command.
 * Command is use for providing control input for a actor's state.
 * As a result, actor do not care nor know whether the command
 * is coming from the user inputs or AI. This way, hard coding
 * a specific input handling can be avoided for both player and npc.
 */


"use strict";


var Command = {

    /**
     * handle keyboard input from the user and
     * generate a appropriate command.
     */
    handleInput: function() {
        let queue = [];
        if (keyIsDown(LEFT_ARROW)) {
            queue.push(Command.moveLeftCommand()); 
        }
        if (keyIsDown(RIGHT_ARROW)) {
            queue.push(Command.moveRightCommand()); 
        }
        if (keyIsDown(UP_ARROW)) {
            queue.push(Command.moveUpCommand()); 
        }
        if (keyIsDown(DOWN_ARROW)) {
            queue.push(Command.moveDownCommand()); 
        }
        return queue;
    },

    /**
     * Generate a command for npc to wonder.
     *
     * @param npc : npc object that command will be sent to.
     */
    AI_wonder: function(npc) {
        let queue = [];
          
        // generate command to wonder
        if (frameCount % 16 == 0) {
            npc.randNum = random(); 
        }
        if (npc.randNum < TRANSITION_PROB) {
            queue.push(Command.moveLeftCommand());
        }
        else if (npc.randNum < TRANSITION_PROB * 2) {
            queue.push(Command.moveRightCommand());
        }
        else if (npc.randNum < TRANSITION_PROB * 3) {
            queue.push(Command.moveUpCommand());
        }
        else if (npc.randNum < TRANSITION_PROB * 4) {
            queue.push(Command.moveDownCommand());
        }
        return queue; 
    },

    /**
     * Generate a command for npc to chase player.
     *
     * @param npc : npc object that command will be sent to.
     */
    AI_chase: function(npc) {
        let queue = [];
        if (npc.path.length > 0) { 
            // get the direction from the calculated path
            let pos = npc.path[0];
            let posX = pos[0] * TILE_SIZE;
            let posY = pos[1] * TILE_SIZE;
            if (npc.x == posX && npc.y == posY) {
                npc.path.splice(0, 1);
            }

            // generate command to chase player
            if (npc.x - posX > 1) {
                queue.push(Command.moveLeftCommand());
            }
            else if (npc.x - posX < -1)  {
                queue.push(Command.moveRightCommand());
            }
            if (npc.y - posY > 1) {
                queue.push(Command.moveUpCommand());
            }
            else if (npc.y - posY < -1) {
                queue.push(Command.moveDownCommand());
            }
        }
        return queue;
    },

    /**
     * command the actor to move left.
     */
    moveLeftCommand: function() {
        var command = {
            execute: function(actor) {
                actor.inputs[MOVE_LEFT] = true;
            }
        };
        return command;
    },

    /**
     * command the actor to move right.
     */
    moveRightCommand: function() {
        var command = {
            execute: function(actor) {
                actor.inputs[MOVE_RIGHT] = true;
            }
        };
        return command;
    },

    /**
     * command the actor to move up.
     */
    moveUpCommand: function() {
        var command = {
            execute: function(actor) {
                actor.inputs[MOVE_UP] = true;
            }
        };
        return command;
    },

    /**
     * command actor to move down.
     */
    moveDownCommand: function() {
        var command = {
            execute: function(actor) {
                actor.inputs[MOVE_DOWN] = true;
            }
        };
        return command;
    }
};
