import Animation from '../base/animation'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/pipe.png'
const ENEMY_WIDTH   = 69
const ENEMY_HEIGHT  = 397

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

    this.initExplosionAnimation()
  }

  init(speed) {
    this.x = rnd(window.innerWidth, window.innerWidth * 2)
    this.y = this.height + 10

    this.speed = speed

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  // 每一帧更新子弹位置
  update() {
    this.x -= this.speed

    // 对象回收
    if ( this.x < -this.width )
      databus.removeEnemey(this)
  }
}
