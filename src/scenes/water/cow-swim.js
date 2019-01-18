import Matter from 'matter-js';
import { Sprite, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from './../../setup/app';
import engine from './../../setup/engine';
import {map} from '../../helpers'
import PhysicsSprite from '../../physics-sprite'
import {loader} from './../../index'


const gforce = 10



let border_bodies = [];
function createBorders() {
  const offset = -150;
  if (border_bodies.length > 0) {
    Matter.Composite.remove(engine.world, border_bodies)
  }
  border_bodies = [
    Matter.Bodies.rectangle(app.renderer.width / 2, offset, app.renderer.width, 100, { isStatic: true }), // top
    Matter.Bodies.rectangle(app.renderer.width / 2, app.renderer.height - offset, app.renderer.width, 100, { isStatic: true }), // bottom
    Matter.Bodies.rectangle(offset, app.renderer.height / 2, 100, app.renderer.height, { isStatic: true }), // left
    Matter.Bodies.rectangle(app.renderer.width - offset, app.renderer.height / 2, 100, app.renderer.height, { isStatic: true }), // right
  ]
  Matter.World.add(engine.world, border_bodies);
}
var stack = Matter.Composites.stack(0, 0, 10, 10, 0, 0, function(x, y, column, row) {
  return Matter.Bodies.circle(x, y, Matter.Common.random(50, 50), { friction: .001, restitution: .1, density: 5.5 });
});

function createCows(){
  const cows = [];
  const cowTex = new PIXI.Texture.fromImage(loader.resources.swimmer.url)


  Matter.Composites.stack(0,0, 6, 4, 0, 0, function(x, y, column, row) {

    const cow = new PhysicsSprite('swimmer', engine, 0x001)
    cow.init(Matter.Common.random(0,app.renderer.width), Matter.Common.random(0,app.renderer.height), 350, 211, cowTex, 'circle')
    // cow.scale(0.5, 0.5)
    cows.push(cow);
    cow.sprite.alpha = 0.8
    cow.sprite.interactive = true
    cow.sprite.defaultCursor = 'pointer'
  });
  console.log(cows.length);
  return cows;
}

export default class CowSwim extends Sprite {
  constructor(...args) {
    super(...args);
    const t = this;
    this.update = this.update.bind(this)
    this.resize = this.resize.bind(this)
    this.cows = createCows();
    for (let i = 0; i < this.cows.length; i++) {
      const s = this.cows[i];
      Matter.World.add(engine.world, s.body)
      t.addChild(s.sprite)
    }
    this.resize();
  }

  resize() {
    createBorders();
    // let cowSize = 1;
    // if (app.renderer.width < 800) {   
    //   cowSize = 0.3;
    // }
    // for (let i = 0; i < this.cows.length; i++) {
    //   const e = this.cows[i];
    //   e.scale(cowSize, cowSize)
    // }       
  }

  update(x,y){
    const moverX = map(x, 0, app.renderer.width, -gforce, gforce);
    const moverY = map(y, 0, app.renderer.height, -gforce, gforce);
    engine.world.gravity.x = moverX;
    engine.world.gravity.y = moverY;
  }

  animate() {
    for (let i = 0; i < this.cows.length; i++) {
      const e = this.cows[i];
      e.update()
    }
    window.requestAnimationFrame(this.animate.bind(this))
  }
  
  
}

