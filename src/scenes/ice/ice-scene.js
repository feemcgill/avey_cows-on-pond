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
  constructor(callback) {
    super()

    this.alpha = 0;

    this.iceBreakTimer = setTimeout(() => {
      TweenMax.to(this.vidFrames, 2, {animationSpeed: 0.6, onComplete:() => {
        this.iceBreak()
      }})
    }, config.iceScene.timer);

    engine.timing.timeScale = 1;
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 5;
        
    this.resize = this.resize.bind(this)
    this.animate = this.animate.bind(this)
    this.callback = callback;

    this.iceBorders = new IceBorders();
    this.iceBorders.createBorders();

    this.pondTex = Texture.fromImage(loader.resources.pond.url)

    let pondCrackSequence = [
      loader.resources.pond.url,
      loader.resources.pond_crack_1.url,
      loader.resources.pond_crack_2.url,
      loader.resources.pond_crack_3.url,
      loader.resources.pond_crack_4.url,
      loader.resources.pond_crack_5.url,
      loader.resources.pond_crack_6.url,
      loader.resources.pond_crack_7.url
    ];

    let pondTextureArray = [];
    
    for (let i=0; i < pondCrackSequence.length; i++)
    {
         let texture = PIXI.Texture.fromImage(pondCrackSequence[i]);
         pondTextureArray.push(texture);
    };
    
    this.pond = new PIXI.extras.AnimatedSprite(pondTextureArray);    

    this.pond.anchor.set(0.5)
    this.pond.animationSpeed = 0.2
    this.pond.loop = false
    this.addChild(this.pond )
    
    let vidFrameImages = [
      loader.resources.vid1.url,
      loader.resources.vid2.url,
      loader.resources.vid3.url,
      loader.resources.vid4.url,
      loader.resources.vid5.url,
      loader.resources.vid6.url
    ];
    let textureArray = [];
    
    for (let i=0; i < vidFrameImages.length; i++) {
      let texture = PIXI.Texture.fromImage(vidFrameImages[i]);
      textureArray.push(texture);
    };
    
    this.vidBox = new PIXI.Sprite()
    this.vidBox.mask = this.pond    
    this.addChild(this.vidBox)

    this.vidGpx = new PIXI.Graphics();
    this.vidGpx.beginFill(0x000000)
    this.vidGpx.drawRect(0, 0, app.renderer.width, app.renderer.height)
    this.vidGpx.endFill()
    this.vidBox.addChild(this.vidGpx)

    this.vidFrames = new PIXI.extras.AnimatedSprite(textureArray)
    this.vidBox.addChild(this.vidFrames);

    this.vidFrames.anchor.set(0.5)
    this.vidFrames.x = app.renderer.width / 2
    this.vidFrames.y = app.renderer.height / 2
    this.vidFrames.animationSpeed = 0.02
    this.vidFrames.width = app.renderer.width;
    this.vidFrames.height = app.renderer.height;
    this.vidFrames.play()

    this.cows = new IceCows();
    this.addChild(this.cows);
    this.interactive = true
    this.handleMove = this.handleMove.bind(this)
    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMovee)         
    this.animate()
    this.resize()
    
    this.logo = new PIXI.Sprite.fromImage(loader.resources.at_name.url)
    this.logo.alpha = 0
    this.logo.anchor.set(0.5)
    this.logo.scale.set(0.5)
    this.logo.x = app.renderer.width / 2
    this.logo.y = 170
    this.addChild(this.logo)
    this.logo.interactive = true
    this.logo.buttonmode = true
    this.logo.cursor = 'pointer'
    // Reveal the scene
    this.transitionIn()
    
    const maxBottomHits = config.iceScene.bottomHits
    let bottomHits = 0
    Matter.Events.on(engine, 'collisionStart', (event) => {
      var pairs = event.pairs;
      if (pairs[0].bodyB.label == 'bottomhole' || pairs[0].bodyA.label == 'bottomhole') {
        bottomHits ++
        this.vidFrames.animationSpeed += 0.05
        if (bottomHits >= maxBottomHits - 3) {
          this.pond.gotoAndStop(this.pond.currentFrame + 1)
        }
        if (bottomHits == maxBottomHits) {
          this.iceBreak();
        }
      }
    });    
  }

  iceBreak(){
    clearTimeout(this.iceBreakTimer)

    setTimeout(() => {
      this.iceBorders.dropBottom();
    }, 300);        
    
    this.pond.play();
    this.pond.onComplete = () => {

      TweenMax.to(this.pond.scale, 1, {x: 10, y: 10})
      TweenMax.to(this.vidFrames, 1, {alpha: 0})
      TweenMax.to(this.logo.scale, 2, {x: 0, y:0})

      this.cows.end()

      setTimeout(() => {
        this.transitionOut()
      }, 1000);
    }
    setTimeout(() => {
      this.iceBorders.dropBottom();
    }, 300);    
  }

  transitionIn() {
    TweenMax.to(this.logo, 5, {alpha: 1, delay: 2})
    TweenMax.to(this, 6, {alpha: 1, onComplete:() => {
      this.cows.sendCows();
    }})
  }
  transitionOut(){
    TweenMax.to(this.vidFrames, 0.5, {alpha: 0})
    TweenMax.to(this, 5, {alpha: 0})
    this.callback();
    this.iceBorders.removeBorders();
  }

  resize() {
    const bgSize_pond = backgroundSize(app.renderer.width, app.renderer.height, this.pondTex.baseTexture.width, this.pondTex.baseTexture.height)
    this.pond.scale.set(bgSize_pond.scale)
    this.pond.x = app.renderer.width / 2
    this.pond.y = app.renderer.height / 2
  }

  handleMove(e) {
    var x = e.data.global.x
    var y = e.data.global.y
    const moverX = map(x, 0, app.renderer.width, 10, -10)
    const moverY = map(y, 0, app.renderer.height, 10, -10)
    const textScale = map(y, 0, app.renderer.height, 0.3, 0.5)

    TweenMax.to(this.logo, 10, {
      x: app.renderer.width/2 + (moverX * 1), 
      y: 170  + (moverY * 1)
    })

  }

  update(){

  }
  animate() {
    this.cows.animate();
    window.requestAnimationFrame(this.animate.bind(this))
  }  

}



