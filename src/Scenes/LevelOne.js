import Player from '../prefabs/Player.js';

export default class LevelOne extends Phaser.Scene {
    constructor() {
        super('LevelOne');
    }
    init(){
        this.SCALE = 1;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        
        //Player assets load
        this.load.spritesheet('cat', 'Cat_85_Animations/Cat_Grey_White.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    

    create() {
        //create player anims
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 4 }), // Adjust as needed
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 4 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 4 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'crouch',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 4 }),
            frameRate: 1,
            repeat: -1
        });
        //const cat = this.add.sprite(100, 100, 'cat');


        let my = this.my

        this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        this.map = this.add.tilemap("platformer-level-1", 16, 16, 40, 30);

        this.tileset = this.map.addTilesetImage("AssetSheet_Green", "platformer_tiles");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
        this.grappleLayer = this.map.createLayer("Grapple_Stuff", this.tileset, 0, 0);

        
        
        let spawnPoint = this.map.findObject("Objects", obj => obj.name === "spawn");
        let playerSpawnX = 100; 
        let playerSpawnY = 600; 
        
        if (spawnPoint) {
            playerSpawnX = spawnPoint.x;
            playerSpawnY = spawnPoint.y;
        }
        this.player = new Player(this, spawnPoint.x, spawnPoint.y, this.SCALE);//This line spawns a new "Prefab" of the player here;
        
       
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        this.physics.add.collider(this.player, this.groundLayer);

    }

    update() {
        //The update method in the prefab is it's own scene update()
        //So we have to call the player update func in here
        this.player.update(this.grappleLayer, null, null, null); 
    }
}
