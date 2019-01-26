import app from './setup/app'
import Matter from 'matter-js';
import engine from './setup/engine'
import IceScene from './scenes/ice/ice-scene'
import WaterScene from './scenes/water/water-scene'
import {debounce, getWindowSize} from './helpers'
import loader from './setup/loader'
import BgIce from './scenes/background/bg-ice'
import BgCover from './scenes/background/bg-cover'

document.body.appendChild(app.view);

let waterBg
let waterScene
let iceScene 
let bgCover
let bgIce
let displacementSprite
let displacementFilter

const bgWrap = new PIXI.Container()
const waterWrap = new PIXI.Container()
const iceWrap = new PIXI.Container()

const state = {
  currentScene: null
}

app.stage.addChild(bgWrap)
app.stage.addChild(waterWrap)
app.stage.addChild(iceWrap)



loader.load((loader, resources) => {
  bgCover = new BgCover()
  bgIce = new BgIce()
  //bgIce.alpha = 0.3
  bgWrap.addChild(bgCover)
  bgWrap.addChild(bgIce)

  iceScene = new IceScene(launchWater, breakIce, crackIce);
  waterScene = new WaterScene(launchIce);

  waterWrap.addChild(waterScene);
  iceWrap.addChild(iceScene);

  const waterTex = new PIXI.Texture.fromImage(loader.resources.displacement.url)
  displacementSprite = new PIXI.Sprite(waterTex);
  displacementSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
  displacementSprite.anchor.set(0.5);
  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  displacementFilter.scale.x = 10;
  displacementFilter.scale.y = 10;
  displacementSprite.alpha = 0;



  launchIce()
  //launchWater()



});

function launchWater() {
  state.currentScene = 'water'
  bgCover.transitionToWater()
  waterScene.transitionIn()
  app.stage.filters = [displacementFilter];

}

function launchIce(){
  state.currentScene = 'ice'
  bgCover.transitionToIce()
  bgIce.transitionToIce()

  iceScene.transitionIn()
  app.stage.filters = []
}

function crackIce() {
  bgIce.crackPond()
}

function breakIce() {
  bgIce.breakPond()
}


window.addEventListener("resize",function(e){
  const size = getWindowSize();
  const w = size.width;
  const h = size.height;
  
  // Scale renderer
  app.renderer.view.style.width = w + "px";    
  app.renderer.view.style.height = h + "px";      
  app.renderer.resize(w,h); 
});
  
window.addEventListener("resize",debounce(function(e){
  // Scale scenes
  waterScene.resize();
  iceScene.resize();
}));  

export {state}