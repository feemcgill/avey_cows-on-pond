import Matter from 'matter-js';

const canvas = document.getElementById('canvas')
const box = document.getElementById('the-box')
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

//matter_renderer = {};

const engine = Matter.Engine.create()

//const mouseConstraint = Matter.MouseConstraint.create(engine);
const mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: Matter.Mouse.create(box)
});
Matter.World.add(engine.world, mouseConstraint);

Matter.Engine.run(engine)

export default engine