import { TilingSprite } from "pixi.js";
import { screenWidth, screenHeight } from './config';
import { pixelTexture } from "./sprite";

const oceanTexture = [
    "BBBBLBB",
    "BBBBBBB",
    "BLBBBBB",
    "BBBBBBB",
    "BBBBBLB",
    "BBBBBBB",
    "BBLBBBB",
    "BBBBBBB"
];

const oceanPalette = {
    "L": "#3d8fc4",
    "B": "#0a3d62"
};

export function oceanScenario() {
    const texture = pixelTexture(oceanTexture, oceanPalette);
    const scenario = new TilingSprite({ texture, width: screenWidth, height: screenHeight })
    scenario.tileScale.set(5);
    return scenario;
}