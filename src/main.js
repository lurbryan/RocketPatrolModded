/* Lucas Bryant
 * Prof. Adam Smith
 * CMPM 120 - Game Development Experience
 * 19 April 2021
 * 
 * List of Changes:
 *     1. Added FIRE UI display when F is pressed.               (5)
 *     2. Now allows player control after rocket has been fired. (5)
 *     3. Ships increase in speed 30 seconds into game.          (5)
 *     4. Ships start in random direction of motion.             (5)
 * 
 * 
 * How long did this take me?
 *     Well, it took me about an hour and a half just to figure out
 *     I needed to disable my Chrome addons to fix the keybinding
 *     issue and about an hour after that to figure out that I
 *     needed to clear my cache in order to print text, so there's
 *     that...
 * 
 * Sources to cite, if any...
 *   - These hepful people on StackOverflow, showing how to show
 *     and hide sprites : https://stackoverflow.com/questions/29148886/show-hide-sprites-texts-in-phaser
 *   - 
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