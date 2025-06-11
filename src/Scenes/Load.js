

export default class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");
        // Load characters spritesheet
        // this.load.atlas("platformer_characters", "monoChromeCharacter_packed.png", "monoChromeCharacter_packed.json");

        // Load tilemap information
        this.load.image("platformer_tiles", "AssetSheet_Green.png");

        this.load.tilemapTiledJSON("platformer-level-1", "Green_Level.json");   // Tilemap in JSON

    }

    create() {
       // add the animations here?

       this.scene.start("LevelOne");
    }
}