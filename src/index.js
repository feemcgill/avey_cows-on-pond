import app from './setup/app'
import engine from './setup/engine'
import IceScene from './scenes/ice/ice-scene'
import WaterScene from './scenes/water/water-scene'
import {debounce, getWindowSize} from './helpers'
// ASSETS
import pond from './../assets/img/pond-1.png'

import swimmer from './../assets/img/swimmer.png'
import waterBg from './../assets/img/water-bg.jpg'
import waterFg from './../assets/img/water-fg.png'


document.body.appendChild(app.view);



const loader = new PIXI.loaders.Loader(); // you can also create your own if you want

let waterScene
let iceScene

// Chainable `add` to enqueue a resource
loader
  .add('pond', pond)
  .add('swimmer', swimmer)
  .add('waterBg', waterBg)
  .add('waterFg', waterFg)

loader.load((loader, resources) => {
  iceScene = new IceScene();
  waterScene = new WaterScene();
  app.stage.addChild(iceScene);
});


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
