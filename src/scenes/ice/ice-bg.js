// import * as PIXI from 'pixi.js'
import { Sprite, Texture, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";

export default class IceBg extends Sprite {
  constructor(speed) {
    var texture = PIXI.Texture.fromVideo('../../../assets/vid/A-sender.mp4');

    super(texture);
    console.log(texture.baseTexture.source);
    texture.baseTexture.source.muted = true
    texture.baseTexture.source.autoplay = true;
    texture.baseTexture.source.loop = true;
    texture.baseTexture.source.playbackRate = speed;
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