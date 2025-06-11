import Player from '../prefabs/Player.js';

export default class LevelOne extends Phaser.Scene {
    constructor() {
        super('LevelOne');
    }
    init(){
        this.SCALE = 0.5;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        
        
    }

    create() {
        let my = this.my

        this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        this.map = this.add.tilemap("platformer-level-1", 16, 16, 180, 60);

        this.tileset = this.map.addTilesetImage("AssetSheet_Green", "platformer_tiles");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);

        
        
        let spawnPoint = this.map.findObject("Objects", obj => obj.name === "spawn");
        let playerSpawnX = 100; 
        let playerSpawnY = 600; 
        
        if (spawnPoint) {
            playerSpawnX = spawnPoint.x;
            playerSpawnY = spawnPoint.y;
        }
        this.player = new Player(this, spawnPoint.x, spawnPoint.y).setScale(this.SCALE); //This line spawns a new "Prefab" of the player here;
       
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        this.physics.add.collider(this.player, this.groundLayer);
    }

    update() {
        //The update method in the prefab is it's own scene update()
        //So we have to call the player update func in here
        this.player.update(null, null, null, null); 
    }
}
