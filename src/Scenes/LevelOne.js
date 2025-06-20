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
        //index element
        document.getElementById('description').innerHTML = '<h2>Cat game</h2><br> Arrow keys to move // Mouse hover over pipes to gravitate towards them // space to dash //R to reset';
        //Add background into game
        const bg = this.add.image(0, 0, "background").setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width + 800, this.sys.game.config.height);

        let my = this.my

        this.map = this.add.tilemap("platformer-level-1", 16, 16, 40, 30);

        this.tileset = this.map.addTilesetImage("AssetSheet_Green", "platformer_tiles");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
        this.grappleLayer = this.map.createLayer("Grapple_Stuff", this.tileset, 0, 0);
        this.bgLayer = this.map.createLayer("background", this.tileset, 0, 0);

        
        
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
        this.finish = this.map.createFromObjects("finish", {
            name: "finish",
            key: "tilemap_green",
            frame: 3
        });
        console.log(this.finish);
        this.physics.world.enable(this.finish, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.add.overlap(this.player, this.finish, (obj1, obj2) => {
            console.log("reached finish");
            this.scene.start('Start');
        });
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(2);
    }

    update() {
        //The update method in the prefab is it's own scene update()
        //So we have to call the player update func in here
        this.player.update(this.grappleLayer, null, null, null); 
    }
}
