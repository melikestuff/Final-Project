export default class StartScreen extends Phaser.Scene {
    constructor() {
        super("Start");
    }

    preload() {

    }

    create() {
        
        //Add background into game
        const bg = this.add.image(0, 0, "background").setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        //Title
        this.add.text(240, 75, `Cat Stuff`, { fill: '#f0ff39', font: 'bold 40px Arial'});

        //Level One
        const button = this.add.text(100, 200, "Level One", {
            font: 'bold 20px Arial',
            fill: "#000000",
            backgroundColor: "#ffffff",
            
            padding: { x: 10, y: 5 }
        });

        // Make it interactive
        button.setInteractive({ useHandCursor: true });
        // Hover effects
        button.on("pointerover", () => button.setStyle({ fill: "#00ff00" }));
        button.on("pointerout", () => button.setStyle({ fill: "#000000" }));
        // Click handler
        button.on("pointerdown", () => {
            this.scene.start("LevelOne");
        });

        //Level two
        const buttonTwo = this.add.text(250, 200, "Level Two", {
            font: 'bold 20px Arial',
            fill: "#000000",
            backgroundColor: "#ffffff",
            
            padding: { x: 10, y: 5 }
        });

        // Make it interactive
        buttonTwo.setInteractive({ useHandCursor: true });
        // Hover effects
        buttonTwo.on("pointerover", () => buttonTwo.setStyle({ fill: "#00ff00" }));
        buttonTwo.on("pointerout", () => buttonTwo.setStyle({ fill: "#000000" }));
        // Click handler
        buttonTwo.on("pointerdown", () => {
            this.scene.start("LevelTwo");
        });

        //Level Three
        const buttonThree = this.add.text(400, 200, "Level Three", {
            font: 'bold 20px Arial',
            fill: "#000000",
            backgroundColor: "#ffffff",
            
            padding: { x: 10, y: 5 }
        });

        // Make it interactive
        buttonThree.setInteractive({ useHandCursor: true });
        // Hover effects
        buttonThree.on("pointerover", () => buttonThree.setStyle({ fill: "#00ff00" }));
        buttonThree.on("pointerout", () => buttonThree.setStyle({ fill: "#000000" }));
        // Click handler
        buttonThree.on("pointerdown", () => {
            this.scene.start("LevelThree");
        });

        //Credits Button
        const buttonCC = this.add.text(240, 375, "Credits", {
            font: 'bold 35px Arial',
            fill: "#000000",
            backgroundColor: "#ffffff",
            padding: { x: 10, y: 5 }
        });

        // Make it interactive
        buttonCC.setInteractive({ useHandCursor: true });

        // Hover effects
        buttonCC.on("pointerover", () => buttonCC.setStyle({ fill: "#00ff00" }));
        buttonCC.on("pointerout", () => buttonCC.setStyle({ fill: "#000000" }));

        // Click handler
        buttonCC.on("pointerdown", () => {
            //this.scene.start("EndScreen", { finalScore: score, remainingHP: currHP, completion: completed });
            this.scene.start("CreditsScene");
        });


    }
}