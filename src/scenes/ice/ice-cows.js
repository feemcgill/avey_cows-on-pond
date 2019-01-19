import { Sprite, Texture, Container } from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import app from './../../setup/app'
import engine from './../../setup/engine';
import {loader} from './../../index'
import {backgroundSize} from './../../helpers'
import Matter from 'matter-js'
import PhysicsSprite from '../../physics-sprite'



export default class Cows extends Container {
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
    cow.drown = function(){
      TweenMax.to(cow.sprite, .3, {alpha: 0});
      TweenMax.to(cow.sprite.scale, .3, {x: 0.3, y: 0.3, onComplete: () => {
        cow.destroy()
      }})
    }
    cow.isDead = false;
    cow.update()
    if (this.cows.length % 2 == 0) {
      cow.sprite.scale.x= -0.25;
    } 
    this.addChild(cow.sprite)    
    this.cows.push(cow)

  }
  sendCows(){
      this.createCow()
      this.sendCowsInterval = setInterval(() => {
        if (this.cows.length < this.state.maxCows) {
          this.createCow()
        } else {
          clearInterval(this.sendCowsInterval)
        }
      }, 3500);
  }

  resize() {
  }

  handleMove() {
  }
  end() {
    clearInterval(this.sendCowsInterval)
    for (let i = 0; i < this.cows.length; i++) {
      const e = this.cows[i];
      e.drown();
    }    
  }
  update(){
  }
  animate() {
    for (let i = 0; i < this.cows.length; i++) {
      const e = this.cows[i];
      e.update()
      if (e.body.position.y > app.renderer.height - 150) {
         e.drown();
      }
    }
  }  

}
