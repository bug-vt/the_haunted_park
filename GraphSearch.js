/**
 * GraphSearch.js
 *
 * Author : Bug Lee
 * Last modified : 11/4/21
 *
 * This module contains data structure for one of the well known graph search,
 * A star serach.
 * 
 * This version of A* search was adapted from Nicholas Swift's blog post.
 * https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2
 */


"use strict";


function Astar() {
    var Node = {
        init: function(parentN, pos) {
            this.parentN = parentN; // parent node
            this.pos = pos; // x, y position of the node 
            this.g = 0; // exact cost from the starting node
            this.h = 0; // estimated cost from the node to goal node
            this.f = 0; // cost function to find lowest cost in the neighboring node
        }
    };

    /**
     * Check if the given two node are same.
     * @param node : node that is being checked
     * @param other : referencing node 
     */
    function sameNode(node, other) {
        if (node.pos[0] == other.pos[0] && node.pos[1] == other.pos[1]) {
            return true;
        }
        return false;
    }

    /**
     * Get the path from starting node to current node.
     * @param curr_node : current node
     * @return list containing path from start to current node. 
     */
    function getPath(curr_node) {
        let path = [];
        let current = curr_node;

        while (current != undefined) {
            path.push(current.pos);
            current = current.parentN;
        }

        return path.reverse();

    }

    /**
     * Find the shortest path from current npc position to player.
     * @param player : player
     * @param npc : current npc
     * @return shortest path starting from current npc position to player
     */
    function search(player, npc) {
        let npcPos = [floor(npc.x / TILE_SIZE), floor(npc.y / TILE_SIZE)];
        let playerPos = [floor(player.x / TILE_SIZE), floor(player.y / TILE_SIZE)];

        let start = Object.create(Node);
        start.init(undefined, npcPos);

        let end = Object.create(Node);
        end.init(undefined, playerPos);

        let queue = [];
        let visited = [];

        queue.push(start); // initialize queue with start node

        let loop_count = 0;
        let max_loop = 2000;

        let moves = [[-1, 0],    // left
                     [1, 0],     // right
                     [0, -1],    // up
                     [0, 1]];    // down

        while (queue.length > 0) {
            loop_count++;

            let curr_node = queue[0];
            let curr_index = 0;
            // select current lowest cost from the queue
            // which is differ from breath first search
            for (let i = 1; i < queue.length; i++) {
                if (queue[i].f < curr_node.f) {
                    curr_node = queue[i];
                    curr_index = i; 
                }
            }
            
            if (loop_count > max_loop) {
                print("Unable to find path within the loop limit");
                return getPath(curr_node);
            }
            
            // dequeue 
            queue.splice(curr_index, 1);
            visited.push(curr_node);

            if (sameNode(curr_node, end)) {
                return getPath(curr_node);
            }

            let children = [];

            for (let move of moves) {
                let node_pos = [curr_node.pos[0] + move[0], 
                                curr_node.pos[1] + move[1]];
                
                // outside the map
                if (node_pos[0] < 0 || node_pos[0] >= MAP_COLUMN ||
                    node_pos[1] < 0 || node_pos[1] >= MAP_ROW) {
                    continue;
                }
                
                // no path (wall)
                if (mapLayout[node_pos[1]][node_pos[0]] == WALL) {
                    continue;
                }

                let new_node = Object.create(Node); 
                new_node.init(curr_node, node_pos);

                children.push(new_node);
            }

            for (let child of children) {
                let already_visited = false;
                for (let node of visited) {
                    if (sameNode(node, child)) {
                        already_visited = true; 
                        break;
                    }
                }
                if (already_visited) {
                    continue;
                }
                
                // exact cost from the starting node
                child.g = curr_node.g + 1;
                // Manhattan distance estimation
                child.h = abs(child.pos[0] - end.pos[0]) + abs(child.pos[1] - end.pos[1]);
                // cost function for A*
                child.f = child.g + child.h;
                
                // update path inside the queue if necessary
                for (let i = 0; i < queue.length; i++) {
                    if (sameNode(queue[i], child) && queue[i].g >= child.g) {
                        queue.splice(i, 1);
                        break;
                    }
                }

                queue.push(child);
            }
        }
    }


    var publicAPI = {
        search: search
    };

    return publicAPI;
}


