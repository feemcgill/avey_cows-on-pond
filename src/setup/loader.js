import waterBg from './../../assets/img/water-bg.jpg'
import swimmer_1 from './../../assets/img/cows/swimmer_1.png'
import swimmer_2 from './../../assets/img/cows/swimmer_2.png'
import swimmer_3 from './../../assets/img/cows/swimmer_3.png'
import walker_1 from './../../assets/img/cows/walker_1.png'
import walker_2 from './../../assets/img/cows/walker_2.png'
import walker_3 from './../../assets/img/cows/walker_3.png'
import grazer_1 from './../../assets/img/cows/grazer_1.png'
import grazer_2 from './../../assets/img/cows/grazer_2.png'
import pond from './../../assets/img/pond/pond.gif'
import pond_crack_1 from './../../assets/img/pond/pond-crack-1a.gif'
import pond_crack_2 from './../../assets/img/pond/pond-crack-2a.gif'
import pond_crack_3 from './../../assets/img/pond/pond-crack-3a.gif'
import pond_crack_4 from './../../assets/img/pond/pond-crack-4a.gif'
import pond_crack_5 from './../../assets/img/pond/pond-crack-5a.gif'
import pond_crack_6 from './../../assets/img/pond/pond-crack-6a.gif'
import pond_crack_7 from './../../assets/img/pond/pond-crack-7a.gif'
import displacement from './../../assets/img/disp-14.png'
import cover from './../../assets/img/cows-cover.jpg'

const loader = new PIXI.loaders.Loader()

loader
  .add('walker_1', walker_1)
  .add('walker_2', walker_2)
  .add('walker_3', walker_3)
  .add('grazer_1', grazer_1)
  .add('grazer_2', grazer_2)
  .add('pond', pond)
  .add('pond_crack_1', pond_crack_1)
  .add('pond_crack_2', pond_crack_2)
  .add('pond_crack_3', pond_crack_3)
  .add('pond_crack_4', pond_crack_4)
  .add('pond_crack_5', pond_crack_5)
  .add('pond_crack_6', pond_crack_6)
  .add('pond_crack_7', pond_crack_7)
  .add('swimmer_1', swimmer_1)
  .add('swimmer_2', swimmer_2)
  .add('swimmer_3', swimmer_3)
  .add('waterBg', waterBg)
  .add('displacement', displacement)
  .add('cover', cover)
  
export default loader