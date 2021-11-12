/**
 * Characters.js
 * Author: Bug Lee
 * Last modified: 11/4/21
 *
 * This module contain data structures for player and Npc.
 * Player and Npc are special type of Actors that accept
 * commands and act according to their state.
 * See Command.js, Actor.js, and State.js for more detail.
 */


"use strict";



function Player() {
    
    var player = Object.create(Actor);
    player.setImg(pacmanImg);
    player.setSpeed(PLAYER_SPD);

    return player;
} 


function Npc() {
    var npc = Object.create(Actor);
    npc.setImg(enemyImg);
    npc.setSpeed(NPC_SPD);
    npc.state = Wondering();
    npc.path = [];
    npc.setID = function(id) {
        this.id = id;
    };
 

    return npc;
}
