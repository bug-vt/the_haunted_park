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
    var noises = [];
    var background = Background();
    var error = 0;
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
        tileMap.rockNoise(noises);
        camera.init(0, 0, MAP_WIDTH, MAP_HEIGHT);
        player.init(720, 700, TILE_SIZE/2, TILE_SIZE/2, PLAYER);
        //player.init(180, 300, TILE_SIZE, TILE_SIZE, PLAYER);
        player.setBullets(gameEntities);
        mapLayout = tileMap.getMapLayout();
        spawnEntities(NUM_OF_NPC, NPC);
        //spawnEntities(1, NPC);
        spawnEntities(NUM_OF_PRIZE, PRIZE);
        background.init(player, backgroundImgs);
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
            let col = floor(random(1, MAP_COLUMN - 1));
            let row = floor(random(1, MAP_ROW - 1));
            if (col > 28 && row > 25) {
                continue;
            }
            if (taken[row][col] != WALL) {
                let posX = col * TILE_SIZE;
                let posY = row * TILE_SIZE;
                if (type === NPC) {
                    entity = Npc();
                    entity.setID((count * 11) % FRAME_RATE);
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
        if (!keyIsDown(77)) {
            let UserCommands = Command.handleInput();
            for (let command of UserCommands) {
                command.execute(player);
            }
        }
        
        for (let entity of gameEntities) {
            if (entity.type === NPC) {
                let AIcommands = entity.state.generateCommands(player, entity, noises);
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
            
            // check if npc is stuck somewhere
            if (entity.type == NPC) {
                if (entity.prevX == entity.x && entity.prevY == entity.y && 
                    entity.path.length > 0) {

                    entity.stuck++;
                    if (entity.stuck > entity.path.length * 4) {
                        entity.path = [];
                    }
                }
            }
        }
        
        if (tileMap.collision(player)) {
            checkGameEnd(WIN);
        }
    }

    /**
     * Remove objects that are no longer exist.
     */
    function collectGarbage() {
        // Delete game entity that no longer exist.
        for (let i = gameEntities.length - 1; i >= 0; i--) {
            if (gameEntities[i].type === GONE || gameEntities[i].type === DEAD) {
                gameEntities.splice(i, 1);
            }
        }
        if (frameCount % FRAME_RATE == 0 && noises.length > 0) {
            noises.splice(0, 1);
        }
    }

    /**
     * Get most up to date state of the game world in current frame.
     */
    function update() {

        background.update();

        for (let entity of gameEntities) {
            entity.update();
        }
        player.update();

        applyPhysics();

        collectGarbage();

        camera.focusOn(player);
        
        checkGameEnd(OVER);
        
    }

    /**
     * Get most up to date image of the game world in current frame.
     * Render using ray casting method.
     */
    function render(force) {
        if (keyIsDown(77) || force) {
            noStroke();
            image(mapImgs[0], 0, 0);
            tileMap.render(camera);
            player.render(camera);

            for (let entity of gameEntities) {
                let squareDist = Math.pow(player.x - entity.x, 2) + 
                                    Math.pow(player.y - entity.y, 2);
                if (squareDist <= ON_SIGHT) {
                    entity.render(camera);
                }
                
                /*     
                 * Astar path for debugging
                 */
                /* 
                if (entity.type == NPC) {
                    for (let path of entity.path) {
                        push();
                        fill(255, 0, 0, 70);
                        rect(path[0] * 20 - camera.x, path[1] * 20 - camera.y, 20, 20);
                        pop();
                    }
                }*/
            }
            for (noise of noises) {
                noise.render(camera);
            }
            let renderX = -HALF_CANVAS_WIDTH + player.width / 2; 
            let renderY = -HALF_CANVAS_HEIGHT + player.height / 2; 
            image(sightImgs[1], renderX, renderY);
            image(mapImgs[1], 0, 0);
        }
        else {
            background.render();
            image(groundImg, 0, 200);
            RayCast(player, gameEntities);
            image(sightImgs[0],0,0);
            displayGuide();
        }
        showScore();    
    }
    
    function displayGuide() {
        push();
        fill(255);
        textSize(DEFAULT_TEXT_SIZE);
        text("Press M to see world map", 250, 20);
        if (error == NOT_ENOUGH_KEYS) {
            text("Collect " + NUM_OF_PRIZE + " keys to unlock the door.", 275, 200); 
            error = 0;
        }
        pop();
    }
    /**
     * Display current score on the top right corner.
     */
    function showScore() {
        push();
        fill(255);
        textSize(DEFAULT_TEXT_SIZE);
        image(instructionImgs[1], 470, 5, 25, 25);
        text(" x " + floor(score), 515, 20);
        pop();
    }

    /**
     * Check if end condition of the game have reached.
     * 1. all the keys have been collected.
     * 2. player made contact with any of the NPCs.
     */
    function checkGameEnd(option) {
        if (option == WIN) {
            if (score === NUM_OF_PRIZE) {
                currentState = gameStates.result();
                currentState.init(WIN);
            }
            else {
                error = NOT_ENOUGH_KEYS;
            }
        }
        else {
            if (option == OVER && player.isAlive === false) {
                if (player.caughtOffGaurd) {
                    render(true);
                }
                currentState = gameStates.result();
                currentState.init(OVER);
            }
        }
    }

    var publicAPI = {
        handleInput: handleInput,
        update: update,
        render: render
    };

    return publicAPI;
}



