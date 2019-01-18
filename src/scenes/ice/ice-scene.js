import { Container, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import IceStage from './ice-stage';
import IceBgMask from './ice-bg-mask';
import IceTex from '../../textures/vid-tex';
import app from '../../index';


export default class Example extends Container {
  constructor(...args) {
    super(...args);

    
    const iceBgMask = new IceBgMask();
    iceBgMask.setInitialPoint(0,0);
    this.addChild(iceBgMask);
    
    const iceStage = new IceStage();
    iceStage.setInitialPoint(0,0);
    this.addChild(iceStage);
    
    
    this.iceTex = new IceTex();
    this.iceBg2 = new PIXI.Sprite(this.iceTex);

    this.addChild(this.iceBg2);
    this.iceBg2.blendMode = PIXI.BLEND_MODES.ADD;    

    this.mousepos = new Point(500, 500);
  
    this.interactive = true;
    this.handleMove = this.handleMove.bind(this)
    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMovee);  
  }

  handleMove(e) {
    var x = e.data.global.x;
    var y = e.data.global.y;
    this.iceTex.update(x,y);
  }

  // mousemove(e) {
  //   console.log('mouse mover');
  //   const { x, y } = e.data.global;
  //   if (this.mousepos.x !== x && this.mousepos.y !== y) {
  //     this.mousepos.set(x, y);
  //   }
  //   console.log('mm',x,y);
  // }
}
