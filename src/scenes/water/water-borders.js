import Matter from 'matter-js';
import app from './../../setup/app';
import engine from './../../setup/engine';
import TweenMax from 'gsap/TweenMaxBase';


export default class WaterBorders {
 constructor(){
   this.offset = -50
   this.border_bodies = []
   this.squeeze = this.squeeze.bind(this)
   setTimeout(() => {
     this.squeeze()
   }, 3000);
 }

 squeeze() {
   TweenMax.to(this.border_bodies[0].position ,5,{y: this.offset, onComplete: () => {
    Matter.Body.setStatic(this.border_bodies[0], true)
   } })
 }
 createBorders() {
  if (this.border_bodies.length > 0) {
    Matter.Composite.remove(engine.world, this.border_bodies)
  }

  this.border_bodies = [
    Matter.Bodies.rectangle(
      app.renderer.width / 2,
      -app.renderer.height * 2,
      app.renderer.width,
      100,
      //{ isStatic: true }
    ), // top

    Matter.Bodies.rectangle(
      app.renderer.width / 2,
      app.renderer.height - this.offset,
      app.renderer.width,
      100,
      { isStatic: true }
    ), // bottom

    Matter.Bodies.rectangle(
      this.offset, 
      0,
      100, 
      app.renderer.height * 2, 
      { isStatic: true }
    ), // left

    Matter.Bodies.rectangle(
      app.renderer.width - this.offset,
      0,
      100,
      app.renderer.height * 2,
      { isStatic: true }
    ), // right
  ]
  Matter.World.add(engine.world, this.border_bodies);   
 }
 removeBorders(){
  Matter.Composite.remove(engine.world, this.border_bodies);
 }
}


