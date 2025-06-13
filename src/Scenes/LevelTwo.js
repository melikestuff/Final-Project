import Player from '../prefabs/Player.js';

export default class LevelThree extends Phaser.Scene {
    constructor() {
        super('LevelTwo');
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        //this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        this.load.image("yellow_tiles", "AssetSheet_Yellow.png");
        this.load.tilemapTiledJSON("platformer-level-2", "levelTwo.tmj"); 
        
    }

    create() {
        let my = this.my
        this.player = new Player(this, 100, 200); //This line spawns a new "Prefab" of the player here;
        this.player.scale = 0.75;
        this.player.setDepth(1);
        this.map = this.add.tilemap("platformer-level-2", 16, 16, 40, 30);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.tileset = this.map.addTilesetImage("AssetSheet_Yellow", "tilemap_yellow");
        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        
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