import * as PIXI from 'pixi.js'

export class Player extends PIXI.Sprite {
    xspeed = 0
    yspeed = 0
    moveTexture: PIXI.Texture;
    idleTexture: PIXI.Texture;

    constructor(idleTexture: PIXI.Texture, moveTexture: PIXI.Texture) {
        super(idleTexture)
        this.moveTexture = moveTexture
        this.idleTexture = idleTexture

        this.x = 100
        this.anchor.set(0.5);
        this.x = Math.random() * 800;
        this.y = Math.random() * 450;
        this.scale.set(0.75 + Math.random() * 0.5);
        // this.tint = Math.random() * 0xFFFFFF

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        // let area = this.getBounds()
        // let greenbox = new PIXI.Graphics()
        // greenbox.lineStyle(2, 0x33FF33, 1)
        // greenbox.drawRect(0, 0, area.width, area.height)
        // this.addChild(greenbox)
    }

    update(delta: number) {
        this.x += this.xspeed
        this.y += this.yspeed
        
        if (this.x > 900) {
            this.x = -100
        }
        
        if (this.x < -100) {
            this.x = 900
        }

        if (this.y < -50) {
            this.y = 500
        }
        if (this.y > 500) {
            this.y = -50
        }
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                this.texture = this.moveTexture
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                this.texture = this.moveTexture
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                this.texture = this.moveTexture
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                this.texture = this.moveTexture
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                this.texture = this.idleTexture
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                this.texture = this.idleTexture
                break
        }
    }
}