import { Sprite, Texture, Container } from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import app from './../../setup/app'
import engine from './../../setup/engine';
import loader from './../../setup/loader'
import {backgroundSize} from './../../helpers'
import Matter from 'matter-js'
import PhysicsSprite from '../../physics-sprite'
import config from './../../setup/config'

const cow_physics  = {
  frictionAir: 100, //Matter.Common.random(.3, .8),
  friction: 100, //Matter.Common.random(0.05, 0.2),
  density: 0.1, //Matter.Common.random(1000.2, 1000.6),
  restitution: 0
}


export default class Cows extends Container {
  constructor() {
    super()

    const cowImages = [
      loader.resources.walker_1.url,
      loader.resources.walker_2.url,
      loader.resources.grazer_1.url,
      loader.resources.grazer_2.url,
      loader.resources.walker_3.url
    ]

    this.cowTextures = [];
    this.cowIndex = 0
    for (let i = 0; i < cowImages.length; i++) {
      const e = cowImages[i];
      const cowTex = new PIXI.Texture.fromImage(e)
      this.cowTextures.push(cowTex);
    }
    
    this.sendCowsInterval = null
    this.resize = this.resize.bind(this)
    this.animate = this.animate.bind(this)
    this.createCow = this.createCow.bind(this)
    this.end = this.end.bind(this)

    this.sendCows = this.sendCows.bind(this)
    this.cowTex = new PIXI.Texture.fromImage(loader.resources.swimmer.url)
    this.cows = []
  }
  

  createCow() {
    let startX = app.renderer.width + 200
    if (this.cows.length % 2 == 0) {
      startX = -170
    }
    this.cowIndex = (this.cowIndex + 1) % this.cowTextures.length

    const cow = new PhysicsSprite('swimmer-' + this.cows.length, engine, 0x001)

    const width = this.cowTextures[this.cowIndex].orig.width * 0.33
    const height = this.cowTextures[this.cowIndex].orig.height * 0.33

    cow.init(startX, 200, width, height, this.cowTextures[this.cowIndex], 'rectangle', cow_physics)

    Matter.World.add(engine.world, cow.body)

    cow.drown = function(){
      TweenMax.to(cow.sprite, .13, {alpha: 0});
      setTimeout(() => {
        cow.destroy()
      }, 500);
    }

    cow.update()
    if (this.cows.length % 2 == 0) {
      cow.sprite.scale.x= -0.33;
    } 

    this.addChild(cow.sprite)    
    this.cows.push(cow)

  }

  sendCows(){
      this.createCow()
      this.sendCowsInterval = setInterval(() => {
        if (this.cows.length < config.iceScene.maxCows) {
          this.createCow()
        } else {
          clearInterval(this.sendCowsInterval)
        }
      }, 3500);
  }

  end() {
    clearInterval(this.sendCowsInterval)
    for (let i = 0; i < this.cows.length; i++) {
      const e = this.cows[i];
      e.drown();
    }    
  }

  animate() {
    for (let i = 0; i < this.cows.length; i++) {
      const e = this.cows[i];
      e.update()
      if (e.body.position.y > app.renderer.height / 1.15) {
         e.drown();
      }
    }
  }

  update(){
  }

  resize() {
  }

  handleMove() {
  }  
}
