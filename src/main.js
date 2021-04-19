/* Lucas Bryant
 * Prof. Adam Smith
 * CMPM 120 - Game Development Experience
 * 19 April 2021
 * 
 * How long did this take me?
 * 
 * Sources to cite, if any...
*/



let config = {
    type: Phaser.Canvas,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
// reserve Keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;