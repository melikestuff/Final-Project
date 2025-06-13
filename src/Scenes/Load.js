

export default class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");
        // Load characters spritesheet
        // this.load.atlas("platformer_characters", "monoChromeCharacter_packed.png", "monoChromeCharacter_packed.json");

        this.load.image("background", "FloatingIslands_Assets/ParalaxBackground/BackgroundGradient_Purple.png");

        // Load tilemap information
        this.load.image("platformer_tiles", "AssetSheet_Green.png");
        this.load.image("yellow_tiles", "AssetSheet_Yellow.png");

        this.load.tilemapTiledJSON("platformer-level-1", "Green_Level.json");   // Tilemap in JSON

        this.load.spritesheet("tilemap_yellow", "AssetSheet_Yellow.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('cat', 'Cat_85_Animations/Cat_Grey_White.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
       // add the animations here?
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('cat', { start: 60, end: 64 }), // Adjust as needed
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
            frames: this.anims.generateFrameNumbers('cat', { start: 200, end: 200 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'crouch',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 4 }),
            frameRate: 1,
            repeat: -1
        });

       this.scene.start("Start");
    }
}