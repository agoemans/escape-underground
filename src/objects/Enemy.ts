import Phaser from 'phaser';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setVelocityX(100); // Moves side to side
        this.setOrigin(0.5, 0.5);
        this.setCircle(24, 0, 24);

        this.createAnimations(scene);
    }

    patrol() {
        if (this.x >= 600) {
            this.setVelocityX(-100);
            this.flipX = true;
            this.setOrigin(0.5, 0.5);
            this.setCircle(24, 24, 24);
        };
        if (this.x <= 200) {
            this.setVelocityX(100);
            this.flipX = false;
            this.setOrigin(0.5, 0.5);
            this.setCircle(24, 0, 24);
        };
    }

    private createAnimations(scene: Phaser.Scene) {
        scene.anims.create({
            key: 'enemyIdle',
            frames: scene.anims.generateFrameNumbers('enemyIdle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'enemyRun',
            frames: scene.anims.generateFrameNumbers('enemyRun', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    playIdle() {
        this.anims.play('enemyIdle', true);
    }

    playRun() {
        this.anims.play('enemyRun', true);
    }
}
