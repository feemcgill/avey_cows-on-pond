// import * as PIXI from 'pixi.js'
import { Sprite, Texture, Point } from 'pixi.js';
import pond from '../../../assets/img/pond-1.png'

export default class Thingie extends Sprite {
  constructor() {
    const texture = Texture.fromImage(pond);
    super(texture);
    // this.offset = new Point(0, 0);
    // this.targetOffset = new Point(0, 0);
    this.alpha = 0.9;
  }

}