import Player from '../prefabs/Player.js';

export default class LevelOne extends Phaser.Scene {
    constructor() {
        super('LevelOne');
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        // this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        
        //this.load.image("tilemap_tiles", "tilemap_packed.png");
    }

    create() {
        let my = this.my

        this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        this.map = this.add.tilemap("platformer-level-1", 16, 16, 180, 60);

        this.tileset = this.map.addTilesetImage("monoChrome_tiles_packed", "platformer_tiles");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);


        this.player = new Player(this, 100, 200); //This line spawns a new "Prefab" of the player here;

    }

    update() {
        //The update method in the prefab is it's own scene update()
        //So we have to call the player update func in here
        this.player.update(null, null, null, null); 
}
}
