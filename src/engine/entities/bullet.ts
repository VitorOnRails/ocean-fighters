import { Graphics } from "pixi.js";
import { bulletWidth, bulletHeight, bulletSpeed } from "../config.ts";

class Bullet {
    graphics: Graphics;

    constructor(x: number, y: number) {
        this.graphics = new Graphics();
        this.graphics.x = x;
        this.graphics.y = y;
        this.graphics.rect(0, 0, bulletWidth, bulletHeight);
        this.graphics.fill({ color: 0x0FF000 });
    }

    update(deltaTime: number) {
        this.graphics.y -= bulletSpeed * deltaTime;
    }
};

export { Bullet };