import * as PIXI from 'pixi.js'

//Create the renderer
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor : 0x000000,
  // forceCanvas : true
});
export default app;