export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super("CreditsScene");
    }
    create() {

    this.add.text(280, 75, "Credits!", {
        font: 'bold 35px Arial',
        fill: "#ffffff"
    });

    this.add.text(200, 100, "\n\nBenjamin Nguyen\nJoseph Dadlez\nHank Liu", {
        font: 'bold 35px Arial',
        fill: "#ffffff"
    });

    const backButton = this.add.text(280, 350, "Back", {
        font: "bold 30px Arial",
        fill: "#000000",
        backgroundColor: "#ffffff",
        padding: { x: 10, y: 5 }
    });

    backButton.setInteractive({ useHandCursor: true });
    backButton.on("pointerdown", () => {
        this.scene.start("StartScreen");
    });
    }
}