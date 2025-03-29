export class LevelGenerator {
    static generateLevel(width: number, height: number): string[][] {
        // Create the empty map
        let level = Array.from({ length: height }, () => Array(width).fill(' '));

        // Add walls surrounding the whole map
        for (let i = 0; i < width; i++) {
            level[0][i] = 'W'; // Top wall
            level[height - 1][i] = 'W'; // Bottom wall
        }
        for (let i = 0; i < height; i++) {
            level[i][0] = 'W'; // Left wall
            level[i][width - 1] = 'W'; // Right wall
        }

        // Set the player and door locations
        let door = { x: 0, y: Math.floor(height / 2) }; // Place door at left side
        let key = { x: width - 1, y: Math.floor(height / 2) }; // Key is at the opposite end
        level[door.y][door.x] = 'd'; // Door symbol
        level[key.y][key.x] = 'k'; // Key symbol
        let player = { x: door.x + 1, y: door.y }; // Player starts near the door
        level[player.y][player.x] = 'p'; // Player symbol

        // Place an enemy (e.g., random position, but avoid key/door/player locations)
        let enemy = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
        while (level[enemy.y][enemy.x] !== ' ') {
            enemy = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
        }
        level[enemy.y][enemy.x] = 'e'; // Enemy symbol


        // Create random walls and items
        for (let i = 0; i < Math.floor((width * height) / 5); i++) { // Random wall count
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            if (level[y][x] === ' ') { // Only place walls on empty spaces
                level[y][x] = 'I';
            }
        }
        console.log('level it comes here before ensure path', level);
        // Ensure path between player and key

        // this.ensurePath(level, player, key);
        console.log('level it comes here after ensure path', level);

        return level;
    }

    private static ensurePath(level: string[][], start: { x: number, y: number }, end: { x: number, y: number }): void {
        // Simple pathfinding function to ensure there's a path between player and key.
        // We'll use a basic BFS algorithm to find a path from player to key and make sure no walls block it.

        let queue = [start];
        let visited = Array.from({ length: level.length }, () => Array(level[0].length).fill(false));
        let directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

        visited[start.y][start.x] = true;

        while (queue.length > 0) {
            let current = queue.shift();

            if (current && current.x === end.x && current.y === end.y) {
                break; // Path found
            }

            for (let dir of directions) {
                let nx = current!.x + dir.x;
                let ny = current!.y + dir.y;

                if (nx >= 0 && nx < level[0].length && ny >= 0 && ny < level.length && !visited[ny][nx] && level[ny][nx] === ' ') {
                    visited[ny][nx] = true;
                    queue.push({ x: nx, y: ny });
                }
            }
        }

        // Mark the path from player to key
        let current = end;
        while (current.x !== start.x || current.y !== start.y) {
            level[current.y][current.x] = '.'; // Mark path with '.'
            for (let dir of directions) {
                let nx = current.x + dir.x;
                let ny = current.y + dir.y;
                if (nx >= 0 && nx < level[0].length && ny >= 0 && ny < level.length && visited[ny][nx]) {
                    current = { x: nx, y: ny };
                    break;
                }
            }
        }

        level[start.y][start.x] = 'p'; // Put player back on the path
        level[end.y][end.x] = 'k'; // Put key back on the path
    }
}

// Test the level generation
// let generatedLevel = LevelGenerator.generateLevel(15, 10);
// console.log(generatedLevel.map(row => row.join('')).join('\n'));
