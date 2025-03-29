import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 0.5);
        this.setCircle(24, 0, 22);
        this.createAnimations(scene);
        this.play('idle');
    }

    private createAnimations(scene: Phaser.Scene) {
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNumbers('playerRun', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('playerJump', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    public playRun() {
        this.play('run');
    }
}
