import Phaser from 'phaser';

export class Wall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'atlas01', 'wall_01');
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        this.setOrigin(0.5, 0.5);
        this.setImmovable(true);
    }
}
