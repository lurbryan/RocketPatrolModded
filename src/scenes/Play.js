class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('corvette', './assets/corvette.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', 
                               {frameWidth: 64, 
                                frameHeight: 32, 
                                startFrame: 0, 
                                endFrame: 9});
        this.load.audio('lightyear', './assets/Light-Years_V001.mp3');
    }

    create(){
        // MOD 6:
        // Added background music
        // start music
        this.music = this.sound.add('lightyear');
        this.music.play();
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        // MOD 8:
        // Created new enemy type
        // add bonus ship (x1)
        this.corvette01 = new Corvette(this, game.config.width, (borderUISize*4 + (borderUISize*5 + borderPadding*2))/2, 'corvette', 0, 50).setOrigin(0,0);
        // flip them if they're going the other way
        if(this.ship01.coinFlip == 1){
            this.ship01.flipX = true;
        }
        if(this.ship02.coinFlip == 1){
            this.ship02.flipX = true;
        }
        if(this.ship03.coinFlip == 1){
            this.ship03.flipX = true;
        }
        // asset looks better flying backwards
        if(this.corvette01.coinFlip == 0){
            this.corvette01.flipX = true;
        }
        // white borders
        // (moved here because it looks a little better to have the ships 'under' the borders)
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        // Show current score
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // MOD 5:
        // Persistent high score across multiple games
        // Show high score
        this.scoreRight = this.add.text((borderUISize + borderPadding)*4, borderUISize + borderPadding*2, highScore, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.music.stop();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        // MOD 1: 
        // FIRE flag
        this.fireFlag = this.add.text(game.config.width/2, borderUISize + borderPadding*2, 
            'FIRE', scoreConfig);
        // Place the clock
        this.timerDisplay = this.add.text(game.config.width - (borderUISize + borderPadding) * 2, 
                                          borderUISize + borderPadding*2, '0', scoreConfig);
        // MOD 3:
        // Speed of ships increases halfway through the game
        this.time.delayedCall(game.settings.gameTimer/2, () => {
            this.ship01.increaseSpeed();
            this.ship02.increaseSpeed();
            this.ship03.increaseSpeed();
            this.corvette01.increaseSpeed();
        }, null, this);
    }

    update(){
        // MOD 6:
        // Display time remaining in seconds
        // Get current seconds, round down, subtract from playtime
        var currentTime = (game.settings.gameTimer / 1000) - 
                           Phaser.Math.FloorTo(this.clock.getElapsedSeconds());
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.corvette01.update();
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.corvette01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.corvette01);
        }
        // MOD 1:
        // Display or hide FIRE flag
        if(this.p1Rocket.isFiring) {
            this.fireFlag.visible = true;
        }
        else {
            this.fireFlag.visible = false;
        }
        // update high score if exceded
        if(this.p1Score > highScore){
            highScore = this.p1Score;
        }
        // update timer display
        this.timerDisplay.text = currentTime;
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
            if(ship.coinFlip == 0){
                ship.resetLeft();               // reset ship position
            }
            else {
                ship.resetRight();
            }
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}