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

    this.alpha = 1;
    this.iceBreakTimer = null

        
    this.resize = this.resize.bind(this)
    this.animate = this.animate.bind(this)
    this.endCallback = endCallback;
    this.breakCallback = breakCallback;
    this.crackCallback = crackCallback;

    this.iceBorders = new IceBorders();


    
    this.resize()
    
    
    const maxBottomHits = config.iceScene.bottomHits
    this.bottomHits = 0
    Matter.Events.on(engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      if (pairs[0].bodyB.label == 'bottomhole' || pairs[0].bodyA.label == 'bottomhole') {

        console.log(this.bottomHits);
        if (this.bottomHits % Math.floor(maxBottomHits / 4) == 1) {
          console.log('break', this.bottomHits)
          setTimeout(() => {
            if ( maxBottomHits - this.bottomHits < 4) {
              this.iceBreak();
            } else {
              this.crackCallback();
            }
          }, 40);
        }

        this.bottomHits ++
      }
    });    
  }
  transitionIn() {
    //this.alpha = 1
    this.iceBorders.createBorders();

    this.cows = new IceCows();
    this.addChild(this.cows);
    
    this.cows.sendCows();
    this.animate()

    this.iceBreakTimer = setTimeout(() => {
      this.iceBreak()
    }, config.iceScene.timer);

    engine.timing.timeScale = 1;
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 5;    
  }
  
  iceBreak(){
    clearTimeout(this.iceBreakTimer)

    setTimeout(() => {
    }, 300);        
    this.iceBorders.dropBottom();

    this.breakCallback()


    setTimeout(() => {
      this.transitionOut()
      this.bottomHits = 0
    }, 500);  
  }



  transitionOut(){
    this.iceBorders.removeBorders();
    setTimeout(() => {
      this.endCallback();
      this.removeChildren()
      this.cows.end()
    }, 2000);
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



