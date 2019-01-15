// import * as PIXI from 'pixi.js'
import { Sprite, Texture, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import pondBg from '../../../assets/img/pond-bg-mask.png'

export default class IceBgMask extends Sprite {
  constructor() {
    console.log('fuuuuuu');
    var texture = PIXI.Texture.fromImage(pondBg);
    super(texture);
    // this.offset = new Point(0, 0);
    // this.targetOffset = new Point(0, 0);
    this.originPosition = new Point(0, 0);
  }

  setInitialPoint(x, y) {
    this.position.set(x, y);
    this.originPosition.set(x, y);
  }

  update() {
  }
}