import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/background.png'
const BG_WIDTH     = 768
const BG_HEIGHT    = 896
const ground_w = 37
const ground_h = 128

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.ground     = new Image()
    this.ground.src = 'images/ground.png'
    this.ground.w = ground_w
    this.ground.h = ground_h

    this.render(ctx)

    this.left = 0
  }

  update() {
    this.left -= 2

    if ( this.left <= -screenWidth )
      this.left = 0
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      0,
      screenWidth,
      screenHeight - this.ground.h,
    )
    for (var i = 0; i < 48; i++) {
        ctx.drawImage(
          this.ground,
          0,
          0,
          this.ground.w,
          this.ground.h,
          this.left + i * this.ground.w,
          screenHeight - this.ground.h,
          this.ground.w,
          this.ground.h
        )
    }

  }
}
