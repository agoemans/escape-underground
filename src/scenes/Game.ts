import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';
import { Decor } from '../objects/Decor';
import { Door } from '../objects/Door';
import { Utils } from '../helper/utils';
import { Wall } from '../objects/Wall';
import { LevelGenerator } from '../helper/levelGenerator';

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
        
        this.add.tileSprite(400, 300, 800, 600, "atlas01", "floor");
        
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
        const _levelMap = [
            "WWWWWWWWWWW",  // Row 0 (Walls)
            "W    II p W",  // Row 1 (Player start, decor)
            "W   WW    W",  // Row 2 (Walls and open space)
            "W k     e W",  // Row 3 (Keycard, enemy, walls)
            "W   WW    W",  // Row 4 (Walls and decor)
            "W I       W",  // Row 5 (Decor and open space)
            "W   I     W",  // Row 6 (Decor and open space)
            "WWWWWWWWdWW"   // Row 7 (Walls)
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
        const levelMap =  LevelGenerator.generateLevel(11, 8);
        console.log(levelMap.map(row => row.join('')).join('\n'));
        // Define tile size
        const tileSize = 80; // Adjust based on sprite sizes

        // Loop through the level map and create objects
        // for (let row = 0; row < levelMap.length; row++) {
        //     for (let col = 0; col < levelMap[row].length; col++) {
        //         let tile = levelMap[row][col];
        //         let x = col * tileSize;
        //         let y = row * tileSize;

        //         if (tile === "W") {
        //             this.walls.add(new Wall(this, x, y));
        //         } else if (tile === "d") {
        //             this.door = new Door(this, x, y);
        //             this.doorLocked = true;
        //         } else if (tile === "k") {
        //             // Keycard
        //             this.keycard = this.physics.add.sprite(x, y, "keycard");
        //         } else if (tile === "p") {
        //             this.player = new Player(this, x, y, "player");
        //         } else if (tile === "e") {
        //             this.enemy = new Enemy(this, x, y, "enemy");
        //             this.enemy.playRun();
        //         } else if (tile === "I") {
        //             let decorType = `decor${Utils.getRandomNumber(1, 5)}`;
        //             this.decorItems.add(new Decor(this, x, y, decorType));
        //         }
        //     }
        // }

        for (let row = 0; row < levelMap.length; row++) {
            for (let col = 0; col < levelMap[row].length; col++) {
                let tile = levelMap[row][col]; // Access each tile in the nested array
                let x = col * tileSize;
                let y = row * tileSize;
        
                // Handle each tile type
                if (tile === "W") {
                    this.walls.add(new Wall(this, x, y)); // Wall
                } else if (tile === "d") {
                    this.door = new Door(this, x, y); // Door
                    this.doorLocked = true;
                } else if (tile === "k") {
                    this.keycard = this.physics.add.sprite(x, y, 'atlas01', "keycard"); // Keycard
                } else if (tile === "p") {
                    this.player = new Player(this, x, y, 'atlas01', "player"); // Player
                } else if (tile === "e") {
                    this.enemy = new Enemy(this, x, y, 'atlas01', "enemy"); // Enemy
                    this.enemy.playRun();
                } else if (tile === "I") {
                    let decorType = `decor_${Utils.getRandomNumber(1, 5)}`;
                    this.decorItems.add(new Decor(this, x, y, 'atlas01', decorType)); // Decor
                }
            }
        }
    }

    public gameOver() {
        console.log("Caught by security! Game Over.");
        this.scene.start('GameOver');
    }
}
