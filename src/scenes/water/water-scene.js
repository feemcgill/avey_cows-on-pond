import { Container, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from './../../setup/app';
import engine from './../../setup/engine';
import {map} from '../../helpers'
import WaterVidJam from './water-vid-jam'
import ArtWarp from './art-warp'
import CowSwim from './cow-swim'
import waterBg from '../../../assets/img/disp-14.png'

const waterTex = new PIXI.Texture.fromImage(waterBg)
const gforce = 5


export default class WaterScene extends Container {
  constructor(...args) {
    super(...args);

    engine.timing.timeScale = .1;
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 5;
    
    this.artWarp = new ArtWarp()
    // this.artWarp.x = -100
    // this.artWarp.y = -100
    // this.artWarp.width = 1.1
    // this.artWarp.height = 1.1
    this.addChild(this.artWarp)

    this.cowSwim = new CowSwim()
    this.addChild(this.cowSwim)
    this.cowSwim.animate();

    this.displacementSprite = new PIXI.Sprite(waterTex);
    this.displacementSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
    this.displacementSprite.anchor.set(0.5);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    
    this.addChild(this.displacementSprite);

    this.filters = [this.displacementFilter];
    this.displacementFilter.scale.x = 10;
    this.displacementFilter.scale.y = 10;
  
    this.resize = this.resize.bind(this)

    this.interactive = true;
    this.handleMove = this.handleMove.bind(this)
    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMovee);  
  

  }


  resize() {
    console.log('water scene resize');
    this.artWarp.resize()
    this.cowSwim.resize()
  }

  handleMove(e) {
    var x = e.data.global.x;
    var y = e.data.global.y;
    //this.waterVidJam.update(x,y)
    this.artWarp.update(x,y)
    TweenMax.to(this.displacementSprite,10,{x:x});
    const moverX = map(x, 0, app.renderer.width, -gforce, gforce);
    const moverY = map(y, 0, app.renderer.height, -gforce, gforce);
    engine.world.gravity.x = moverX;
    engine.world.gravity.y = moverY;
  }

}
