import { Container, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import VidTex from '../../textures/vid-tex';
import app from './../../setup/app';
import {map} from '../../helpers'


export default class WaterVidJam extends Container {
  constructor(...args) {
    super(...args);
    this.vidSprites = [];
    this.vidTex = new VidTex();
    this.update = this.update.bind(this)
    this.makeVidJam = this.makeVidJam.bind(this)
  }

  makeVidJam() {
    //console.log(app);
    for (let index = 0; index < 3; index++) {
      const sprite = new PIXI.Sprite(this.vidTex);
      const g = new PIXI.Graphics();
      g.beginFill(0xFFFF00)
      g.drawRect((index * (app.renderer.width / 3)),0, (app.renderer.width / 3), app.renderer.height)
      g.endFill()
      this.addChild(sprite)
      sprite.mask = g
      this.vidSprites.push(sprite);
    }
  }

  update(x,y){
    var moverX = map(x, 0, app.renderer.width, 1, 20);

    for (let i = 0; i < this.vidSprites.length; i++) {
      const e = this.vidSprites[i];
      TweenMax.to(e.scale, 1.2, {x: moverX, delay: (i * 0.2)})
    }
  }
}
