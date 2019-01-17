import Matter from 'matter-js';
import { Sprite, Point } from 'pixi.js';
import {TweenMax} from "gsap/TweenMax";
import app from '../../index';
import {map} from '../../helpers'
import cowImg from '../../../assets/img/swimmer.png'
import PhysicsSprite from '../../physics-sprite'

// class Cow extends PhysicsSprite {
//   init (x, y, width, height, texture) {
//     super.init(x, y, width, height, texture)
//   }
//   spawn () {}
// }

const canvas = document.getElementById('canvas')
const innerWidth = window.innerWidth
const innerHeight = window.innerHeight
const gforce = 0.05

const engine = Matter.Engine.create({
  // render: {
  //   element: document.body,
  //   canvas: canvas,
  //   visble: false,
  //   options: {
  //     width: innerWidth,
  //     height: innerHeight,
  //     wireframes: true,
  //     showAngleIndicator: true,
  //     background: 'transparent',
  //     wireframeBackground: 'transparent',   
  //   }
  // }
})


const bodies = []
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

var mouseConstraint = Matter.MouseConstraint.create(engine);
Matter.World.add(engine.world, mouseConstraint);

export default class CowSwim extends Sprite {
  constructor(...args) {
    super(...args);
    this.update = this.update.bind(this)
    
    this.cowTex = new PIXI.Texture.fromImage(cowImg)
    this.cow = new PhysicsSprite('swimmer', engine, 0x001)
    this.cow.init(window.innerWidth / 2, window.innerHeight / 2, 700, 422, this.cowTex);
    this.addChild(this.cow.sprite)



    bodies.push(this.cow.body)
    Matter.World.add(engine.world, bodies)
    const offset = 20;
    Matter.World.add(engine.world, [
      Matter.Bodies.rectangle(innerWidth / 2, offset, innerWidth, 10, { isStatic: true }), // top
      Matter.Bodies.rectangle(innerWidth / 2, innerHeight - offset, innerWidth, 10, { isStatic: true }), // bottom
      Matter.Bodies.rectangle(offset, innerHeight / 2, 10, innerHeight, { isStatic: true }), // left
      Matter.Bodies.rectangle(innerWidth - offset, innerHeight / 2, 10, innerHeight, { isStatic: true }), // right

    ]);    
    Matter.Engine.run(engine)
  }


  update(x,y){
    const moverX = map(x, 0, app.renderer.width, -gforce, gforce);
    const moverY = map(y, 0, app.renderer.height, -gforce, gforce);

    engine.world.gravity.x = moverX;
    engine.world.gravity.y = moverY;
    // TweenMax.to(this.waterFg, 2,{x:moverX, y:moverY})
  }

  animate() {
    this.cow.update()
    //Matter.Body.setPosition(this.cow.body, { x: this.cow.body.position.x -= 0.5, y: this.cow.body.position.y })
    window.requestAnimationFrame(this.animate.bind(this))
  }
  
  
}

