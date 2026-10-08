import { Texture } from "pixi.js";

export function pixelTexture(rows: string[], palette: Record<string, string>) {
    const width = Math.max(...rows.map(r => r.length));
    const height = rows.length;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    

    if(!ctx) {
        throw new Error("Context vazio.");
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const char = rows[y][x];
            const color = palette[char];
            if (color) {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
    const texture = Texture.from(canvas);
    texture.source.scaleMode = "nearest";
    return texture;
}