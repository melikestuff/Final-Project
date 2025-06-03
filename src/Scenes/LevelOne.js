class LevelOne extends Phaser.Scene {


    // Use preload to load art and sound assets before the scene starts running.
    preload() {

    }

    create() {
        this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

    }

    update() {
}
}