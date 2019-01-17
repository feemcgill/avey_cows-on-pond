import * as PIXI from 'pixi.js'
import IceScene from './scenes/ice/ice-scene'
import WaterScene from './scenes/water/water-scene'

//Create the renderer
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor : 0xFFFFFF,
  // forceCanvas : true
});
export default app;

document.body.appendChild(app.view);

const iceScene = new IceScene();
const waterScene = new WaterScene();
//app.stage.addChild(iceScene);
app.stage.addChild(waterScene);

// if (module.hot) {
//   module.hot.accept();
// }
