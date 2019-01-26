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

const bgWrap = new PIXI.Container()
const waterWrap = new PIXI.Container()
const iceWrap = new PIXI.Container()

app.stage.addChild(bgWrap)
app.stage.addChild(waterWrap)
app.stage.addChild(iceWrap)



loader.load((loader, resources) => {
  bgCover = new BgCover()
  bgIce = new BgIce()
  //bgIce.alpha = 0.3
  bgWrap.addChild(bgCover)
  bgWrap.addChild(bgIce)

  launchIce()
  //launchWater()



});

function launchWater() {
  waterScene = new WaterScene(launchIce);
  waterWrap.addChild(waterScene);
  setTimeout(() => {
    iceWrap.removeChild(iceScene)
  }, 2000);
}

function launchIce(){
  iceScene = new IceScene(launchWater, breakIce, crackIce);
  iceWrap.addChild(iceScene);
  setTimeout(() => {
    waterWrap.removeChild(waterScene)
  }, 2000);  
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
