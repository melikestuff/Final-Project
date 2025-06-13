
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
    width: 800,
    height: 600,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }, // Or whatever gravity you want
            debug: true // Set to false if you don't want to see collision boxes
        }
    },

    scene: [Load, LevelOne, LevelThree]
};

const game = new Phaser.Game(config);