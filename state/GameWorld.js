/**
 * GameWorld.js
 * Author: Bug Lee
 * Last modified: 10/11/21
 *
 * This module contain GameWorld data structure.
 * Game world contains tile map, game entities (npc), player,
 * camera, bullets, and dust effects (explotion effects).
 */

"use strict";


function GameWorld() {
    score = 0;
    var camera = Object.create(Camera);
    var tileMap = TileMap();
    var gameEntities = [];
    var player = Player(); 
    var bullets = [];
    var dusts = [];
    init(); 

    /*
     * Initialize the game world with 
     * 1. player
     * 2. 400x400 tile map
     * 3. 5 NPCs
     *
     * Also, give camera focus to player.
     */
    function init() {
        camera.init(20, 20, MAP_WIDTH - TILE_SIZE, MAP_HEIGHT - TILE_SIZE);
        player.init(360, 200, TILE_SIZE - 2, TILE_SIZE - 2, PLAYER);
        player.setBullets(bullets);
        player.setEffect(dusts);
        tileMap.init(); 
        spawnEntities(NUM_OF_NPC, NPC);

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
            if (taken[row][col] === GROUND) {
                let posX = col * TILE_SIZE;
                let posY = row * TILE_SIZE;
                if (type === NPC) {
                    entity = Npc();
                    entity.setBullets(bullets);
                    entity.setEffect(dusts);
                }
                else {
                    entity = Object.create(Prize);
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
        player.inputs = [false, false];
        let UserCommands = Command.handleInput();
        for (let command of UserCommands) {
            command.execute(player);
        }

        for (let entity of gameEntities) {
            if (entity.type === NPC) {
                entity.inputs = [false, false]; 
                let AIcommands = Command.generateCommand4AI(player, entity);
                for (let command of AIcommands) {
                    command.execute(entity);
                }
            }
        }
    }

    /**
     * Apply gravity and check collision between objects.
     */
    function applyPhysics() {

        for (let bullet of bullets) {
            bullet.update();
            tileMap.collision(bullet);
            player.checkCollision(bullet);
            for (let entity of gameEntities) {
                entity.checkCollision(bullet);
            }
        }
        for (let entity of gameEntities) {
            tileMap.collision(entity);
            player.checkCollision(entity);
        }
        for (let i = 0; i < gameEntities.length; i++) {
            for (let j = 0; j < gameEntities.length; j++) {
                if (i == j) {
                    continue;
                }
                gameEntities[i].checkCollision(gameEntities[j]);
            }
            gameEntities[i].checkCollision(player);
        }
        
        tileMap.collision(player);
    }

    /**
     * Remove objects that are no longer exist.
     */
    function collectGarbage() {
        // Delete game entity that no longer exist.
        for (let i = gameEntities.length - 1; i >= 0; i--) {
            if (gameEntities[i].type === GONE) {
                gameEntities[i].spawnDust(dusts, B_DUST);
                gameEntities.splice(i, 1);
            }
        }
        // Delete bullet that no longer exist.
        for (let i = bullets.length - 1; i >= 0; i--) {
            if (bullets[i].type === DEAD) {
                bullets[i].spawnDust(dusts, G_DUST);
                bullets.splice(i, 1);
            }
        }
        // Delete dust effect that no longer exist.
        for (let i = dusts.length - 1; i >= 0; i--) {
            if (dusts[i].type === DEAD) {
                dusts.splice(i, 1);
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

        for (let dust of dusts) {
            dust.update();
        }

        applyPhysics();

        collectGarbage();

        camera.focusOn(player);
        
        checkGameEnd();
        
    }

    /**
     * Get most up to date image of the game world in current frame.
     */
    function render() {
        tileMap.render(camera);

        for (let bullet of bullets) {
            bullet.render(camera);
        }
        for (let entity of gameEntities) {
            entity.render(camera);
        }
        player.render(camera);

        for (let dust of dusts) {
            dust.render(camera);
        }
        showScore();    
    }

    /**
     * Display current score on the top right corner.
     */
    function showScore() {
        push();
        fill(255, 255, 255, 120);
        rect(300, 0, 100, 40);
        textSize(DEFAULT_TEXT_SIZE);
        fill(0);
        text("Score: " + floor(score), 350, 20);
        pop();
    }

    /**
     * Check if end condition of the game have reached.
     * 1. all the enemies have been destroyed.
     * 2. player made contact with any of the bullets.
     */
    function checkGameEnd() {
        if (score === NUM_OF_NPC) {
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
        





                    


