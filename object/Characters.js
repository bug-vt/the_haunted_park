/**
 * Characters.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contain data structures for player and Npc.
 * Player and Npc are special type of Actors that accept
 * commands and act according to their state.
 * See Command.js, Actor.js, and State.js for more detail.
 */


"use strict";



function Player() {
    
    var player = Object.create(Actor);
    player.setSpeed(PLAYER_SPD);
    player.setDirection([-1, 0]);
    //player.state = Standing(player);
    player.plane = [0, 0.66];
    

    return player;
} 


function Npc() {

    var npc = Object.create(Actor);
    npc.setSpeed(NPC_SPD);
    npc.setDirection([0, -1]);
    npc.state = Wondering();
    npc.path = [];
    npc.setID = function(id) {
        this.id = id;
    };
 

    return npc;
}
