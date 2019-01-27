import app from './setup/app'
import Matter from 'matter-js';
import engine from './setup/engine'
import IceScene from './scenes/ice/ice-scene'
import WaterScene from './scenes/water/water-scene'
import {debounce, getWindowSize, map} from './helpers'
import loader from './setup/loader'
import BgIce from './scenes/background/bg-ice'
import BgCover from './scenes/background/bg-cover'
import TweenMax from 'gsap/TweenMaxBase';

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
  displacementSprite.scale.set(0);
  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  displacementFilter.scale.x = 10;
  displacementFilter.scale.y = 10;
  app.stage.addChild(displacementSprite)

  app.stage.interactive = true;
  app.stage
      .on('mousemove', handleMove)
      .on('touchmove', handleMove);  


  launchIce()



});

function launchWater() {
  state.currentScene = 'water'
  setTimeout(() => {
    waterScene.transitionIn()
  }, 1000);
  app.stage.filters = [displacementFilter];
  TweenMax.to(displacementSprite.scale, 5, {x:1, y:1})

}

function launchIce(){
  state.currentScene = 'ice'
  bgCover.transitionToIce()
  bgIce.transitionToIce()

  iceScene.transitionIn()
  TweenMax.to(displacementSprite.scale, .1, {x:0, y:0, onComplete:() => {
    app.stage.filters = []

  }})

}

function crackIce() {
  bgIce.crackPond()
}

function breakIce() {
  bgCover.transitionToWater()
  bgIce.breakPond()
}

/** MOUSE MOVE **/
/** MOUSE MOVE **/
/** MOUSE MOVE **/
function handleMove(e) {
  var x = e.data.global.x;
  var y = e.data.global.y;

  const displaceMover = map(x, 0, app.renderer.width, -300, 300);
  bgCover.handleMove(x,y)

  if (state.currentScene == 'water') {
    TweenMax.to(displacementSprite,10,{x:x});
    waterScene.handleMove(x,y)
  }
}

/** RESIZE **/
/** RESIZE **/
/** RESIZE **/
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