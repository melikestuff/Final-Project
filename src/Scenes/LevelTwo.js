import Player from '../prefabs/Player.js';

export default class LevelTwo extends Phaser.Scene {
    constructor() {
        super('LevelTwo');
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        //this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        this.load.image("pink_tiles", "AssetSheet_Pink.png");
        this.load.tilemapTiledJSON("platformer-level-2", "levelTwo.tmj"); 
        
    }

    create() {
        //Add background into game
        const bg = this.add.image(0, 0, "background").setOrigin(0, 0);
        bg.setDisplaySize(1000, this.sys.game.config.height);

        let my = this.my
        this.player = new Player(this, 100, 200); //This line spawns a new "Prefab" of the player here;
        this.player.scale = 0.75;
        this.player.setDepth(1);
        this.map = this.add.tilemap("platformer-level-2", 16, 16, 40, 30);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.tileset = this.map.addTilesetImage("pink map", "pink map");
        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        this.physics.add.collider(this.player, this.groundLayer);
        
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(2);
    }

    update() {
        //The update method in the prefab is it's own scene update()
        //So we have to call the player update func in here
        this.player.update(this.groundLayer, null, null, null); 
}
}