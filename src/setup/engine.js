import Matter from 'matter-js';

const canvas = document.getElementById('canvas')
const innerWidth = window.innerWidth
const innerHeight = window.innerHeight


let matter_renderer = {
  render: {
    element: document.body,
    canvas: canvas,
    visble: false,
    options: {
      width: innerWidth,
      height: innerHeight,
      wireframes: true,
      showAngleIndicator: true,
      background: 'transparent',
      wireframeBackground: 'transparent',   
    }
  }  
}

matter_renderer = {};

const engine = Matter.Engine.create(matter_renderer)
//engine.timing.timeScale = 1;
// engine.world.gravity.x = 0;
//engine.world.gravity.y = 2;
console.log(engine.world, engine)
const mouseConstraint = Matter.MouseConstraint.create(engine);
Matter.World.add(engine.world, mouseConstraint);

Matter.Engine.run(engine)

export default engine