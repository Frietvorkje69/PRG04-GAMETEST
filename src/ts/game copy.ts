import * as PIXI from 'pixi.js'

import fishImage from "./images/fish.png"
import rareFishImage from "./images/SSRfish.png"
import erenHeadImage from "./images/eren.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/background.png"

class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    fishSprites: PIXI.Sprite[] = []
    fishSprites2: PIXI.Sprite[] = []
    bubbleSprites: PIXI.Sprite[] = []
    fish: PIXI.Sprite

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        //loader
        this.pixi.loader.add('fishTexture', fishImage)
            .add('rareFishTexture', rareFishImage)
            .add('erenHeadTexture', erenHeadImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)

        this.pixi.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        const background = new PIXI.TilingSprite(this.pixi.loader.resources["waterTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height)

        this.pixi.stage.addChild(background)

        this.pixi.ticker.add((delta) => this.updateFish(delta))

        for (let i = 0; i < 15; i++) {
            let fish = new Fish(this.loader.resources["fishTexture"].texture!)
            this.fishSprites.push(fish)
            this.pixi.stage.addChild(fish)
        }
        
    }
}

export class Fish extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 100
    }

    update(delta: number) {
        this.x *= 1
        this.rotation += 0.001
        this.x += 1
        if (this.x > 900) {
            this.x = -100
        }
    }
}

new Game()