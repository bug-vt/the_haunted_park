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
    generateCommand4AI: function(player, npc) {
        let avoid = false;
        let queue = [];
        let squareDist = Math.pow(player.x - npc.x, 2) + Math.pow(player.y - npc.y, 2);
        let currAngle = atan2(npc.direction[0][1], npc.direction[0][0]);
        let goalAngle = atan2(npc.y - player.y, npc.x - player.x);

        // find angle to evade bullets
        for (let bullet of player.bullets) {
            let bulletDist = pow(npc.x - bullet.x, 2) + pow(npc.y - bullet.y, 2);
            if (bulletDist < ON_SIGHT)
            {
                let lookout = 0.5;
                if (bulletDist <= TOO_CLOSE) {
                    lookout = 2; 
                }
                let bulletAngle = atan2(bullet.vector[1], bullet.vector[0]);
                let hitAngle = atan2(npc.y + 10 - bullet.y, npc.x + 10 - bullet.x);
                
                if ((bulletAngle > 0 && hitAngle > 0) || (bulletAngle < 0 && hitAngle < 0)) {
                    if (abs(hitAngle - bulletAngle) < AVOID_ANGLE * lookout) {
                        if (hitAngle - bulletAngle < 0) {
                            goalAngle = bulletAngle + AVOID_ANGLE * npc.safeDist;
                        }
                        else {
                            goalAngle = bulletAngle - AVOID_ANGLE * npc.safeDist;
                        }
                        avoid = true;
                    }
                }
                else {
                    if (abs(abs(hitAngle) - abs(bulletAngle)) < AVOID_ANGLE / 2 * lookout) {
                        if (bulletAngle < 0) {
                            if (bullet.vector[0] < 0) {
                                goalAngle = (bulletAngle + AVOID_ANGLE) * npc.safeDist;
                            }
                            else {
                                goalAngle = (bulletAngle - AVOID_ANGLE) * npc.safeDist;
                            }
                        }
                        else {
                            if (npc.x + 10 - bullet.x < 0) {
                                goalAngle = (bulletAngle - AVOID_ANGLE) * npc.safeDist;
                            }
                            else {
                                goalAngle = (bulletAngle + AVOID_ANGLE) * npc.safeDist;
                            }
                        }
                        avoid = true;
                    }
                }
            }
        }

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
        
        if (avoid) {
            if (npc.safeDist === FAR) {
                queue.push(Command.forwardCommand());
                if (squareDist < TOO_CLOSE) {
                    npc.safeDist = CLOSE;
                }
            }
            else {
                queue.push(Command.backwardCommand());
                if (squareDist > TOO_FAR) {
                    npc.safeDist = FAR;
                }
            }
        }
        // generate command to chase player
        else if (squareDist > ON_SIGHT && queue.length == 0) {
            queue.push(Command.forwardCommand());
        }
        // generate command to attack 
        else if (squareDist <= ON_SIGHT && queue.length == 0) { 
            queue.push(Command.attackCommand());
        }
        return queue; 
    },

    /**
     * command actor to turn left.
     */
    turnLeftCommand: function() {
        var command = {
            execute: function(actor) {
                actor.rotate(-TURN_RATE);
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
                actor.rotate(TURN_RATE);
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
