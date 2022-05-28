import * as PIXI from 'pixi.js'

export class MovingSprite extends PIXI.AnimatedSprite {
    xspeed = 0
    yspeed = 0
    idleTextures: PIXI.Texture[]
    movementTextures: PIXI.Texture[]

    constructor(idleTextures: PIXI.Texture[], movementTextures: PIXI.Texture[]) {
        super(idleTextures)

        this.idleTextures = idleTextures
        this.movementTextures = movementTextures

        this.x = 100
        this.anchor.set(0.5);
        this.x = Math.random() * 800;
        this.y = Math.random() * 450;
        this.scale.set(0.75 + Math.random() * 0.5);
        this.tint = Math.random() * 0xFFFFFF

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        let area = this.getBounds()
        let greenbox = new PIXI.Graphics()
        greenbox.lineStyle(2, 0x33FF33, 1)
        greenbox.drawRect(0, 0, area.width, area.height)
        this.addChild(greenbox)
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

    moving() {
        this.textures = this.movementTextures
        this.play()
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                this.moving()
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                this.moving()
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                this.moving()
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                this.moving()
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
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}