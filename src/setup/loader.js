import waterBg from './../../assets/img/water-bg.jpg'
import waterFg from './../../assets/img/water-fg.png'
import text from './../../assets/img/cows-text.jpg'
import at_name from './../../assets/img/at.png'
import swimmer_1 from './../../assets/img/cows/swimmer_1.png'
import swimmer_2 from './../../assets/img/cows/swimmer_2.png'
import swimmer_3 from './../../assets/img/cows/swimmer_3.png'
import walker_1 from './../../assets/img/cows/walker_1.png'
import walker_2 from './../../assets/img/cows/walker_2.png'
import walker_3 from './../../assets/img/cows/walker_3.png'
import grazer_1 from './../../assets/img/cows/grazer_1.png'
import grazer_2 from './../../assets/img/cows/grazer_2.png'
import pond from './../../assets/img/pond/pond.jpg'
import pond_crack_1 from './../../assets/img/pond/pond-crack-1a.jpg'
import pond_crack_2 from './../../assets/img/pond/pond-crack-2a.jpg'
import pond_crack_3 from './../../assets/img/pond/pond-crack-3a.jpg'
import pond_crack_4 from './../../assets/img/pond/pond-crack-4a.jpg'
import pond_crack_5 from './../../assets/img/pond/pond-crack-5a.jpg'
import pond_crack_6 from './../../assets/img/pond/pond-crack-6a.jpg'
import pond_crack_7 from './../../assets/img/pond/pond-crack-7a.jpg'
import vid1 from './../../assets/img/vid-frames/vid1.jpg'
import vid2 from './../../assets/img/vid-frames/vid2.jpg'
import vid3 from './../../assets/img/vid-frames/vid3.jpg'
import vid4 from './../../assets/img/vid-frames/vid4.jpg'
import vid5 from './../../assets/img/vid-frames/vid5.jpg'
import vid6 from './../../assets/img/vid-frames/vid6.jpg'
import displacement from './../../assets/img/disp-14.png'
import cover from './../../assets/img/cows-cover.jpg'
const loader = new PIXI.loaders.Loader(); // you can also create your own if you want

loader
  .add('walker_1', walker_1)
  .add('walker_2', walker_2)
  .add('walker_3', walker_3)
  .add('grazer_1', grazer_1)
  .add('grazer_2', grazer_2)
  .add('at_name', at_name)
  .add('pond', pond)
  .add('pond_crack_1', pond_crack_1)
  .add('pond_crack_2', pond_crack_2)
  .add('pond_crack_3', pond_crack_3)
  .add('pond_crack_4', pond_crack_4)
  .add('pond_crack_5', pond_crack_5)
  .add('pond_crack_6', pond_crack_6)
  .add('pond_crack_7', pond_crack_7)
  .add('vid1', vid1)
  .add('vid2', vid2)
  .add('vid3', vid3)
  .add('vid4', vid4)
  .add('vid5', vid5)
  .add('vid6', vid6)
  .add('swimmer', swimmer_1)
  .add('swimmer_1', swimmer_1)
  .add('swimmer_2', swimmer_2)
  .add('swimmer_3', swimmer_3)
  .add('waterBg', waterBg)
  .add('waterFg', waterFg)
  .add('text', text)
  .add('displacement', displacement)
  .add('cover', cover)
  
export default loader