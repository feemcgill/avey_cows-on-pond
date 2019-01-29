import { Container, Texture, extras } from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import app from './../../setup/app'
import engine from './../../setup/engine'
import loader from './../../setup/loader'
import {backgroundSize, map, backgroundContain} from './../../helpers'
import Matter from 'matter-js'
import config from './../../setup/config'
import {state} from './../../index'

export default class BgCover extends Container {
  constructor() {
    super()

    this.cover_size_contain = null
    this.cover_size_fill = null
    this.pond_size = null

    this.canMove = false;
        
    this.resize = this.resize.bind(this)

    this.waterTex = new PIXI.Texture.fromImage(loader.resources.waterBg.url)
    this.coverTex = new PIXI.Texture.fromImage(loader.resources.cover.url)

    this.container = new PIXI.Container()
    this.addChild(this.container)

    this.water = new PIXI.Sprite(this.waterTex)
    this.water.anchor.set(0.5)
    this.container.addChild(this.water)

    this.cover = new PIXI.Sprite(this.coverTex)
    this.cover.anchor.set(0.5)
    this.container.addChild(this.cover)

    this.maskGraphics = new PIXI.Graphics()
    this.maskGraphics.beginFill(0xFFFFFF)
    this.addChild(this.maskGraphics)

    this.container.mask = this.maskGraphics

    this.resize()
    
  
  }

  transitionToWater(){
    this.canMove = false
    TweenMax.killTweensOf(this.cover.scale)
    TweenMax.to(this.cover.scale, 3, {x: this.cover_size_contain.scale, y: this.cover_size_contain.scale, onComplete:() => {
      this.canMove = true
    }
    })
  }

  transitionToIce() {
    this.canMove = true
    TweenMax.to(this.cover.scale, 0.2, {x: this.cover_size_fill.scale, y:this.cover_size_fill.scale })
  }

  resize() {
    this.cover_size_fill = backgroundSize(app.renderer.width, app.renderer.height, this.coverTex.baseTexture.width, this.coverTex.baseTexture.height)
    this.cover_size_contain = backgroundContain(app.renderer.width, app.renderer.height, this.coverTex.baseTexture.width, this.coverTex.baseTexture.height)

    const bgSize_water = backgroundSize(app.renderer.width, app.renderer.height, this.waterTex.baseTexture.width, this.waterTex.baseTexture.height)
    this.water.scale.set(bgSize_water.scale * 1.1)

    this.water.x = app.renderer.width / 2
    this.water.y = app.renderer.height / 2

    this.cover.x = app.renderer.width / 2
    this.cover.y = app.renderer.height / 2




    this.pond_size = backgroundContain(app.renderer.width, app.renderer.height, loader.resources.pond.texture.orig.width, loader.resources.pond.texture.orig.height)
    
    this.maskGraphics.removeChildren()
    this.maskGraphics.drawRect(0, 0, this.pond_size.w, this.pond_size.h)    
    this.maskGraphics.position.x = (app.renderer.width / 2) - (this.maskGraphics.width / 2);
    this.maskGraphics.position.y = (app.renderer.height / 2) - (this.maskGraphics.height / 2);

    if (state.currentScene == 'water') {
      TweenMax.to(this.water, 0.5, {
        x: app.renderer.width/2, 
        y: app.renderer.height/2, 
      })
    } 
  }

  handleMove(x,y) {

    const moverX = map(x, 0, app.renderer.width, 10, -10)
    const moverY = map(y, 0, app.renderer.height, 10, -10)
    let bgScale = map(y, 0, app.renderer.height, 1.1, 1.2)

    if (state.currentScene == 'water') {

      TweenMax.to(this.water, 15, {
        x: app.renderer.width/2 + (-moverX * 4), 
        y: app.renderer.height/2 + (-moverY * 2), 
      })

      bgScale = map(y, 0, app.renderer.height, this.cover_size_contain.scale * 0.9, this.cover_size_contain.scale * 0.75)
    } else {
      bgScale = map(y, 0, app.renderer.height, this.cover_size_fill.scale * 1.05, this.cover_size_fill.scale * 1.2)
    }
    if (this.canMove) {
      TweenMax.to(this.cover, 1, {
        x: app.renderer.width/2 + (moverX * 8), 
        y: app.renderer.height/2 + (moverY * 8), 
      })
      TweenMax.to(this.cover.scale, 10, {
        x: bgScale, 
        y: bgScale, 
      })
    }
  }

 


}



