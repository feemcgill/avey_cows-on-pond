import app from './setup/app'
import Matter from 'matter-js';
import engine from './setup/engine'
import IceScene from './scenes/ice/ice-scene'
import WaterScene from './scenes/water/water-scene'
import {debounce, getWindowSize} from './helpers'
// ASSETS
//import pond from './../assets/img/pond1.jpg'
import pond from './../assets/img/pondinverse.jpg'

import waterBg from './../assets/img/water-bg.jpg'
import waterFg from './../assets/img/water-fg.png'
import text from './../assets/img/cows-text.jpg'
import at_name from './../assets/img/at.png'

import swimmer_1 from './../assets/img/cows/swimmer_1.png'
import swimmer_2 from './../assets/img/cows/swimmer_2.png'
import swimmer_3 from './../assets/img/cows/swimmer_3.png'


import walker_1 from './../assets/img/cows/walker_1.png'
import walker_2 from './../assets/img/cows/walker_2.png'
import walker_3 from './../assets/img/cows/walker_3.png'

import grazer_1 from './../assets/img/cows/grazer_1.png'
import grazer_2 from './../assets/img/cows/grazer_2.png'


document.body.appendChild(app.view);


let currentScene = null

const loader = new PIXI.loaders.Loader(); // you can also create your own if you want

let waterScene
let iceScene 

const waterWrap = new PIXI.Container()
const iceWrap = new PIXI.Container()
app.stage.addChild(waterWrap)
app.stage.addChild(iceWrap)

// Chainable `add` to enqueue a resource
loader
  .add('pond', pond)
  .add('swimmer', swimmer_1)
  .add('swimmer_1', swimmer_1)
  .add('swimmer_2', swimmer_2)
  .add('swimmer_3', swimmer_3)
  .add('walker_1', walker_1)
  .add('walker_2', walker_2)
  .add('walker_3', walker_3)
  .add('grazer_1', grazer_1)
  .add('grazer_2', grazer_2)
  .add('waterBg', waterBg)
  .add('waterFg', waterFg)
  .add('text', text)
  .add('at_name', at_name)

loader.load((loader, resources) => {
  // iceScene = new IceScene(launchWater);
  // iceWrap.addChild(iceScene);
  // currentScene = 'ice'
  launchWater()
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
  waterWrap.removeChild(waterScene)
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
