import Phaser from 'phaser';

import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#028af8',
  disableContextMenu: true,
  // scale: {
  //     mode: Phaser.Scale.FIT
  // },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: true
    }
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Game,
    GameOver
  ]
};

export default new Phaser.Game(config);