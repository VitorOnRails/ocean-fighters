import { Application, TilingSprite } from "pixi.js";
import { oceanScenario } from "./scenario";
import { Player } from "./entities/player";
import { Bullet } from "./entities/bullet";
import { Enemy } from "./entities/enemy";
import { screenWidth, screenHeight, shipSize, bulletWidth, bulletInterval, enemySize, spawnInterval, pointsPerKill, startingLives, oceanSpeed } from "./config";
import { isColliding } from "./collision";
import { keybinds, mouse } from "./input";

export type GameCallbacks = {
    onScoreChange: (score: number) => void;
    onLivesChange: (lives: number) => void;
    onGameOver: () => void;
}

class Game {
    container: HTMLElement;
    app: Application;
    running: boolean;
    ocean: TilingSprite;
    player: Player;
    bullets: Bullet[];
    enemies: Enemy[];
    bulletCooldown: number;
    spawnCooldown: number;
    score: number;
    lives: number;
    gameOver: boolean;
    callbacks: GameCallbacks;

    constructor(container: HTMLElement, callbacks: GameCallbacks) {
        this.container = container;
        this.callbacks = callbacks;
        this.app = new Application();
        this.running = false;
        this.ocean = oceanScenario();
        this.player = new Player();
        this.bullets = [];
        this.enemies = [];
        this.bulletCooldown = 0;
        this.spawnCooldown = 0;
        this.score = 0;
        this.lives = startingLives;
        this.gameOver = false;
    }

    async init() {
        await this.app.init({
            width: screenWidth,
            height: screenHeight,
            backgroundColor: 0x0a3d62,
        })
        this.container.appendChild(this.app.canvas);
        this.app.stage.addChild(this.ocean);
        this.app.stage.addChild(this.player.graphics);
        this.app.ticker.add((ticker) => this.update(ticker.deltaTime));
    }

    start() {
        this.running = true;
    }

    reset() {
        for (const bullet of this.bullets) bullet.graphics.destroy();
        this.bullets = [];
        for (const enemy of this.enemies) enemy.graphics.destroy();
        this.enemies = [];
        this.score = 0;
        this.lives = startingLives;
        this.bulletCooldown = 0;
        this.spawnCooldown = 0;
        this.gameOver = false;
        this.player.reset();
    }

    update(deltaTime: number) {
        
        this.ocean.tilePosition.y += oceanSpeed * deltaTime;
        if (this.gameOver) return;
        if (!this.running) return;

        this.player.update(deltaTime, keybinds);

        this.bulletCooldown -= deltaTime;
        if (mouse.m1 && this.bulletCooldown <= 0) {
            const bullet = new Bullet((this.player.graphics.x + shipSize/2) - bulletWidth/2, this.player.graphics.y);
            this.app.stage.addChild(bullet.graphics);
            this.bullets.push(bullet);
            this.bulletCooldown = bulletInterval;
        }
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update(deltaTime);
            if (this.bullets[i].graphics.y < 0) {
                this.bullets[i].graphics.destroy();
                this.bullets.splice(i, 1);
            }
        }
        this.spawnCooldown -= deltaTime;
        if (this.spawnCooldown <= 0) {
            const x = Math.random() * (screenWidth - enemySize);
            const enemy = new Enemy(x, -enemySize);
            this.app.stage.addChild(enemy.graphics);
            this.enemies.push(enemy);
            this.spawnCooldown = spawnInterval;
        }
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].update(deltaTime);
            if (this.enemies[i].graphics.y > screenHeight) {
                this.enemies[i].graphics.destroy();
                this.enemies.splice(i, 1);
            }
        }
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            for (let b = this.bullets.length - 1; b >= 0; b--) {
                if (isColliding(this.enemies[i].graphics, this.bullets[b].graphics)) {
                    this.enemies[i].graphics.destroy();
                    this.enemies.splice(i, 1);
                    this.bullets[b].graphics.destroy();
                    this.bullets.splice(b, 1);
                    this.score += pointsPerKill;
                    this.callbacks.onScoreChange(this.score);
                    break;
                }
            }
        }
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            if (isColliding(this.enemies[i].graphics, this.player.graphics)) {
                this.enemies[i].graphics.destroy();
                this.enemies.splice(i, 1);
                this.lives--;
                this.callbacks.onLivesChange(this.lives);
                if (this.lives <= 0) {
                    this.gameOver = true;
                    this.callbacks.onGameOver();
                }
            }
        }
    }
}

export { Game };