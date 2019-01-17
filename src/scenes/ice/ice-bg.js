// import * as PIXI from 'pixi.js'
import { Sprite, Texture, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from '../../index'
import {map} from '../../helpers'

export default class IceBg extends Sprite {
  constructor(speed) {
    var tex = PIXI.Texture.fromVideo('../../../assets/vid/A-sender.mp4');
    super(tex);
  }

  update(x,y) {
   
  }
}