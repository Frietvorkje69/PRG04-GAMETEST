import * as PIXI from 'pixi.js'
import logo from "./images/logo.png"
import fishImage from "./images/fish.png"
import rareFishImage from "./images/SSRfish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"

//
// Create a canvas
//
const pixi = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(pixi.view)
const fishes = []
const bubbles = []
pixi.stage.interactive = true;

//
// Preload the sprites
//
const loader = new PIXI.Loader()
loader.add('fishTexture', fishImage)
    .add('rareFishTexture', rareFishImage)
    .add('bubbleTexture', bubbleImage)
    .add('waterTexture', waterImage)
    .add('logo', logo)
loader.load(() => loadCompleted())

//
// Create sprites when loaded
//
function loadCompleted() {
    const background = new PIXI.Sprite(loader.resources["waterTexture"].texture!)
    pixi.stage.addChild(background)

    for (let i = 0; i < 15; i++) {
        addFish()
    }

    const title = new PIXI.Sprite(loader.resources["logo"].texture!)
    pixi.stage.addChild(title)
}

pixi.renderer.plugins.interaction.on('pointerdown', onPointerDown);

function onPointerDown() {
    addFish()
}

function addFish() {
    let RNG = Math.floor(Math.random() * 10);
    if (RNG === 5) {
        let rareFish = new PIXI.Sprite(loader.resources["rareFishTexture"].texture!)
        rareFish.anchor.set(0.5);
        rareFish.x = Math.random() * pixi.screen.width;
        rareFish.y = Math.random() * pixi.screen.height;
        rareFish.scale.set(0.75 + Math.random() * 0.5);
        rareFish.tint = Math.random() * 0xFFFFFF
        pixi.stage.addChild(rareFish)
    } else {
        let fish = new PIXI.Sprite(loader.resources["fishTexture"].texture!)
        fish.anchor.set(0.5);
        fish.x = Math.random() * pixi.screen.width;
        fish.y = Math.random() * pixi.screen.height;
        fish.scale.set(0.75 + Math.random() * 0.5);
        fish.tint = Math.random() * 0xFFFFFF

        fishes.push(fish)
        pixi.stage.addChild(fish)
    }

    //Place bubbles at random locations
    let bubble = new PIXI.Sprite(loader.resources["bubbleTexture"].texture!)
    bubble.x = Math.random() * pixi.screen.width;
    bubble.y = Math.random() * pixi.screen.height;
    bubble.scale.set(0.75 + Math.random() * 0.5);

    bubbles.push(bubble)
    pixi.stage.addChild(bubble)
}

pixi.ticker.add((delta: number) => fishMovement(delta))

function fishMovement(delta: number) {
    for (let fish of fishes) {
        //fish.x = Math.floor(Math.random() * 10)
        //fish.y = Math.sin(Math.random() * 10)
        fish.x *= 1
        fish.rotation += 0.001
        fish.x += 1
        fish
        if (fish.x > 900) {
            fish.x = -100
        }
    }
}

pixi.ticker.add((delta: number) => bubbleMovement(delta))

function bubbleMovement(delta: number) {
    for (let bubble of bubbles) {
        bubble.y *= 1
        bubble.rotation -= 0.001
        bubble.y += -1
        if (bubble.y < -50) {
            bubble.y = 500
        }
    }
}