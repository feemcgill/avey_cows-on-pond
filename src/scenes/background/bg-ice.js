import { Container, Texture, extras, Sprite} from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import app from './../../setup/app'
import engine from './../../setup/engine'
import loader from './../../setup/loader'
import {backgroundSize, map} from './../../helpers'
import Matter from 'matter-js'
import config from './../../setup/config'


export default class BgIce extends Sprite {
  constructor(callback) {
    super()


        
    this.resize = this.resize.bind(this)



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

    this.pondTextureArray = [];
    
    for (let i=0; i < pondCrackSequence.length; i++)
    {
         let texture = PIXI.Texture.fromImage(pondCrackSequence[i]);
         this.pondTextureArray.push(texture);
    };
    
    this.pond = new PIXI.extras.AnimatedSprite(this.pondTextureArray);    

    this.pond.anchor.set(0.5)
    this.pond.animationSpeed = 0.2
    this.pond.loop = false
    this.addChild(this.pond )
    this.pond.blendMode = PIXI.BLEND_MODES.ADD;
    //this.pond.alpha = 0



    this.iceBg = new PIXI.Graphics();
    this.iceBg.beginFill(0xFFFFFF)
    this.addChild(this.iceBg)

       
    this.resize()

    
  }

  crackPond() {
    this.pond.gotoAndStop(this.pond.currentFrame + 1)
  }

  breakPond() {
    this.pond.play();
    this.pond.onComplete = () => {
      setTimeout(() => {
        TweenMax.to(this.pond.scale, 1, {x: 10, y: 10, onComplete:() => {
          this.pond.alpha = 0
        }})
      }, 200);
    }
  }

  transitionToIce() {
    this.pond.gotoAndStop(0)
    this.pond.alpha = 1
    this.iceBg.alpha = 1

    this.resize()
    TweenMax.to(this.iceBg, 3, {alpha: 0})
  }
  resize() {
    const bgSize_pond = backgroundSize(app.renderer.width, app.renderer.height, this.pondTextureArray[0].baseTexture.width, this.pondTextureArray[0].baseTexture.height)
    this.pond.scale.set(bgSize_pond.scale)

    this.pond.x = app.renderer.width / 2
    this.pond.y = app.renderer.height / 2
    
    
    this.iceBg.removeChildren()
    this.iceBg.drawRect(0, 0, app.renderer.width, app.renderer.height)


  }



 


}



