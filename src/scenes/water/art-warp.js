import { Sprite, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from '../../index';
import {map} from '../../helpers'
import waterBg from '../../../assets/img/water-bg.jpg'
import waterFg from '../../../assets/img/water-fg.png'


var shaderFrag = `
precision mediump float;
  
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;

void main() {
  //pixel coords are inverted in framebuffer
  vec2 pixelPos = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y);
  if (length(mouse - pixelPos) < 25.0) {
      //gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * 0.7; //yellow circle, alpha=0.7
  } else {
      gl_FragColor = vec4( sin(time), mouse.x/resolution.x, mouse.y/resolution.y, 1) * 0.5; // blend with underlying image, alpha=0.5
  }
}
`;

var filter = new PIXI.Filter(null, shaderFrag);



export default class ArtWarp extends Sprite {
  constructor(...args) {
    super(...args);
    this.update = this.update.bind(this)
    this.waterBgTex = new PIXI.Texture.fromImage(waterBg)
    this.waterFgTex = new PIXI.Texture.fromImage(waterFg)
    this.waterBg = new PIXI.Sprite(this.waterBgTex)
    this.waterFg = new PIXI.Sprite(this.waterFgTex)

    this.filterRect = new PIXI.Graphics()
    this.filterRect.beginFill(0xFFFFFF)
    this.filterRect.drawRect(0, 0, app.renderer.width, app.renderer.height)
    this.filterRect.endFill()

    this.addChild(this.waterBg)
    this.addChild(this.waterFg)
    // this.addChild(this.filterRect)
    // this.filterRect.filters = [filter];

    
  // Animate the filter
  app.ticker.add(function(delta) {
    var v2 = filter.uniforms.mouse;
    var global = app.renderer.plugins.interaction.mouse.global;
    v2[0] = global.x; v2[1] = global.y;
    filter.uniforms.mouse = v2;

    v2 = filter.uniforms.resolution;
    v2[0] = app.screen.width;
    v2[1] = app.screen.height;
    filter.uniforms.resolution = v2;
  });    
  }

  update(x,y){
    const moverX = map(x, 0, app.renderer.width, -30, 30);
    const moverY = map(y, 0, app.renderer.height, -10, 10);

    TweenMax.to(this.waterFg, 2,{x:moverX, y:moverY})
  }

  
}

