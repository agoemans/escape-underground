import Phaser from 'phaser';

export class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', color: '#fff' });
    gameOverText.setOrigin(0.5, 0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
