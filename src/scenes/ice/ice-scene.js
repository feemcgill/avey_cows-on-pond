import { Container, Texture } from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import IceBgMask from './ice-bg-mask'
import IceTex from '../../textures/vid-tex'
import app from './../../setup/app'
import {loader} from './../../index'
import {backgroundSize} from './../../helpers'


export default class Example extends Container {
  constructor(...args) {
    super(...args)
    this.resize = this.resize.bind(this)

    this.pondTex = Texture.fromImage(loader.resources.pond.url)
    this.pond = new PIXI.Sprite(this.pondTex)
    this.pond.anchor.set(0.5)
    this.addChild(this.pond )
    
    this.iceTex = new IceTex()
    this.iceBg2 = new PIXI.Sprite(this.iceTex)

    this.addChild(this.iceBg2)
    this.iceBg2.blendMode = PIXI.BLEND_MODES.ADD    
  
    this.interactive = true
    this.handleMove = this.handleMove.bind(this)
    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMovee) 
        
    this.resize()
  }
  resize() {
    console.log('resizzz', app)
    const bgSize = backgroundSize(app.renderer.width, app.renderer.height, this.pondTex.baseTexture.width, this.pondTex.baseTexture.height)

    this.pond.scale.set(bgSize.scale)
    this.pond.x = app.renderer.width / 2
    this.pond.y = app.renderer.height / 2
  }
  handleMove(e) {
    var x = e.data.global.x
    var y = e.data.global.y
    this.iceTex.update(x,y)
  }

}
