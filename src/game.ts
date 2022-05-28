import * as PIXI from 'pixi.js'
import { Fish } from "./Fish"
import { Bubble } from "./Bubble"
import { Player } from "./player"

import fishImage from "./images/fish.png"
import textbox from "./images/textbox.png"
import move from "./images/move.png"
import deathImage from "./images/eren.png"
import rareFishImage from "./images/SSRfish.png"
import erenHeadImage from "./images/eren.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/background.png"

//
// Create Game class
//
class Game {
    fish: Fish
    mylistener: EventListener
    bubble: Bubble
    pixi: PIXI.Application
    loader: PIXI.Loader
    fishes: Fish[] = []
    fishSprites2: PIXI.Sprite[] = []
    bubbles: Bubble[] = []
    idleTextures: PIXI.Texture[] = []; //spritesheet
    movementTextures: PIXI.Texture[] = []; //spritesheet
    player: Player;

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.mylistener = (e: Event) => this.logMessage(e)
        window.addEventListener('click', this.mylistener)

        //loader
        this.pixi.loader.add('fishTexture', fishImage)
            .add('rareFishTexture', rareFishImage)
            .add('moveTexture', move)
            .add('textbox', textbox)
            .add('erenHeadTexture', erenHeadImage)
            .add('deadTexture', deathImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add("spritesheet", "didiMove.json") //spritesheet

        this.pixi.loader.load(() => this.loadCompleted())
    }

    //hier zet hij de event listeners uit
    logMessage(e: Event) {
        console.log("niet meer")
        window.removeEventListener("click", this.mylistener)
    }

    loadCompleted() {
        const background = new PIXI.TilingSprite(this.pixi.loader.resources["waterTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height)

        this.pixi.stage.addChild(background)

        //moving background
        let count = 0;

        this.pixi.ticker.add(() => {
            count += 0.005;

            background.tilePosition.x += 1;
        });


        //add animation and interaction
        this.pixi.ticker.add((delta) => this.update(delta))

        for (let i = 0; i < 15; i++) {
            this.fish = new Fish(this.pixi.loader.resources["fishTexture"].texture!, this.pixi.loader.resources["deadTexture"].texture!)
            this.fishes.push(this.fish)
            this.pixi.stage.addChild(this.fish)

            this.bubble = new Bubble(this.pixi.loader.resources["bubbleTexture"].texture!)
            this.bubbles.push(this.bubble)
            this.pixi.stage.addChild(this.bubble)
        }
        this.player = new Player(this.pixi.loader.resources["rareFishTexture"].texture!, this.pixi.loader.resources["moveTexture"].texture!)
        this.pixi.stage.addChild(this.player)

        for (let i = 0; i < 3; i++) {
            const texture = PIXI.Texture.from(`didiMove ${i + 1}.png`);
            this.movementTextures.push(texture);
        }

        for (let i = 0; i < 1; i++) {
            const texture = PIXI.Texture.from(`didiMove ${i + 1}.png`);
            this.idleTextures.push(texture);
        }


    }

    update(delta: number) {
        for (let fish of this.fishes) {
            fish.update(delta)
        }

        for (let bubble of this.bubbles) {
            bubble.update(delta)
        }
        
        this.player.update(delta)

        if (this.collision(this.player, this.fish)) {
            if (this.fish.alive) {
                this.fish.alive = !this.fish.alive;
                this.fish.texture = this.fish.deadTexture
                // let textbox = new PIXI.Sprite(this.loader.resources["textbox"].texture!)
            
                // this.pixi.stage.addChild(textbox)
                console.log("player touches enemy 💀")
            }
        }
    }

    collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    showSpritesheet() {
        const didiMoving = new PIXI.AnimatedSprite(this.movementTextures);
        didiMoving.x = 100;
        didiMoving.y = 100;
        didiMoving.anchor.set(0.5);
        didiMoving.play();
        this.pixi.stage.addChild(didiMoving);
    }
}
new Game()