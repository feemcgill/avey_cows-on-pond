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

const mouseConstraint = Matter.MouseConstraint.create(engine);
Matter.World.add(engine.world, mouseConstraint);

Matter.Engine.run(engine)

export default engine