import { Sprite } from "pixi.js";
import { pixelTexture } from "../sprite.ts";
import { screenWidth, screenHeight, shipSize, speed } from "../config.ts";
import type { Keybinds } from "../input.ts";

const playerTexture = [
    "   L   ",
    "  DGL  ",
    "  DBL  ",
    "  DBL  ",
    "  G0G  ",
    "GGGGGGG",
    "BLLLLLB",
    "BLLLLLB",
    "BLLLLLB",
    "  GLG  ",
    "BL0L0LB"
];

const playerPalette = {
    "L": "#cdd2da",
    "G": "#9099a6",
    "D": "#5c636f",
    "B": "#3e4766",
    "0": "#151515",
};

class Player {
    graphics: Sprite;
    
    constructor() {
        this.graphics = new Sprite(pixelTexture(playerTexture, playerPalette));
        this.graphics.scale.set(5);
        this.reset();
    }

    update(deltaTime: number, keybinds: Keybinds) {
        if (keybinds.w) {
            this.graphics.y -= speed * deltaTime;
        }
        if (keybinds.a) {
            this.graphics.x -= speed * deltaTime;
        }
        if (keybinds.s) {
            this.graphics.y += speed * deltaTime;
        }
        if (keybinds.d) {
            this.graphics.x += speed * deltaTime;
        }
        this.graphics.x = Math.max(0, Math.min(screenWidth - shipSize, this.graphics.x));
        this.graphics.y = Math.max(0, Math.min(screenHeight - shipSize, this.graphics.y));
    }

    reset() {
        this.graphics.x = (screenWidth - shipSize) / 2;
        this.graphics.y = screenHeight - 200;
    }
}

export { Player };