import * as PIXI from 'pixi.js'
import Matter from 'matter-js';

class PhysicsSprite {
  constructor (id, engine, category) {
    this._id = id
    this._engine = engine
    this.category = category
    this.isAlive = true
  }
  init (x, y, width, height, texture, type) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.texture = texture
    this.type = type
    this.createPhysics()
    this.createSprite()
  }
  createPhysics () {
    let options = {
      frictionAir: 0.6, //Matter.Common.random(.3, .8),
      friction: Matter.Common.random(0.05, 0.2),
      label: this._id,
      density: Matter.Common.random(2, 6),
      restitution: 0.1,
      // collisionFilter: {
      //   mask: this.category
      // }
    }
    console.log(Matter.Common.random(3, 5))
    if (this.type === 'circle') {
      this._body = Matter.Bodies.circle(this.x, this.y, this.width / 3, options)
    } else {
      this._body = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height, options)
    }
  }
  createSprite () {
    this._sprite = new PIXI.Sprite(this.texture)
    this._sprite.width = this.width
    this._sprite.height = this.height
    this._sprite.anchor.x = 0.5
    this._sprite.anchor.y = 0.5
  }
  get body () {
    return this._body
  }
  set body (newBody) {
    this._body = newBody
  }
  get sprite () {
    return this._sprite
  }
  set sprite (newSprite) {
    this._sprite = newSprite
  }
  get id () {
    return this._id
  }
  set id (id) {
    this._id = id
  }

  scale (x,y) {
    this._sprite.scale.x = x
    this._sprite.scale.y = y
    if (this.type === 'circle') {
      const currentRadius = this._body.circleRadius;
      const ogRadius = this.width / 3;
      const targetRadiusX = ogRadius * x;
      const targetRadiusY = ogRadius * y;
      const bodyScaleX = targetRadiusX / currentRadius;
      const bodyScaleY = targetRadiusY / currentRadius;
      Matter.Body.scale(this._body, bodyScaleX, bodyScaleY)  
    }
  }
  update () {
    if (this._body) {
      this._sprite.position = this._body.position
      this._sprite.rotation = this._body.angle
    }
  }
  destroy () {
    this.isAlive = false
    Matter.World.remove(this._engine.world, this._body)
  }
}
export default PhysicsSprite
