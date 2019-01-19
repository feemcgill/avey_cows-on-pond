import Matter from 'matter-js';
import engine from './../../setup/engine';
import app from './../../setup/app'

export default class IceBorders {
  constructor() {
    this.borderBodies = [];
    this.state = {
      bottomDrop: false
    }
    this.top = null
    this.left = null
    this.right = null
    this.bottom = null
    this.ramp_right = null
    this.ramp_left = null

  }
  createBorders() {
    const offset = 150;
    const frame_offset = -500
    const iceDrop_width = 800

    this.top = Matter.Bodies.rectangle(app.renderer.width / 2, frame_offset, app.renderer.width, 100, { isStatic: true })
    this.left = Matter.Bodies.rectangle(frame_offset, app.renderer.height / 2, 100, app.renderer.height, { isStatic: true })
    this.right = Matter.Bodies.rectangle(app.renderer.width - frame_offset, app.renderer.height / 2, 100, app.renderer.height, { isStatic: true })
    this.bottom = Matter.Bodies.rectangle(app.renderer.width / 2, app.renderer.height - offset, iceDrop_width, 100, { label: 'bottomhole',isStatic: true })
    this.ramp_left =  Matter.Bodies.rectangle(
      -(iceDrop_width) / 2,
      app.renderer.height - offset * 1.35, 
      app.renderer.width, 
      100, 
      { isStatic: true }
    )
  
    this.ramp_right =  Matter.Bodies.rectangle(
        app.renderer.width + (iceDrop_width) / 2,
        app.renderer.height - offset * 2.35, 
        app.renderer.width, 
        100, 
        { isStatic: true }
    )
    Matter.Body.rotate(this.ramp_left, Math.PI/45)
    Matter.Body.rotate(this.ramp_right, -Math.PI/45)

    this.borderBodies = [
      this.top,
      this.left,
      this.right,
      this.bottom,
      this.ramp_right,
      this.ramp_left,
    ]
    Matter.World.add(engine.world, this.borderBodies);
    console.log('border_boddies', this.borderBodies);
  }
  removeBorders() {
    if (this.borderBodies.length > 0) {
      Matter.Composite.remove(engine.world, this.borderBodies.bottom)
    }    
  }
  dropBottom() {
    console.log('drop bottom', this.bottom)
    Matter.Composite.remove(engine.world, this.bottom)
  }
}
