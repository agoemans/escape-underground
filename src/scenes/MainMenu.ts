import Phaser from 'phaser';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    const titleText = this.add.text(400, 300, 'Main Menu', { fontSize: '64px', color: '#fff' });
    titleText.setOrigin(0.5, 0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}
