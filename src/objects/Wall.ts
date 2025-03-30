import Phaser from 'phaser';

export class Wall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'atlas01', 'wall');
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        this.setImmovable(true);
    }
}
