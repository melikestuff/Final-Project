
//"use strict"
import Load from './Scenes/Load.js'; 
import LevelOne from './Scenes/LevelOne.js';

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }, // Or whatever gravity you want
            debug: true // Set to false if you don't want to see collision boxes
        }
    },
    width: 1440,
    height: 900,
    scene: [Load, LevelOne],
    fps: { forceSetTimeOut: true, target: 60 }
};

const game = new Phaser.Game(config);