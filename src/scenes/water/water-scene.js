import { Container, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from '../../index';
import {map} from '../../helpers'
import WaterVidJam from './water-vid-jam'
import ArtWarp from './art-warp'
import CowSwim from './cow-swim'
import waterBg from '../../../assets/img/disp-14.png'

const waterTex = new PIXI.Texture.fromImage(waterBg)

export default class WaterScene extends Container {
  constructor(...args) {
    super(...args);
    // this.waterVidJam = new WaterVidJam();
    // this.waterVidJam.makeVidJam();
    // this.addChild(this.waterVidJam);
    
    this.artWarp = new ArtWarp()
    this.artWarp.x = -100
    this.artWarp.y = -100
    this.artWarp.width = 1.1
    this.artWarp.height = 1.1
    this.addChild(this.artWarp)

    this.cowSwim = new CowSwim()
    this.addChild(this.cowSwim)
    this.cowSwim.animate();

    this.displacementSprite = new PIXI.Sprite(waterTex);
    // this.displacementSprite.width = app.renderer.width
    // this.displacementSprite.height = app.renderer.height
    this.displacementSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
    this.displacementSprite.anchor.set(0.5);

    //this.displacementSprite.scale.set(0.2);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    
    this.addChild(this.displacementSprite);
    //displacementSprite.alpha = 0.1;
  
    //this.artWarp.mask = this.displacementSprite;
    this.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 10;
    this.displacementFilter.scale.y = 10;
    // displacementSprite.anchor.set(0.5);
  
  



    this.interactive = true;
    this.handleMove = this.handleMove.bind(this)
    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMovee);  
  

  }




  handleMove(e) {
    var x = e.data.global.x;
    var y = e.data.global.y;
    //this.waterVidJam.update(x,y)
    this.artWarp.update(x,y)
    this.cowSwim.update(x,y);
    TweenMax.to(this.displacementSprite,10,{x:x});
  }

}
