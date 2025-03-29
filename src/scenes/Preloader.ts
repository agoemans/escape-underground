import Phaser from 'phaser';

export class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // Load assets for the game
    this.load.image("background", "assets/background_2.png"); 
    this.load.image("floor", "assets/floor.png"); 
    this.load.image("player", "assets/player.png");
    this.load.image("door", "assets/door_closed.png");
    this.load.image("keycard", "assets/keycard.png");
    this.load.image("enemy", "assets/enemy.png");
    this.load.image("decor1", "assets/decor_1.png");
    this.load.image("decor2", "assets/decor_2.png");
    this.load.image("decor3", "assets/decor_3.png");
    this.load.image("decor4", "assets/decor_4.png");
    this.load.image("decor5", "assets/decor_5.png");
    this.load.image("wall", "assets/wall.png");

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
