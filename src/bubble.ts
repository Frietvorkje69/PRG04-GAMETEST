import * as PIXI from 'pixi.js'

export class Bubble extends PIXI.Sprite {
    speed: number;

    constructor(texture: PIXI.Texture) {
        super(texture)

        this.speed = Math.random() * 0.5;
        this.x = Math.random() * 800
        this.y = Math.random() * 450
        this.scale.set(0.75 + Math.random() * 0.5);
    }

    update(delta: number) {
        this.y *= 1
        this.y -= this.speed
        this.x -= Math.cos(this.y * 0.1)
        if (this.y < -50) {
            this.y = 500
        }
    }
}