import Matter from 'matter-js';
import { Sprite, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from './../../setup/app';
import engine from './../../setup/engine';
import {map} from '../../helpers'
import PhysicsSprite from '../../physics-sprite'
import loader from './../../setup/loader'


function createCows(){
  const cows = [];
  const cowImages = [
    loader.resources.swimmer_1.url,
    loader.resources.swimmer_2.url,
    loader.resources.swimmer_3.url
  ]
  const cowTextures = [];

  for (let i = 0; i < cowImages.length; i++) {
    const e = cowImages[i];
    const cowTex = new PIXI.Texture.fromImage(e)
    cowTextures.push(cowTex);
  }

  let cowIndex = 0
  let twistCow = false;
  for (let index = 0; index < 8; index++) {
      //Matter.Composites.stack(0,0, 2, 2, 0, 0, function(x, y, column, row) {
    cowIndex = (cowIndex + 1) % cowTextures.length
    const cow = new PhysicsSprite('swimmer', engine, 0x001)
    const width = cowTextures[cowIndex].orig.width / 2
    const height = cowTextures[cowIndex].orig.height / 2
    cow.init(
      Matter.Common.random(0,app.renderer.width), 
      Matter.Common.random(-500, 0), 
      width, 
      height, 
      cowTextures[cowIndex], 
      'circle'
    )
    if (twistCow) {
      cow.sprite.scale.x = -0.5
    }    
    cows.push(cow);
    cow.sprite.alpha = 0.8
    cow.sprite.interactive = true
    cow.sprite.defaultCursor = 'pointer'
    cow.sprite.interactive = true
    cow.sprite.buttonmode = true
    cow.sprite.cursor = 'pointer'
    twistCow = !twistCow
  };
  return cows;
}

export default class CowSwim extends Sprite {
  constructor(...args) {
    super(...args);
    const t = this;
    this.update = this.update.bind(this)
    this.resize = this.resize.bind(this)
    this.transitionIn = this.transitionIn.bind(this)

    this.cows = createCows();
    for (let i = 0; i < this.cows.length; i++) {
      const s = this.cows[i];
      s.sprite.alpha = 1
      Matter.World.add(engine.world, s.body)
      t.addChild(s.sprite)
    }
    this.resize();
    setTimeout(() => {
      this.transitionIn()
    }, 3000);
  }
  transitionIn(){
    for (let i = 0; i < this.cows.length; i++) {
      const s = this.cows[i];
      TweenMax.to(s.sprite, 8, {alpha: 1, delay: i * .01, ease: Expo.easeOut})
    }    
  }
  transitionOut(){
    // for (let i = 0; i < this.cows.length; i++) {
    //   const s = this.cows[i];
    //   s.destroy();
    // }   
  }

  resize() {
  }

  update(){
  }

  animate() {
    for (let i = 0; i < this.cows.length; i++) {
      const e = this.cows[i];
      e.update()

    }
    window.requestAnimationFrame(this.animate.bind(this))
  }
  
  
}

