import Phaser from 'phaser';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, MAX_WIDTH, MAX_HEIGHT, SCALE_MODE } from '../shared/globals';

export class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');

    window.addEventListener('resize', event => {
      this.customResize()
    });
  }

  preload() {
    // Load any assets needed for the Preloader scene
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.customResize();
    this.scene.start('Preloader');
  }

  //took resize from this example asnd tweaked it a bit
  //https://github.com/yandeu/phaser3-typescript-platformer-example
  customResize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;

    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;
    let maxWidth = MAX_WIDTH;
    let maxHeight = MAX_HEIGHT;
    let scaleMode = SCALE_MODE;

    let scale = Math.min(w / width, h / height);
    let newWidth = Math.min(w / scale, maxWidth);
    let newHeight = Math.min(h / scale, maxHeight);

    let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;
    let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT;
    let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT;

    let smooth = 1;
    if (scaleMode === 'SMOOTH') {
      const maxSmoothScale = 1.15;
      const normalize = (value: number, min: number, max: number) =>
        (value - min) / (max - min);

      if (width / height < w / h) {
        smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) /
          (1 / (maxSmoothScale - 1)) + maxSmoothScale;
      } else {
        smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) /
          (1 / (maxSmoothScale - 1)) + maxSmoothScale;
      }
    }

    // Resize Phaser's internal game canvas
    this.scale.resize(newWidth * smooth, newHeight * smooth);

    // Scale it visually with JavaScript (simulating CSS)
    const canvas = this.game.canvas;
    canvas.style.width = `${newWidth * scale}px`;
    canvas.style.height = `${newHeight * scale}px`;

    // Position it in the center of the screen (no CSS)
    canvas.style.position = 'absolute';
    canvas.style.left = `${(w - newWidth * scale) / 2}px`;
    canvas.style.top = `${(h - newHeight * scale) / 2}px`;

    // Remove any inherited margins/paddings
    canvas.style.margin = '0';
    canvas.style.padding = '0';
  }
}
