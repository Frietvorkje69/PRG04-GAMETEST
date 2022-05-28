import * as PIXI from 'pixi.js'

export class Fish extends PIXI.Sprite {
    deadTexture: PIXI.Texture;
    fishTexture: PIXI.Texture;
    alive = true;
    textbox = false; //textbox
    speed: number;

    constructor(texture: PIXI.Texture, deadTexture: PIXI.Texture) {
        super(texture)
        this.deadTexture = deadTexture
        this.fishTexture = texture

        this.x = 100
        this.anchor.set(0.5);
        this.x = Math.random() * 800;
        this.y = Math.random() * 450;
        this.scale.set(0.75 + Math.random() * 0.5);
        this.speed = Math.random() * 3;
        this.tint = Math.random() * 0xFFFFFF

        let area = this.getBounds()
        let greenbox = new PIXI.Graphics()
        greenbox.lineStyle(2, 0x33FF33, 1)
        greenbox.drawRect(0, 0, area.width, area.height)
        this.addChild(greenbox)

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.fishClicked())
    }

    update(delta: number) {
        if (this.alive == true) {
            this.x *= 1
            this.rotation += 0.001
            this.x += this.speed
        } else {
            this.x *= 1
            this.rotation += 0.1
            this.x += this.speed * 2
        }

        if (this.x > 900) {
            this.x = -100
        }
    }
    
    fishClicked() {
        console.log("click!")
        if (this.alive) {
            this.textbox = true;
            this.alive = !this.alive;
            this.texture = this.deadTexture
        } else {
            this.alive = true;
            this.textbox = false;
            this.texture = this.fishTexture
        }
    }
}