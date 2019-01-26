import { Container, Texture, extras } from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import app from './../../setup/app'
import engine from './../../setup/engine'
import loader from './../../setup/loader'
import {backgroundSize, map} from './../../helpers'
import Matter from 'matter-js'
import config from './../../setup/config'


export default class BgCover extends Container {
  constructor() {
    super()


        
    this.resize = this.resize.bind(this)



    this.coverTex = new PIXI.Texture.fromImage(loader.resources.cover.url)


    this.cover = new PIXI.Sprite(this.coverTex)
    this.cover.anchor.set(0.5)
    this.addChild(this.cover)

    this
        .on('mousemove', this.handleMove)
        .on('touchmove', this.handleMove)         
    this.resize()
    
  
  }

  transitionIn() {

  }
  transitionOut(){

  }

  resize() {

    const bgSize_cover = backgroundSize(app.renderer.width, app.renderer.height, this.coverTex.baseTexture.width, this.coverTex.baseTexture.height)
    this.cover.scale.set(bgSize_cover.scale)

    this.cover.x = app.renderer.width / 2
    this.cover.y = app.renderer.height / 2
  }

  handleMove(e) {
    var x = e.data.global.x
    var y = e.data.global.y

    const moverX = map(x, 0, app.renderer.width, 10, -10)
    const moverY = map(y, 0, app.renderer.height, 10, -10)
    const bgScale = map(y, 0, app.renderer.height, 1.1, 1.2)

    TweenMax.to(this.cover, 15, {
      x: app.renderer.width/2 + (moverX * 4), 
      y: app.renderer.height/2 + (moverY * 2), 
    })
    TweenMax.to(this.cover.scale, 3, {
      x: bgScale, 
      y: bgScale, 
    })
  }

 


}



