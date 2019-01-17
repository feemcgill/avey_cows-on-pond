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
  //friction: .001, restitution: .1, density: 5.5
  createPhysics () {
    let options = {
      //frictionAir: 0,
      friction: .001,
      inertia: 1,
      mass: 0.0000001,
      label: this._id,
      density: 5.5,
      restitution: 0.1,
      // collisionFilter: {
      //   mask: this.category
      // }
    }
    //options = { friction: .001, restitution: .1, density: 5.5 }
    if (this.type === 'circle') {
      this._body = Matter.Bodies.circle(this.x, this.y, this.width, options)
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
