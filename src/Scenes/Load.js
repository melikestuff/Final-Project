class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");
        // Load characters spritesheet
        // Load tilemap information
        this.load.image("yellow_tiles", "AssetSheet_Yellow.png");
        this.load.tilemapTiledJSON("platformer-level-3", "level-3.tmj"); 

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_yellow", "AssetSheet_Yellow.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {

         this.scene.start("LevelThree");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}
export default Load;