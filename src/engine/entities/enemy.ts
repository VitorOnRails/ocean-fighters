import { Sprite} from "pixi.js";
import { pixelTexture } from "../sprite.ts";
import { enemySpeed } from "../config.ts";

const enemyTexture = [
    "BL0L0LB",
    "  GLG  ",
    "BLLLLLB",
    "BLLLLLB",
    "BLLLLLB",
    "GGGGGGG",
    "  G0G  ",
    "  DBL  ",
    "  DBL  ",
    "  DGL  ",
    "   L   "
];

const enemyPalette = {
    "L": "#f0726b",
    "G": "#c23333",
    "D": "#7a1f1f",
    "B": "#ff9d3c",
    "0": "#151515",
};

class Enemy {
    graphics: Sprite;

    constructor(x: number, y: number) {
        this.graphics = new Sprite(pixelTexture(enemyTexture, enemyPalette));
        this.graphics.scale.set(5);
        this.graphics.x = x;
        this.graphics.y = y;
    }

    update(deltaTime: number) {
        this.graphics.y += enemySpeed * deltaTime;
    }
}

export { Enemy };