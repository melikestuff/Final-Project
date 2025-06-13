export default class StartScreen extends Phaser.Scene {
    constructor() {
        super("Start");
    }

    preload() {

    }

    create() {
        //TItle
        this.add.text(250, 75, `Cat Stuff`, { fill: '#f0ff39', font: 'bold 40px Arial'});

        //Level One
        const button = this.add.text(100, 200, "Level One", {
            font: 'bold 35px Arial',
            fill: "#000000",
            backgroundColor: "#ffffff",
            
            padding: { x: 10, y: 5 }
        });

        // Make it interactive
        button.setInteractive({ useHandCursor: true });
        // Hover effects
        button.on("pointerover", () => button.setStyle({ fill: "#ffff00" }));
        button.on("pointerout", () => button.setStyle({ fill: "#00ff00" }));
        // Click handler
        button.on("pointerdown", () => {
            this.scene.start("LevelOne");
        });

        //Level two
        const buttonTwo = this.add.text(250, 200, "Level Two", {
            font: 'bold 35px Arial',
            fill: "#000000",
            backgroundColor: "#ffffff",
            
            padding: { x: 10, y: 5 }
        });

        // Make it interactive
        buttonTwo.setInteractive({ useHandCursor: true });
        // Hover effects
        buttonTwo.on("pointerover", () => button.setStyle({ fill: "#ffff00" }));
        buttonTwo.on("pointerout", () => button.setStyle({ fill: "#00ff00" }));
        // Click handler
        buttonTwo.on("pointerdown", () => {
            this.scene.start("LevelTwo");
        });

        //Level Three
        const buttonThree = this.add.text(400, 200, "Level Three", {
            font: 'bold 35px Arial',
            fill: "#000000",
            backgroundColor: "#ffffff",
            
            padding: { x: 10, y: 5 }
        });

        // Make it interactive
        buttonThree.setInteractive({ useHandCursor: true });
        // Hover effects
        buttonThree.on("pointerover", () => button.setStyle({ fill: "#ffff00" }));
        buttonThree.on("pointerout", () => button.setStyle({ fill: "#00ff00" }));
        // Click handler
        buttonThree.on("pointerdown", () => {
            this.scene.start("buttonThree");
        });

        //Credits Button
        const buttonCC = this.add.text(100, 350, "Credits", {
            font: 'bold 35px Arial',
            fill: "#000000",
            backgroundColor: "#ffffff",
            padding: { x: 10, y: 5 }
        });

        // Make it interactive
        buttonCC.setInteractive({ useHandCursor: true });

        // Hover effects
        buttonCC.on("pointerover", () => buttonCC.setStyle({ fill: "#ffff00" }));
        buttonCC.on("pointerout", () => buttonCC.setStyle({ fill: "#00ff00" }));

        // Click handler
        buttonCC.on("pointerdown", () => {
            //this.scene.start("EndScreen", { finalScore: score, remainingHP: currHP, completion: completed });
            this.scene.start("CreditsScene");
        });


    }
}