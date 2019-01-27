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
    const frame_offset = 200
    const iceDrop_width = 800
    const borderThickness = 100
    const rampThickness = 20

    this.top = Matter.Bodies.rectangle(app.renderer.width / 2, -frame_offset, app.renderer.width, borderThickness, { isStatic: true })
    this.left = Matter.Bodies.rectangle(-frame_offset, app.renderer.height / 2, borderThickness, app.renderer.height, { isStatic: true })
    this.right = Matter.Bodies.rectangle(app.renderer.width + frame_offset, app.renderer.height / 2, borderThickness, app.renderer.height, { isStatic: true })

    this.bottom = Matter.Bodies.rectangle(app.renderer.width / 2, app.renderer.height / 1.2, app.renderer.width * 2, 100, { label: 'bottomhole',isStatic: true })
    
    
    this.ramp_left =  Matter.Bodies.rectangle(
      -(iceDrop_width) / 3,
      app.renderer.height - offset * 1.7, 
      app.renderer.width, 
      rampThickness, 
      { isStatic: true }
    )
  
    this.ramp_right =  Matter.Bodies.rectangle(
      app.renderer.width + (iceDrop_width) / 3,
      app.renderer.height - offset * 1.7, 
      app.renderer.width, 
      rampThickness, 
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
  }
  removeBorders() {
    if (this.borderBodies.length > 0) {
      Matter.Composite.remove(engine.world, this.borderBodies)
    }    
  }
  dropBottom() {
    Matter.Composite.remove(engine.world, this.bottom)
  }
}
