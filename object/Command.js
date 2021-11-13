/**
 * Command.js
 * Author: Bug Lee
 * Last modified: 10/11/21
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
        if (keyIsDown(UP_ARROW)) {
            queue.push(Command.forwardCommand());
        }
        if (keyIsDown(DOWN_ARROW)) {
            queue.push(Command.backwardCommand());
        }
        if (keyIsDown(LEFT_ARROW)) {
            queue.push(Command.turnLeftCommand());
        }
        if (keyIsDown(RIGHT_ARROW)) {
            queue.push(Command.turnRightCommand());
        }
        if (keyIsDown(SPACE_BAR)) {
            queue.push(Command.attackCommand());
        }
        return queue;
    },

    /**
     * Generate a command for npc.
     *
     * @param player : player object.
     * @param npc : npc object that command will be sent to.
     */
    AI_wonder: function(player, npc) {
        let queue = [];
        
        if (performance.now() - npc.timeCheck > HALF_SEC) {
            npc.randNum = random();
            npc.timeCheck = performance.now();
        }

        if (npc.randNum < 0.25) {
            queue.push(Command.turnRightCommand());
        }
        else if (npc.randNum < 0.5) {
            queue.push(Command.turnRightCommand());
        }
        else if (npc.randNum < 0.75) {
            queue.push(Command.forwardCommand());
        }

        return queue; 
    },

    /**
     * Generate a command for npc to chase player.
     *
     * @param npc : npc object that command will be sent to.
     */
    AI_chase: function(player, npc) {
        let queue = [];
        let currAngle = atan2(npc.direction[1], npc.direction[0]);
        let goalAngle = atan2(npc.y - player.y, npc.x - player.x);

        // generate command to turn (for chasing player or evading bullets)
        if ((goalAngle > 0 && currAngle > 0) || (goalAngle < 0 && currAngle < 0)) {
            if (currAngle - goalAngle > SMALL_ANGLE) {
                queue.push(Command.turnRightCommand());
            }
            else if (currAngle - goalAngle < -SMALL_ANGLE) {
                queue.push(Command.turnLeftCommand());
            }
        }
        else {
            if (currAngle < 0) {
                currAngle += PI;
            }
            if (goalAngle < 0) {
                goalAngle += PI;
            }
            if (currAngle - goalAngle > SMALL_ANGLE) {
                queue.push(Command.turnLeftCommand());
            }
            else if (currAngle - goalAngle < -SMALL_ANGLE) {
                queue.push(Command.turnRightCommand());
            }
        }
        
        // generate command to chase player
        if (queue.length == 0) {
            queue.push(Command.forwardCommand());
        }

        return queue; 
    },

    /**
     * command actor to turn left.
     */
    turnLeftCommand: function() {
        var command = {
            execute: function(actor) {
                actor.inputs[TURN_LEFT] = true;
            }
        };
        return command;
    },

    /**
     * command actor to turn right.
     */
    turnRightCommand: function() {
        var command = {
            execute: function(actor) {
                actor.inputs[TURN_RIGHT] = true;
            }
        };
        return command;
    },
            
    /**
     * command actor to move forward.
     */
    forwardCommand: function() {
        var command = {
            execute: function(actor) {
                actor.inputs[FORWARD] = true;
            }
        };
        return command;
    },

    /**
     * command actor to move backward.
     */
    backwardCommand: function() {
        var command = {
            execute: function(actor) {
                actor.inputs[BACKWARD] = true;
            }
        };
        return command;
    },

    /**
     * command actor to attack.
     */
    attackCommand: function() {
        var command = {
            execute: function(actor) {
                actor.spawnBullet();
            }
        };
        return command;
    }
};
