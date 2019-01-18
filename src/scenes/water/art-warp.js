import { Sprite, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from '../../index';
import {map, backgroundSize} from '../../helpers'
import waterBg from '../../../assets/img/water-bg.jpg'
import waterFg from '../../../assets/img/water-fg.png'


export default class ArtWarp extends Sprite {
  constructor(...args) {
    super(...args);
    this.update = this.update.bind(this)
    this.waterBgTex = new PIXI.Texture.fromImage(waterBg)
    this.waterFgTex = new PIXI.Texture.fromImage(waterFg)
    this.waterBg = new PIXI.Sprite(this.waterBgTex)
    this.waterFg = new PIXI.Sprite(this.waterFgTex)
    // this.waterBg.width =  app.renderer.width
    // this.waterBg.height = app.renderer.height
    // this.waterFg.width =  app.renderer.width
    // this.waterFg.height = app.renderer.height

    const bgSize = backgroundSize(app.renderer.width, app.renderer.height, this.waterBgTex.baseTexture.width, this.waterBgTex.baseTexture.height);
    console.log(app.renderer.width, app.renderer.height, this.waterBgTex.baseTexture);
    console.log(bgSize);

    this.waterBg.scale.set(bgSize.scale);
    this.waterBg.anchor.set(0.5);
    this.waterBg.x = app.renderer.width / 2;
    this.waterBg.y = app.renderer.height / 2;

    this.waterFg.scale.set(bgSize.scale);
    this.waterFg.anchor.set(0.5);
    this.waterFg.x = app.renderer.width / 2;
    this.waterFg.y = app.renderer.height / 2;


    this.addChild(this.waterBg)
    this.addChild(this.waterFg)
 
  }

  update(x,y){
    const moverX = map(x, 0, app.renderer.width, -30, 30);
    const moverY = map(y, 0, app.renderer.height, -10, 10);

    TweenMax.to(this.waterFg, 2,{x:moverX, y:moverY})
  }

  
}

