
export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, scale) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(scale);
        //Incase scene reference is needed
        this.scene = scene;

        //Player platformer settings
        this.setCollideWorldBounds(true);
        this.ACCELERATION = 300;
        this.DRAG = 2000;
        this.JUMP_VELOCITY = -300;
        this.PARTICLE_VELOCITY = 50;
        this.CRAWL_SPEED = 75
        this.MAX_SPEED = 350

        //crouching
        this.originalHeight = this.displayHeight;
        this.originalWidth = this.displayWidth;
        this.body.setSize(20, 18, false);
        this.body.setOffset(7, 12);

        //this.y = 10;
        this.crouching = false;

        //dashing
        this.dashing = false;
        this.dashed = false;
        this.direction = false;

        //Create control inputs
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.rKey = scene.input.keyboard.addKey('R');
        this.spaceKey = scene.input.keyboard.addKey('SPACE');
        
        //Make VFX
        
        this.vfx = {
            walking: scene.add.particles(0, 0, "kenny-particles", {
                frame: ['spark_03.png', 'spark_04.png'],
                random: true,
                scale: { start: 0.03, end: 0.1 },
                maxAliveParticles: 64,
                lifespan: 300,
                gravityY: 100,
                alpha: { start: 1, end: 0.1 },
            }),
            magnetise: scene.add.particles(0, 0, "kenny-particles", {
                frame: ['circle_01.png', 'circle_02.png'],
                random: true,
                scale: { start: 0.03, end: 0.1 },
                maxAliveParticles: 64,
                lifespan: 350,
                gravityY: -400,
                alpha: { start: 1, end: 0.1 },
            })
        };

        this.vfx.walking.stop();
        this.vfx.magnetise.stop();

        
        
    }
    

    update(groundLayer, spawn, finishGroup, totalCoinsText) {
        const player = this;
        const cursors = this.cursors;
        
        if (this.spaceKey.isDown) {
            if (this.dashed == false){
            this.dashed = true;
            this.dashing = true;
            this.MAXSPEED = 1000000;
            if (this.direction) {
                player.body.setVelocityX(500);
            } else {
                player.body.setVelocityX(-500);
            }
            this.scene.time.delayedCall(100, () => {
                this.dashing = false;
                this.MAXSPEED = 150;
            }, null, this);
            this.scene.time.delayedCall(3000, () => {
                this.dashed = false;
            }, null, this);
        }
        }

        if (player.body.velocity.x > this.MAXSPEED) {
            player.setVelocityX(this.MAXSPEED);
        }
        if (player.body.velocity.x < this.MAXSPEED * -1) {
            player.setVelocityX(this.MAXSPEED * -1);
        }

        if (cursors.left.isDown) {
            player.setAccelerationX(-this.ACCELERATION);
            this.direction = false;
            player.setFlip(true, false);
            player.anims.play('walk', true);
            //console.log("Walking");
            if (player.body.blocked.down) this.vfx.walking.start();
            this.vfx.walking.startFollow(player, player.displayWidth/2-10, player.displayHeight/2-5, false);
        } else if (cursors.right.isDown) {
            player.setAccelerationX(this.ACCELERATION);
            player.resetFlip();
            this.direction = true;
            player.anims.play('walk', true);
            //console.log("Walking");
            if (player.body.blocked.down) this.vfx.walking.start();
            this.vfx.walking.startFollow(player, player.displayWidth/2-10, player.displayHeight/2-5, false);
        } else {
            //console.log("Idle");
            player.setAccelerationX(0);
            player.setDragX(this.DRAG);
            player.anims.play('idle');
            this.vfx.walking.stop();
        }

        if (!player.body.blocked.down) {
            player.anims.play('jump');
        }
        if (player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.sound.play('jumpSound');
            player.setVelocityY(this.JUMP_VELOCITY);
        }

        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.scene.restart();
        }
        //commented out fixing it
        this.handleCrouching(groundLayer);

        //Commented out for now because I need a tilelayer
        this.handleMagnetism(groundLayer);
    }
    handleCrouching(groundLayer) {
        const player = this;
        const cursors = this.cursors;
        
        let canStandUp = true;
        
        // Check if player can stand up when crouching
        if (this.crouching) {
            // Only check tiles if groundLayer exists
            if (groundLayer && groundLayer.getTileAtWorldXY) {
                const tileAbove = groundLayer.getTileAtWorldXY(
                    player.x, 
                    player.y - this.originalHeight/2, 
                    true
                );
                if (tileAbove && tileAbove.properties && tileAbove.properties.collides) {
                    canStandUp = false;
                }
            }

            // Reduce max speed when crouching
            this.MAX_SPEED = this.CRAWL_SPEED;
        } else {
            this.MAX_SPEED = 350;
        }

        // Start crouching
        if (cursors.down.isDown && player.body.blocked.down) {
            // player.anims.play('crouch', true);
        
            if (!this.crouching) {
                this.crouching = true;

                let crouchHeight = this.originalHeight / 2;
                let offsetY = this.originalHeight - crouchHeight; 

                player.body.setSize(this.originalWidth, crouchHeight, false);
                player.body.setOffset(0, offsetY);

                
            }
            
        } 
        // Stop crouching
        else if (this.crouching && (!cursors.down.isDown || !player.body.blocked.down) && canStandUp) {
            this.crouching = false;
            
            this.body.setSize(20, 18, false);
            this.body.setOffset(7, 12);
            player.body.setOffset(0, 0);
        }
    }
    handleMagnetism(groundLayer) {
        
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const tile = groundLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y);
        const player = this;


        if (tile != null && tile.properties && tile.properties.grapple) {
            const dx = tile.getCenterX() - player.x;
            const dy = tile.getCenterY() - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const tileSize = 18;

            if (dist / tileSize <= 10) {
                const speed = 300;
                player.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                this.vfx.magnetise.emitParticleAt(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 10);
                if (!this.scene.isMagnetised) {
                    this.scene.isMagnetised = true;
                }
                return;
            }
        }

        if (this.scene.isMagnetised) {
            this.scene.isMagnetised = false;
        }
    }
}