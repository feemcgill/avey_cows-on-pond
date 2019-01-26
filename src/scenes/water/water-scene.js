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

const waterTex = new PIXI.Texture.fromImage(loader.resources.displacement.url)
const gforce = 0.5

export default class WaterScene extends Container {
  constructor(callback) {
    super();
    this.callback = callback;


    const coverTex = new PIXI.Texture.fromImage(loader.resources.cover.url)


    this.waterTimer = setTimeout(() => {
      this.transitionOut()
    }, config.waterScene.timer);

    this.useMouseGravity = false;
    this.mouseGravityTimer = null;
    this.WaterBorders = new WaterBorders()
    
    
    // this.artWarp = new ArtWarp()
    // this.artWarp.scale.set(1)
    // this.addChild(this.artWarp)

    this.cover = new PIXI.Sprite(coverTex)
    this.cover.position.set(app.renderer.width / 2, app.renderer.height / 2);
    this.cover.anchor.set(0.5);
    this.addChild(this.cover);


    this.displacementSprite = new PIXI.Sprite(waterTex);
    this.displacementSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
    this.displacementSprite.anchor.set(0.5);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.addChild(this.displacementSprite);
    this.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 10;
    this.displacementFilter.scale.y = 10;
    this.resize = this.resize.bind(this)


    // const logoTex = new PIXI.Texture.fromImage(loader.resources.text.url)
    // this.logo = new PIXI.Sprite(logoTex)
    // this.addChild(this.logo)
    // this.logo.blendMode = PIXI.BLEND_MODES.SCREEN
    // this.logo.scale.set(2)
    // this.logo.anchor.set(0.5)
    // this.logo.alpha = 0;
    // this.logo.x = app.renderer.width / 2
    // this.logo.y = app.renderer.height / 2


    this.interactive = true;
    this.handleMove = this.handleMove.bind(this)
    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMovee);  
  
    setTimeout(() => {
      this.transitionIn()
    }, 2000);
  }

  transitionOut(){
    this.WaterCows.transitionOut()
    this.WaterBorders.removeBorders()
    clearTimeout(this.mouseGravityTimer)
    clearTimeout(this.waterTimer)
    TweenMax.to(this.logo, 0.2, {alpha: 0})
    TweenMax.to(this, 2, {alpha:0, onComplete: () => {
      this.callback();
    }})
  }

  transitionIn() {
    this.WaterBorders.createBorders()

    engine.timing.timeScale = .07;
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 5;

    TweenMax.to(this.cover.scale, 3, {x: 0.8, y: 0.8})
    TweenMax.to(this.cover, 5, {alpha: 1})
    this.WaterCows = new WaterCows()
    this.addChild(this.WaterCows)
    this.WaterCows.animate();
    this.mouseGravityTimer = setTimeout(() => {
      this.useMouseGravity = true
      clearTimeout(this.mouseGravityTimer)
    }, 1000);
  }
  resize() {
    // this.artWarp.resize()
    this.WaterCows.resize()
    this.WaterBorders.createBorders()
  }

  handleMove(e) {
    var x = e.data.global.x;
    var y = e.data.global.y;
    // this.artWarp.update(x,y)
    TweenMax.to(this.displacementSprite,10,{x:x});

    const moverX = map(x, 0, app.renderer.width, -gforce, gforce);
    const moverY = map(y, 0, app.renderer.height, -gforce, gforce);
    
    if (this.useMouseGravity == true) {
      engine.world.gravity.x = moverX;
      engine.world.gravity.y = moverY;
    }

    const textScale = map(y, 0, app.renderer.height, 0.6, 0.8)
    TweenMax.to(this.cover.scale, 3, {x: textScale, y:textScale})
    TweenMax.to(this.cover, 10, {x: (app.renderer.width / 2 - (moverX *30)) })
  }

}
