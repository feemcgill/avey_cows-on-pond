import { Container, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from './../../setup/app';
import engine from './../../setup/engine';
import {map} from '../../helpers'
import ArtWarp from './art-warp'
import WaterCows from './water-cows'
import WaterBorders from './water-borders'
import loader from './../../setup/loader'
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

    this.interactive = true;
    this.handleMove = this.handleMove.bind(this)
    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMovee);  
  
  }

  transitionOut(){
    this.WaterCows.transitionOut()
    this.WaterBorders.removeBorders()
    clearTimeout(this.mouseGravityTimer)
    clearTimeout(this.waterTimer)
    TweenMax.to(this, 2, {alpha:0, onComplete: () => {
      this.callback();
    }})
  }

  transitionIn() {
    this.waterTimer = setTimeout(() => {
      this.transitionOut()
    }, config.waterScene.timer);

    this.WaterBorders.createBorders()

    engine.timing.timeScale = .07;
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
    this.WaterCows.resize()
    this.WaterBorders.createBorders()
  }

  handleMove(e) {
    var x = e.data.global.x;
    var y = e.data.global.y;

    //TweenMax.to(this.displacementSprite,10,{x:x});

    const moverX = map(x, 0, app.renderer.width, -gforce, gforce);
    const moverY = map(y, 0, app.renderer.height, -gforce, gforce);
    
    // if (this.useMouseGravity == true) {
    //   engine.world.gravity.x = moverX;
    //   engine.world.gravity.y = moverY;
    // }


  }

}
