import { Container, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from './../../setup/app';
import engine from './../../setup/engine';
import {map} from '../../helpers'
import WaterCows from './water-cows'
import WaterBorders from './water-borders'
import config from './../../setup/config'

const gforce = 0.5

export default class WaterScene extends Container {
  constructor(callback) {
    super();
    this.callback = callback;

    this.waterTimer = null

    this.useMouseGravity = false;
    this.mouseGravityTimer = null;
    this.WaterBorders = new WaterBorders()

    this.resize = this.resize.bind(this)
    this.handleMove = this.handleMove.bind(this)
  }

  transitionOut(){
    this.WaterCows.transitionOut()
    this.WaterBorders.removeBorders()
    clearTimeout(this.mouseGravityTimer)
    clearTimeout(this.waterTimer)
    const cows = this.WaterCows.cows
    for (let i = 0; i < cows.length; i++) {
      const s = cows[i];
      TweenMax.to(s._sprite, .3, {alpha: 0, delay: 0.2 * i, onComplete:() => {
        s.destroy();
      }})
    }
    TweenMax.to(this, 1.6,{alpha: 0, onComplete:() => {
      this.callback();
      this.removeChildren()   
    }})

  }

  transitionIn() {
    this.alpha = 1
    this.waterTimer = setTimeout(() => {
      this.transitionOut()
    }, config.waterScene.timer);

    this.WaterBorders.createBorders()

    engine.timing.timeScale = 0.1;
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 5;

    this.WaterCows = new WaterCows()
    this.addChild(this.WaterCows)
    this.WaterCows.animate();
    this.mouseGravityTimer = setTimeout(() => {
      this.useMouseGravity = true
      clearTimeout(this.mouseGravityTimer)
    }, 1000);
  }
  resize() {
    //this.WaterCows.resize()
    this.WaterBorders.createBorders()
  }

  handleMove(x, y) {

    const moverX = map(x, 0, app.renderer.width, -gforce, gforce);
    const moverY = map(y, 0, app.renderer.height, -gforce, gforce);
    
    if (this.useMouseGravity == true) {
      engine.world.gravity.x = moverX;
      engine.world.gravity.y = moverY;
    }
  }

}
