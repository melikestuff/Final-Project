
//"use strict"
import Load from './Scenes/Load.js'; 
import LevelOne from './Scenes/LevelOne.js';
import LevelThree from './Scenes/LevelThree.js';

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
    width: 640,
    height: 480,
    scene: [Load, LevelOne, LevelThree],
    fps: { forceSetTimeOut: true, target: 60 }
};

const game = new Phaser.Game(config);