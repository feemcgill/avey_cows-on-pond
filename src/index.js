import * as PIXI from 'pixi.js'
import {TweenMax} from "gsap/TweenMax";
import IceStage from './scenes/ice/ice-stage';
import IceBg from './scenes/ice/ice-bg';
import IceBgMask from './scenes/ice/ice-bg-mask';

//Create the renderer
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor : 0xFFFFFF,
  // forceCanvas : true
});

//Add the canvas to the HTML document
document.body.appendChild(app.view);

//Create a container object called the `stage`
const stage = new PIXI.Container();

let graphics = new PIXI.Graphics();
graphics.beginFill(0xff22aa);
graphics.drawRect(0, 0, 50, 50);
graphics.endFill();
let texture = app.renderer.generateTexture(graphics);

let superSquare = new PIXI.Sprite(texture);




const iceBg = new IceBg(4);
iceBg.setInitialPoint(0,0);
//app.stage.addChild(iceBg);

const iceBgMask = new IceBgMask();
iceBgMask.setInitialPoint(0,0);
app.stage.addChild(iceBgMask);

const iceStage = new IceStage();
iceStage.setInitialPoint(0,0);
app.stage.addChild(iceStage);


const iceBg2 = new IceBg(8.07);
iceBg2.setInitialPoint(0,0);
app.stage.addChild(iceBg2);
iceBg2.blendMode = PIXI.BLEND_MODES.ADD;


//iceBg.mask = iceBgMask;

app.stage.addChild(superSquare);


TweenMax.to(superSquare, 5, {bezier:[{x:100, y:250}, {x:300, y:0}, {x:500, y:400}], ease:Power1.easeInOut});
app.ticker.add(function(delta) {
  //superSquare.rotation += 0.0005 * delta;
});
// TweenMax.to(superSquare, 20, {
//   x:500,
//   y:500		
// }); 



// if (module.hot) {
//   module.hot.accept();
// }
