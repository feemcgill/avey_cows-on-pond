import { Container, Texture } from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import app from './../../setup/app'
import engine from './../../setup/engine';
import {loader} from './../../index'
import {backgroundSize} from './../../helpers'
import Matter from 'matter-js'
import IceBorders from './ice-borders'
import IceCows from './ice-cows'


export default class IceScene extends Container {
  constructor(callback) {
    super()
    this.resize = this.resize.bind(this)
    this.animate = this.animate.bind(this)
    this.callback = callback;

    this.iceBorders = new IceBorders();
    this.iceBorders.createBorders();

    this.pondTex = Texture.fromImage(loader.resources.pond.url)
    this.pond = new PIXI.Sprite(this.pondTex)
    this.pond.anchor.set(0.5)
    this.addChild(this.pond )


    this.stainTex = Texture.fromImage(loader.resources.stain.url)
    this.stain = new PIXI.Sprite(this.stainTex)
    this.stain.anchor.set(0.5)
    this.stain.alpha = 0
    this.addChild(this.stain)


    this.overlay = new PIXI.Sprite()
    this.addChild(this.overlay)

    this.waterBgTex = Texture.fromImage(loader.resources.waterBg.url)
    this.waterBg = new PIXI.Sprite(this.waterBgTex)
    this.waterBg.anchor.set(0.5);
    this.overlay.addChild(this.waterBg)
    this.waterBg.blendMode = PIXI.BLEND_MODES.ADD  

    this.cows = new IceCows();
    this.addChild(this.cows);
    this.cows.sendCows();

    this.interactive = true
    this.handleMove = this.handleMove.bind(this)
    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMovee)         
    this.animate()
    this.resize()

    let bottomHits = 0
    Matter.Events.on(engine, 'collisionStart', (event) => {
      var pairs = event.pairs;
      if (pairs[0].bodyB.label == 'bottomhole' || pairs[0].bodyA.label == 'bottomhole') {
        bottomHits ++
        console.log('bottom hit', bottomHits)
        if (bottomHits == 10) {
          this.iceBorders.dropBottom();
          setTimeout(() => {
            this.cows.end()
            this.transitionOut()
          }, 1200);
        }
      }
    });    
  }
  addCows() {
    const cow = CreateCow();
    this.cows.push(cow);
  }
  transitionOut(){

    this.stain.scale.set(0);

    TweenMax.to(this.stain, 0, {alpha: 1})

    TweenMax.to(this.pond, 2, {alpha:0, onComplete: () => {
      this.removeChild(this.pond)
    }})

    setTimeout(() => {
      TweenMax.to(this, 10, {alpha: .20, ease: Expo.easeOut})   
    }, 100);

    TweenMax.to(this.stain.scale, 16, {x:20, y:20, ease: Expo.easeOut, onComplete: () => {}})

    setTimeout(() => {
      this.callback();
    }, 300);

  }

  resize() {
    const bgSize_pond = backgroundSize(app.renderer.width, app.renderer.height, this.pondTex.baseTexture.width, this.pondTex.baseTexture.height)
    this.pond.scale.set(bgSize_pond.scale)
    this.pond.x = app.renderer.width / 2
    this.pond.y = app.renderer.height / 2

    const bgSize = backgroundSize(app.renderer.width, app.renderer.height, this.waterBgTex.baseTexture.width, this.waterBgTex.baseTexture.height);
    this.waterBg.scale.set(bgSize.scale);
    this.waterBg.x = app.renderer.width / 2
    this.waterBg.y = app.renderer.height / 2

    this.stain.scale.set(bgSize.scale)
    this.stain.x = app.renderer.width / 2
    this.stain.y = app.renderer.height / 2
  }

  handleMove(e) {
    var x = e.data.global.x
    var y = e.data.global.y
  }

  update(){
    const moverX = map(x, 0, app.renderer.width, -gforce, gforce);
    const moverY = map(y, 0, app.renderer.height, -gforce, gforce);
    engine.world.gravity.x = moverX;
    engine.world.gravity.y = moverY;

  }
  animate() {
    this.cows.animate();
    window.requestAnimationFrame(this.animate.bind(this))
  }  

}



