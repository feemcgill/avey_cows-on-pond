import { Container, Texture, extras } from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import app from './../../setup/app'
import engine from './../../setup/engine'
import loader from './../../setup/loader'
import {backgroundSize, map} from './../../helpers'
import Matter from 'matter-js'
import IceBorders from './ice-borders'
import IceCows from './ice-cows'
import config from './../../setup/config'


export default class IceScene extends Container {
  constructor(endCallback, breakCallback, crackCallback) {

    super()

    //this.alpha = 0;
    this.iceBreakTimer = null

        
    this.resize = this.resize.bind(this)
    this.animate = this.animate.bind(this)
    this.endCallback = endCallback;
    this.breakCallback = breakCallback;
    this.crackCallback = crackCallback;

    this.iceBorders = new IceBorders();
    this.cows = new IceCows();
    this.addChild(this.cows);

    
    this.animate()
    this.resize()
    
    
    const maxBottomHits = config.iceScene.bottomHits
    this.bottomHits = 0
    Matter.Events.on(engine, 'collisionStart', (event) => {
      console.log(this.bottomHits)
      const pairs = event.pairs;
      if (pairs[0].bodyB.label == 'bottomhole' || pairs[0].bodyA.label == 'bottomhole') {


        if (this.bottomHits % Math.floor(maxBottomHits / 3) == 0) {
          setTimeout(() => {
            //this.vidFrames.animationSpeed += 0.05
            if ( maxBottomHits - this.bottomHits < 3) {
              this.iceBreak();
            } else {
              this.crackCallback();
            }
          }, 400);
        }

        this.bottomHits ++
      }
    });    
  }

  iceBreak(){
    clearTimeout(this.iceBreakTimer)

    setTimeout(() => {
      this.iceBorders.dropBottom();
    }, 300);        
    
    this.breakCallback()


    setTimeout(() => {
      this.transitionOut()
      this.bottomHits = 0
    }, 500);  
  }

  transitionIn() {
    this.alpha = 1
    this.iceBorders.createBorders();
    this.cows.sendCows();

    this.iceBreakTimer = setTimeout(() => {
      this.iceBreak()
    }, config.iceScene.timer);

    engine.timing.timeScale = 1;
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 5;    
  }

  transitionOut(){
    TweenMax.to(this, 5, {alpha: 0})
    this.endCallback();
    this.iceBorders.removeBorders();
    this.cows.end()
  }

  resize() {

  }

  handleMove(e) {
  }

  update(){

  }
  animate() {
    this.cows.animate();
    window.requestAnimationFrame(this.animate.bind(this))
  }  

}



