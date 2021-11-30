/**
 * GameWorld.js
 * Author: Bug Lee
 * Last modified: 11/12/21
 *
 * This module contain GameWorld data structure.
 * Game world contains tile map, game entities (npc and prize), player,
 * camera, and dust effects (special effects).
 */

"use strict";


function GameWorld() {
    score = 0;
    var camera = Object.create(Camera);
    var tileMap = TileMap();
    var gameEntities = [];
    var player = Player(); 
    init(); 

    /*
     * Initialize the game world with 
     * 1. player
     * 2. 400x400 tile map
     * 3. 5 NPCs
     * 4. 3 Prizes 
     *
     * Also, give camera focus to player.
     */
    function init() {
        tileMap.init(); 
        camera.init(0, 0, MAP_WIDTH, MAP_HEIGHT);
        player.init(320, 200, TILE_SIZE, TILE_SIZE, PLAYER);
        player.setBullets(gameEntities);
        mapLayout = tileMap.getMapLayout();
        spawnEntities(NUM_OF_NPC, NPC);
        //spawnEntities(1, NPC);
        spawnEntities(NUM_OF_PRIZE, PRIZE);
    }
   
    /**
     * Spawn the given number of entities to the game world
     * @param number: number of entities to be spawn.
     * @param type: entity type (NPC or prize).
     */
    function spawnEntities(number, type) {
        let taken = tileMap.getMapLayout();
        let count = 0;
        let entity;
        while (count < number) {
            let col = floor(random(1, MAP_COLUMN - 12));
            let row = floor(random(1, MAP_ROW - 1));
            if (taken[row][col] != WALL) {
                let posX = col * TILE_SIZE;
                let posY = row * TILE_SIZE;
                if (type === NPC) {
                    entity = Npc();
                    entity.setID(count * 10);
                }
                else {
                    entity = Object.create(Prize);
                    entity.setImg([instructionImgs[1], instructionImgs[1]]);
                }
                entity.init(posX, posY, TILE_SIZE, TILE_SIZE, type);
                gameEntities.push(entity);
                taken[row][col] = type;
                count++;
            }
        }
    }

    /**
     * Create commands for the actors inside the world.
     * User inputs will be directed to the player and
     * AI inputs will be directed to the npc.
     */
    function handleInput() {
        let UserCommands = Command.handleInput();
        for (let command of UserCommands) {
            command.execute(player);
        }
        
        for (let entity of gameEntities) {
            if (entity.type === NPC) {
                let AIcommands = entity.state.generateCommands(player, entity);
                for (let command of AIcommands) {
                    command.execute(entity);
                }
            }
        }
    }

    /**
     * Check collision between objects.
     */
    function applyPhysics() {
        for (let entity of gameEntities) {
            tileMap.collision(entity);
            player.checkCollision(entity);
        }
        
        tileMap.collision(player);
    }

    /**
     * Remove objects that are no longer exist.
     */
    function collectGarbage() {
        // Delete game entity that no longer exist.
        for (let i = gameEntities.length - 1; i >= 0; i--) {
            if (gameEntities[i].type === GONE || gameEntities[i].type === DEAD) {
                //gameEntities[i].spawnDust(dusts, B_DUST);
                gameEntities.splice(i, 1);
            }
        }
    }

    /**
     * Get most up to date state of the game world in current frame.
     */
    function update() {

        for (let entity of gameEntities) {
            entity.update();
        }
        player.update();

        applyPhysics();

        collectGarbage();

        camera.focusOn(player);
        
        checkGameEnd();
        
    }

    /**
     * Get most up to date image of the game world in current frame.
     * Render using ray casting method.
     */
    function render() {
        image(background, 0, 0);
        RayCast(player, gameEntities);
        //image(lightImg,0,0);

        if (true || keyIsDown(77)) {
            noStroke();
            tileMap.render(camera);

            for (let entity of gameEntities) {
                entity.render(camera);
                
                /*     
                 * Astar path for debugging
                 */
                if (entity.type == NPC) {
                    for (let path of entity.path) {
                        push();
                        fill(255, 0, 0, 70);
                        rect(path[0] * 20, path[1] * 20, 20, 20);
                        pop();
                    }
                }
            }
            player.render(camera);
        }

        showScore();    
    }

    /**
     * Display current score on the top right corner.
     */
    function showScore() {
        push();
        noStroke();
        fill(255, 255, 255, 140);
        //rect(300, 0, 100, 40);
        textSize(DEFAULT_TEXT_SIZE);
        fill(255);
        text("Score: " + floor(score), 500, 20);
        text("Press M to see world map", 250, 20);
        pop();
    }

    /**
     * Check if end condition of the game have reached.
     * 1. all the keys have been collected.
     * 2. player made contact with any of the NPCs.
     */
    function checkGameEnd() {
        if (score === NUM_OF_PRIZE) {
            currentState = gameStates.result();
            currentState.init(WIN);
        }
        else if (player.isAlive === false) {
            currentState = gameStates.result();
            currentState.init(OVER);
        }
    }

    var publicAPI = {
        handleInput: handleInput,
        update: update,
        render: render
    };

    return publicAPI;
}



