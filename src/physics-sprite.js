import * as PIXI from 'pixi.js'
import Matter from 'matter-js';
const default_options = {
  friction: 0,
  // density: Matter.Common.random(.2, .6),
  // restitution: 1,
}

class PhysicsSprite {
  constructor (id, engine, category) {
    this._id = id
    this._engine = engine
    this.category = category
    this.isAlive = true
  }
  init (x, y, width, height, texture, type, options) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.texture = texture
    this.type = type
    this.createPhysics()
    this.createSprite()
    //this.options = (options === undefined? default_options : options)
    this.options = default_options
  }
  createPhysics () {

    if (this.type === 'circle') {
      this._body = Matter.Bodies.circle(this.x, this.y, this.width / 3, {
        frictionAir: 0,
        friction: 0,
        frictionStatic: 0,
        density: Matter.Common.random(.2, .6), 
        restitution: 0.5}
      )
    } else {
      this._body = Matter.Bodies.rectangle(this.x, this.y, this.width / 1.5, this.height / 1.5, {
        frictionAir: 0.03,
        friction: 0,
        density: Matter.Common.random(.2, .6),
        frictionStatic: 1,
        restitution: 0}
        )
    }
    this._body.label = this._id
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
    // this._sprite.scale.x = x
    // this._sprite.scale.y = y
    // if (this.type === 'circle') {
    //   const currentRadius = this._body.circleRadius;
    //   const ogRadius = this.width / 3;
    //   const targetRadiusX = ogRadius * x;
    //   const targetRadiusY = ogRadius * y;
    //   const bodyScaleX = targetRadiusX / currentRadius;
    //   const bodyScaleY = targetRadiusY / currentRadius;
    //   Matter.Body.scale(this._body, bodyScaleX, bodyScaleY)  
    // }
  }
  update (msg) {
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
