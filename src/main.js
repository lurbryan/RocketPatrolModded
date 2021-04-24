/* Lucas Bryant
 * Prof. Adam Smith
 * CMPM 120 - Game Development Experience
 * 19 April 2021
 * 
 * List of Changes:                                              Points:
 *     1. Added FIRE UI display when F is pressed.               (5)
 *     2. Now allows player control after rocket has been fired. (5)
 *     3. Ships increase in speed 30 seconds into game.          (5)
 *     4. Ships start in random direction of motion.             (5)
 *     5. Created persisten high score display.                  (5)
 *     6. Added background music.                                (5)
 *     7. Display seconds remaining in screen.                   (10)
 *     8. Added new type of ship: smaller, faster, worth more.   (20)
 *     9. Redone assets for spacships, rocket, and explostion.   (20)
 *        (the explosion doesn't really show up correctly, but
 *         I'm still counting it 'cause A: it's different, and
 *         B: it took three hours of hair pulling to do ONE asset.)
 *            
 *                                                         Total: 80 points   
 * 
 * 
 * How long did this take me?
 *     Well, it took me about an hour and a half just to figure out
 *     I needed to disable my Chrome addons to fix the keybinding
 *     issue and about an hour after that to figure out that I
 *     needed to clear my cache in order to print text, so there's
 *     that...
 * 
 *     All week. It took me all week in fits and starts, working on
 *     and off throughout. Even as I write this, I'm not done, but
 *     I am pushing up against the Friday deadline, which is the third
 *     deadline so far (thank for that, seriously). 
 * 
 * Sources to cite, if any...
 *   - These hepful people on StackOverflow, showing how to show
 *     and hide sprites : https://stackoverflow.com/questions/29148886/show-hide-sprites-texts-in-phaser
 *   - Much of the Phaser documentation on phasergames.com and phaser.io
 *   - Music courtesy of Eric Matyas's open source compilation on
 *     https://soundimage.org/sci-fi/
 *   - pixilart.com was my asset editor for this one
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
let highScore = 0;