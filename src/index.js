import app from './setup/app'
import engine from './setup/engine'
import IceScene from './scenes/ice/ice-scene'
import WaterScene from './scenes/water/water-scene'
import {debounce, getWindowSize} from './helpers'
// ASSETS
import pond from './../assets/img/pond1.jpg'

import swimmer from './../assets/img/swimmer.png'
import waterBg from './../assets/img/water-bg.jpg'
import waterFg from './../assets/img/water-fg.png'
import stain from './../assets/img/stain.png'

document.body.appendChild(app.view);



const loader = new PIXI.loaders.Loader(); // you can also create your own if you want

let waterScene
let iceScene 

const waterWrap = new PIXI.Container()
const iceWrap = new PIXI.Container()
app.stage.addChild(waterWrap)
app.stage.addChild(iceWrap)

// Chainable `add` to enqueue a resource
loader
  .add('stain', stain)
  .add('pond', pond)
  .add('swimmer', swimmer)
  .add('waterBg', waterBg)
  .add('waterFg', waterFg)

loader.load((loader, resources) => {
  iceScene = new IceScene(launchWater);
  iceWrap.addChild(iceScene);
});

function launchWater() {
  waterScene = new WaterScene();
  waterWrap.addChild(waterScene);
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


export {loader}
