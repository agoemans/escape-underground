import Phaser from 'phaser';

import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './shared/globals';

///used scaling example from https://github.com/yandeu/phaser3-typescript-platformer-example
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  parent: 'game-container',
  backgroundColor: '#028af8',
  disableContextMenu: true,
  scale: {
    // The game will be scaled manually in the resize()
    mode: Phaser.Scale.NONE,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
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