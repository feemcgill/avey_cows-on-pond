import { Sprite, Texture, Container } from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import app from './../../setup/app'
import engine from './../../setup/engine';
import {loader} from './../../index'
import {backgroundSize} from './../../helpers'
import Matter from 'matter-js'
import PhysicsSprite from '../../physics-sprite'



export default class Cows extends Sprite {
  constructor() {
    super()
    this.state = {
      maxCows: 25
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
      startX = -200
    }
    
    const cow = new PhysicsSprite('swimmer-' + this.cows.length, engine, 0x001)
    cow.init(startX, 200, 175, 105, this.cowTex, 'rectangle')
    Matter.World.add(engine.world, cow.body)
    cow.update()
    if (this.cows.length % 2 == 0) {
      cow.sprite.scale.x= -0.25;
    } 
    console.log(cow.sprite.scale)
    this.addChild(cow.sprite)    
    this.cows.push(cow)

  }


  resize() {
  }

  handleMove() {
  }

  update(){
  }
  animate() {
    for (let i = 0; i < this.cows.length; i++) {
      const e = this.cows[i];
      e.update()
    }
  }  

}
