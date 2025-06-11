export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture = "platformer_characters") {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //Incase scene reference is needed
        this.scene = scene;

        //Player platformer settings
        this.setCollideWorldBounds(true);
        this.ACCELERATION = 300;
        this.DRAG = 2000;
        this.JUMP_VELOCITY = -500;
        this.PARTICLE_VELOCITY = 50;
        this.MAXSPEED = 175;
        this.dashing = false;
        this.dashed = false;


        //Create control inputs
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.rKey = scene.input.keyboard.addKey('R');

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

    create() {
            this.input.keyboard.on('keydown-SPACE', () => {
            if (this.dashed == false){
            this.dashed = true;
            this.dashing = true;
            this.MAXSPEED = 1000000;
            if (this.direction) {
                my.sprite.player.body.setVelocityX(500);
            } else {
                my.sprite.player.body.setVelocityX(-500);
            }
            this.time.delayedCall(100, () => {
                this.dashing = false;
                this.MAXSPEED = 150;
            }, null, this);
            this.time.delayedCall(3000, () => {
                this.dashed = false;
            }, null, this);
        }
        });
    }

     update(groundLayer, spawn, finishGroup, totalCoinsText) {
        const player = this;
        const cursors = this.cursors;

        if (cursors.left.isDown) {
            player.setAccelerationX(-this.ACCELERATION);
            player.resetFlip();
            player.anims.play('walk', true);
            if (player.body.blocked.down) this.vfx.walking.start();
            this.vfx.walking.startFollow(player, player.displayWidth/2-10, player.displayHeight/2-5, false);
        } else if (cursors.right.isDown) {
            player.setAccelerationX(this.ACCELERATION);
            player.setFlip(true, false);
            player.anims.play('walk', true);
            if (player.body.blocked.down) this.vfx.walking.start();
            this.vfx.walking.startFollow(player, player.displayWidth/2-10, player.displayHeight/2-5, false);
        } else {
            player.setAccelerationX(0);
            player.setDragX(this.DRAG);
            player.anims.play('idle');
            this.vfx.walking.stop();
        }
        //for dashing
        if (this.dashing) {
            my.sprite.player.body.allowGravity = false;
            my.sprite.player.body.setVelocityY(0);
            my.sprite.player.setAccelerationY(0);
        } else {
            my.sprite.player.body.allowGravity = true;
        }
        if (my.sprite.player.body.velocity.x > this.MAXSPEED) {
            my.sprite.player.setVelocityX(this.MAXSPEED);
        }
        if (my.sprite.player.body.velocity.x < this.MAXSPEED * -1) {
            my.sprite.player.setVelocityX(this.MAXSPEED * -1);
        }
        if (!player.body.blocked.down) player.anims.play('jump');
        if (player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            player.setVelocityY(this.JUMP_VELOCITY);
        }

        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.scene.restart();
        }

        //Commented out for now because I need a tilelayer
        //this.handleMagnetism(groundLayer);
    }

    handleMagnetism(groundLayer) {
        const pointer = this.scene.input.activePointer;
        const tile = groundLayer.getTileAtWorldXY(pointer.worldX, pointer.worldY);
        const player = this;

        if (tile && tile.properties.grapple) {
            const dx = tile.getCenterX() - player.x;
            const dy = tile.getCenterY() - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const tileSize = 18;

            if (dist / tileSize <= 10) {
                const speed = 300;
                player.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                this.vfx.magnetise.emitParticleAt(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 10);
                if (!this.scene.isMagnetised) {
                    this.scene.magnetiseSound.play();
                    this.scene.isMagnetised = true;
                }
                return;
            }
        }

        if (this.scene.isMagnetised) {
            this.scene.magnetiseSound.stop();
            this.scene.isMagnetised = false;
        }
    }
}