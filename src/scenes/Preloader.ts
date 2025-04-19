import Phaser from 'phaser';
import { Boot } from './Boot';

export class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // Load assets for the game
    this.load.atlas('atlas01', 'assets/atlases/atlas01.png', 'assets/atlases/atlas01.json');
    this.load.image("background", "assets/background_2.png");

    //load animations
    this.load.spritesheet("enemyIdle", "assets/animations/enemy_idle.png", { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("enemyRun", "assets/animations/enemy_run.png", { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("playerIdle", "assets/animations/player_idle.png", { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("playerRun", "assets/animations/player_run.png", { frameWidth: 80, frameHeight: 80 });
    // this.load.spritesheet("playerJump", "assets/animations/player_jump.png", { frameWidth: 80, frameHeight: 80 });
  }

  create() {
    this.scene.start('MainMenu');
  }
}
