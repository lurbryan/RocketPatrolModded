// Corvette prefab
class Corvette extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.points = pointValue; // track rocket's firing status
        this.moveSpeed = game.settings.spaceshipSpeed * 1.5;
        // MOD 4:
        // Randomize direction of movement for each ship.
        // Flip a coin by getting a random number between 0-1, i.e. 0 OR 1
        // Then use that to determine direction of motion in update()
        this.coinFlip = Phaser.Math.Between(0, 1);
    }

    update(){
        if(this.coinFlip == 0){
            // move spaceship left
            this.x -= this.moveSpeed;
            // wrap around from the left edge to the right edge
            if(this.x <= 0 - this.width){
                this.resetLeft();
            }
        }
        else {
            // move spaceship right
            this.x += this.moveSpeed;
            // wrap around from the left edge to the right edge
            if(this.x >= game.config.width + this.width){
                this.resetRight();
            }
        }
    }

    resetLeft(){
        this.x = game.config.width;
    }

    resetRight(){
        this.x = 0;
    }

    increaseSpeed(){
        this.moveSpeed *= 1.5;
    }
}