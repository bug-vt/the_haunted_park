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
        generateCommands: function(player, npc) {
            let squareDist = Math.pow(player.x - npc.x, 2) + Math.pow(player.y - npc.y, 2);
            /*
            if (squareDist < ON_SIGHT) {
                npc.state = Chasing();
                return [];
            } */
            if (npc.path.length > 0) {
                return Command.AI_chase(player, npc);
            }
            return Command.AI_wonder(player, npc);
        }
    };
    return state;
}


/**
 * Chasing state (Not completed yet.)
 * Actor calcuate shortest path to the destination using Astar serach.
 */
function Chasing() {
    var state = {
        generateCommands: function(player, npc) {
            let squareDist = Math.pow(player.x - npc.x, 2) + Math.pow(player.y - npc.y, 2);
            let heading;
            if (squareDist > ON_SIGHT) {
                npc.state = Wondering();
                return [];
            }
            if (frameCount % FRAME_RATE == npc.id) {
                npc.path = Astar().search(player, npc);
            }
            return Command.AI_chase(player, npc);
        }
    };
    return state;
}

