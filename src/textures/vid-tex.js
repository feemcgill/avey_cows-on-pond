import { Texture } from 'pixi.js'
import app from './../setup/app'
import {map} from '../helpers'

export default class VidTex extends Texture {
  constructor() {
    var tex = PIXI.Texture.fromVideo('../../../assets/vid/A-sender.mp4', new PIXI.Rectangle(100,100,200,200));
    super(tex);
    this.texture = tex
    this.texture.baseTexture.source.muted = true
    this.texture.baseTexture.source.autoplay = true;
    this.texture.baseTexture.source.loop = true;
    this.texture.baseTexture.source.playbackRate = 1;
  }

  update(x,y) {
    var moverX = map(x, 0, app.renderer.width, 0.1, 10);
    this.texture.baseTexture.source.playbackRate = moverX;  
  }
}