import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';
import { Decor } from '../objects/Decor';
import { Door } from '../objects/Door';
import { Utils } from '../helper/utils';
import { Wall } from '../objects/Wall';
import { LevelGenerator } from '../helper/levelGenerator';
import { TILE_SIZE } from '../shared/globals';

export class Game extends Phaser.Scene {
    public player!: Player;
    public keycard!: Phaser.Physics.Arcade.Sprite;
    public door!: Door;
    public doorLocked!: boolean;
    public enemy!: Enemy;
    public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    public decorItems!: Phaser.Physics.Arcade.StaticGroup;
    public walls!: Phaser.Physics.Arcade.StaticGroup;
    constructor() {
        super('Game');

    }

    preload() {}

    create() {
        // Background
        let background = this.add.image(0, 0, "background");
        background.setOrigin(0, 0);
        
        this.add.tileSprite(this.game.scale.width / 2, this.game.scale.height / 2, this.game.scale.width, this.game.scale.height, "atlas01", "floor");
        
        this.decorItems = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();
        this.createLevel();

        // Enable collisions
        this.physics.add.overlap(this.player, this.keycard, this.collectKey, () => {}, this);
        this.physics.add.overlap(this.player, this.door, this.checkExit, () => {}, this);
        this.physics.add.overlap(this.player, this.enemy, this.gameOver, () => {}, this);

        this.physics.add.collider(this.player, this.decorItems);
        this.physics.add.collider(this.enemy, this.decorItems);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemy, this.walls);

        // Controls
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        //debug
        this.debug();
    }

    debug() {
        //debug
        (this.player.body as Phaser.Physics.Arcade.Body).debugShowBody = true;
        (this.player.body as Phaser.Physics.Arcade.Body).debugShowVelocity = true;
        (this.enemy.body as Phaser.Physics.Arcade.Body).debugShowBody = true;
        (this.enemy.body as Phaser.Physics.Arcade.Body).debugShowVelocity = true;
        (this.decorItems.children as any).iterate((entry: any) => {
            const decor = entry as Decor;
            if (decor.body) {
                (decor.body as Phaser.Physics.Arcade.Body).debugShowBody = true;
            };
        });

        (this.walls.children as any).iterate((entry: any) => {
            const wall = entry as Wall;
            if (wall.body) {
                (wall.body as Phaser.Physics.Arcade.Body).debugShowBody = true;
            }
        });
    }

    update() {
        // Game logic goes here
        const { left, right, up, down } = this.cursors;
        
        // Player movement
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.player.playRun();
            this.player.setVelocityX(-160);
        };
        if (this.cursors.right.isDown) {
            this.player.playRun();
            this.player.setVelocityX(160);
        }
        if (this.cursors.up.isDown) {
            this.player.playRun();
            this.player.setVelocityY(-160);
        }
        if (this.cursors.down.isDown) {
            this.player.playRun();
            this.player.setVelocityY(160);
        }

        // Enemy movement (simple patrol)
        this.enemy.patrol();
    }

    collectKey(player: any, keycard: any): void {
        keycard.destroy();
        this.doorLocked = false;
        console.log("Keycard collected! Door unlocked.");
    }

    checkExit(player: any, door: any): void {
        if (!this.doorLocked) {
            console.log("You escaped!");
            this.scene.restart(); // Reset game on win
        } else {
            console.log("Door is locked. Find the keycard!");
        }
    }

    createLevel() {
        const levelMap = [
            "WWWWWWWWWWWWWWW",  // Row 0 (Walls)
            "W K  WO       W",  // Row 1 (Player start, decor)
            "W W  W        W",  // Row 2 (Walls and open space)
            "W       E     W",  // Row 3 (Keycard, enemy, walls)
            "W   WW        W",  // Row 4 (Walls and decor)
            "W O           W",  // Row 5 (Decor and open space)
            "W   O         W",  // Row 6 (Decor and open space)
            "W   O P       W",  // Row 7 (Decor and open space)
            "WWWWWWWWDWWWWWW"   // Row 8 (Walls)
        ];

        const levelMap_ = [
            "WWWWWWWWWWW",
            "W        kW",
            "WWWWW    WW",
            "W pW  WW  W",
            "W  W  W   W",
            "W     W   W",
            "Wd  e     W",
            "WWWWWWWWWWW"
        ];
        //w, h
        // const levelMap =  LevelGenerator.generateLevel(11, 8);
        // console.log(levelMap.map(row => row.join('')).join('\n'));
        // Define tile size
        const tileSize = TILE_SIZE; // Adjust based on sprite sizes
        const screenWidth = this.game.scale.width;
        const screenHeight = this.game.scale.height;
        const levelWidth = levelMap[0].length * tileSize;
        const levelHeight = levelMap.length * tileSize;
        // Center the level on the screen
        const offsetX = (screenWidth - levelWidth) / 2;
        const offsetY = (screenHeight - levelHeight) / 2;

        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                let tile = levelMap[row][col]; // Access each tile in the nested array
                let x = col * tileSize + ((screenWidth - levelWidth + tileSize) / 2); // Center the tile
                let y = row * tileSize + ((screenHeight - levelHeight + tileSize) / 2); // Center the tile
        

                switch (tile) {
                    case "W":
                        this.walls.add(new Wall(this, x, y)); // Wall
                        break;
                    case "D":
                        this.door = new Door(this, x, y); // Door
                        this.doorLocked = true;
                        break;
                    case "K":
                        this.keycard = this.physics.add.sprite(x, y, 'atlas01', "keycard"); // Keycard
                        break;
                    case "P":
                        this.player = new Player(this, x, y, 'atlas01', "player"); // Player
                        break;
                    case "E":
                        this.enemy = new Enemy(this, x, y, 'atlas01', "enemy"); // Enemy
                        this.enemy.playRun();
                        break;
                    case "O":
                    case "I":
                        let decorType = `decor_${tile}_${Utils.getRandomNumber(1, 5)}`;
                        this.decorItems.add(new Decor(this, x, y, 'atlas01', decorType)); // Decor
                        break;
                    default:
                        break; // Empty space or unrecognized tile
                }
            }
        }
    }

    public gameOver() {
        console.log("Caught by security! Game Over.");
        this.scene.start('GameOver');
    }
}
