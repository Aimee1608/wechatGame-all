import Sprite   from '../base/sprite'
import Bullet   from './bullet'
import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight
const ground_h = 128

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/bird-01.png'
const PLAYER_IMG_SRC_ = 'images/bird-0{}.png'
const PLAYER_WIDTH   = 34
const PLAYER_HEIGHT  = 24

let databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)
    this.img.src_ = PLAYER_IMG_SRC_
    this.img.srcNum = 1

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    // this.y = screenHeight - this.height - 30
    this.y = screenHeight / 2 - this.height / 2

    this.w = this.width
    this.h = this.height

    this.vy = 0
    this.rotation = 0

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []

    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(   x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation  )
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if ( disX < 0 )
      disX = 0

    else if ( disX > screenWidth - this.width )
      disX = screenWidth - this.width

    if ( disY <= 0 )
      disY = 0

    else if ( disY > screenHeight - this.height )
      disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      //
      if ( this.checkIsFingerOnAir(x, y) ) {
        this.touched = true

        this.setAirPosAcrossFingerPosZ(x, y)
      }

      this.vy = -5
      this.rotation = -45

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if ( this.touched )
        this.setAirPosAcrossFingerPosZ(x, y)

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }).bind(this))
  }

  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    let bullet = databus.pool.getItemByClass('bullet', Bullet)

    bullet.init(
      this.x + this.width / 2 - bullet.width / 2,
      this.y - 10,
      10
    )

    databus.bullets.push(bullet)
  }
  update() {
      this.y += this.vy
      this.vy += 0.1

      this.rotation += 1
      if (this.rotation >= 45) {
          this.rotation = 45
      }

      var groundPositon = screenHeight - this.height - ground_h
      if (this.y > groundPositon) {
          this.y = groundPositon
      }
      if ( databus.frame % 5 === 0 ) {
          this.img.srcNum ++
          if (this.img.srcNum > 3) {
              this.img.srcNum = 1
          }
        //   console.log(this.img.srcNum)
          this.img.src = this.img.src_.replace('{}', this.img.srcNum)

      }
    //   console.log(this.img.src)

  }

  draw(ctx) {
        ctx.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        ctx.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            ctx.scale(-1, 1)
        }
        ctx.rotate(this.rotation * Math.PI / 180)
        ctx.translate(-w2, -h2)
        ctx.drawImage(this.img, 0, 0, this.width, this.height)

        ctx.restore()

    }
}
