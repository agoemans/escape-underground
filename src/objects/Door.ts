import Phaser from 'phaser';

export class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'atlas01', 'door_closed');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
    }
}
