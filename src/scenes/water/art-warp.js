import { Sprite, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from './../../setup/app';
import {map, backgroundSize} from '../../helpers'
import loader from './../../setup/loader'

export default class ArtWarp extends Sprite {
  constructor(...args) {
    super(...args);
    this.update = this.update.bind(this)
    this.resize = this.resize.bind(this)

    this.waterBgTex = new PIXI.Texture.fromImage(loader.resources.waterBg.url)
    this.waterFgTex = new PIXI.Texture.fromImage(loader.resources.waterFg.url)
    this.waterBg = new PIXI.Sprite(this.waterBgTex)
    this.waterFg = new PIXI.Sprite(this.waterFgTex)
    
    this.waterBg.anchor.set(0.5);
    this.waterFg.anchor.set(0.5);

    this.addChild(this.waterBg)
    this.addChild(this.waterFg)




    this.resize();
  }

  resize() {
    const bgSize = backgroundSize(app.renderer.width + 100, app.renderer.height + 100, this.waterBgTex.baseTexture.width, this.waterBgTex.baseTexture.height);

    this.waterBg.scale.set(bgSize.scale);
    this.waterBg.x = app.renderer.width / 2;
    this.waterBg.y = app.renderer.height / 2;

    this.waterFg.scale.set(bgSize.scale);
    this.waterFg.x = app.renderer.width / 2;
    this.waterFg.y = app.renderer.height / 2;
  }
  
  update(x,y){
    const moverX = map(x, 0, app.renderer.width, (app.renderer.width /2) -30, (app.renderer.width /2) + 30);
    const moverY = map(y, 0, app.renderer.height, (app.renderer.height /2) -10, (app.renderer.height /2) + 10);
    TweenMax.to(this.waterFg, 2,{x:moverX, y:moverY})
  }

  
}

