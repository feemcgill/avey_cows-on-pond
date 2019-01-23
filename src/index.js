import app from './setup/app'
import Matter from 'matter-js';
import engine from './setup/engine'
import IceScene from './scenes/ice/ice-scene'
import WaterScene from './scenes/water/water-scene'
import {debounce, getWindowSize} from './helpers'
import loader from './setup/loader'

document.body.appendChild(app.view);

let waterScene
let iceScene 
const waterWrap = new PIXI.Container()
const iceWrap = new PIXI.Container()
app.stage.addChild(waterWrap)
app.stage.addChild(iceWrap)

loader.load((loader, resources) => {
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
  iceScene = new IceScene(launchWater);
  iceWrap.addChild(iceScene);
  setTimeout(() => {
    waterWrap.removeChild(waterScene)
  }, 2000);  
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
