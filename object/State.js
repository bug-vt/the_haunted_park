/**
 * State.js
 * Author: Bug Lee
 * Last modified: 11/12/21
 *
 * This module contains data structure for State.
 * State determine the behavior of the actor and
 * change to different state base on the inputs
 * from the actor. Following are the available states
 * for the actor:
 *
 * 1. Wondering 
 * 2. Chasing (Coming soon)
 */


"use strict";

/**
 * Wondering state
 *
 */
function Wondering() {
    var state = {
        generateCommands: function(player, npc, noises) {
            let squareDist = Math.pow(player.x - npc.x, 2) + Math.pow(player.y - npc.y, 2);
            let heading = createVector(-npc.direction[0], -npc.direction[1], 0);
            let target = createVector(player.x - npc.x, player.y - npc.y, 0);
            let targetAngle = heading.angleBetween(target) * 180 / PI;
            if (squareDist < ON_SIGHT && abs(targetAngle) < 40) {
                npc.state = Chasing();
            }
            if (npc.path.length > 0) {
                return Command.AI_chase(npc);
            }
            for (noise of noises) {
                let noiseDist = Math.pow(noise.x - npc.x, 2) + Math.pow(noise.y - npc.y, 2);
                if (noiseDist < ON_SIGHT) {
                    npc.path = Astar().search(noise, npc);
                    npc.path.splice(0,1);
                    npc.stuck = 0;
                    break;
                }
            }
            return Command.AI_wonder(npc);
        }
    };
    return state;
}


/**
 * Chasing state
 * Actor calcuate shortest path to the destination using Astar serach.
 */
function Chasing() {
    var state = {
        generateCommands: function(player, npc, noises) {
            let squareDist = Math.pow(player.x - npc.x, 2) + Math.pow(player.y - npc.y, 2);
            if (squareDist > ON_SIGHT) {
                npc.state = Wondering();
            }
            if (frameCount % FRAME_RATE == npc.id) {
                npc.path = Astar().search(player, npc);
                if (npc.stuck < npc.path.length * 2) {
                    npc.path.splice(0,1);
                }
                npc.stuck = 0;
            }
            return Command.AI_chase(npc);
        }
    };
    return state;
}

