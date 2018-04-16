let context = canvas.getContext('2d');

const CVS_WIDTH = canvas.width;
const CVS_HEIGHT = canvas.height;

const UNIT = 10;
const UNIT_HALF = UNIT / 2;
const UNIT_BODY_DIS = UNIT + UNIT_HALF;
const UNIT_BODY_MOVE = UNIT_HALF;

const EYE_UNIT = UNIT / 4;
const EYE_UNIT_HALF = EYE_UNIT / 2;
const EYE_COLOR = '#ffffff';

const START_X = 100;
const START_Y = 50;

const COLORS = ['#2b347f', '#ffffff', '#e70614'];

export default class Snake {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.bodies = [];

    // 蛇头信息
    this.bodies.push({
      x: START_X,
      y: START_Y,
      color: COLORS[0],
      dir: 'right'
    });

    this.colorIndex = 0;
    this.speed = 100;
    
    this.draw();
  }

  /**
   * 开始绘制
   */
  draw() {
    this.onBeforeDraw && this.onBeforeDraw();
    this.context.clearRect(0, 0, CVS_WIDTH, CVS_HEIGHT);

    this.drawBodies();
    this.drawEyes();

    context.drawImage(this.canvas, 0, 0);
  }

  /**
   * 画身体
   */
  drawBodies() {
    let bodies = this.bodies;
    let len = bodies.length;
    let i = len - 1;
    let draw = (body) => {
      let { x, y, color, dir } = body;

      this.context.fillStyle = color;
      this.context.beginPath();
      this.context.arc(x, y, UNIT, 0, 2 * Math.PI, true);
      this.context.closePath();
      this.context.fill();
    };

    for(; i >= 0; i--){
      draw(bodies[i]);
    }
  }

  /**
   * 画眼睛
   */
  drawEyes() {
    let { x, y, color } = this.bodies[0];

    // left eye
    this.context.beginPath();
    this.context.strokeStyle = EYE_COLOR;
    this.context.arc(x + EYE_UNIT, y - UNIT_HALF - EYE_UNIT, EYE_UNIT, 0, 2 * Math.PI, true);
    this.context.closePath();
    this.context.stroke();

    // right eye
    this.context.beginPath();
    this.context.strokeStyle = EYE_COLOR;
    this.context.arc(x + EYE_UNIT, y + UNIT_HALF + EYE_UNIT, EYE_UNIT, 0, 2 * Math.PI, true);
    this.context.closePath();
    this.context.stroke();
  }

  /**
   * 增加长度
   */
  add(){
    this.colorIndex++;

    let bodies = this.bodies;
    let len = bodies.length;
    let last = bodies[len - 1];

    let {x, y, dir} = last;
    let colorIndex = this.colorIndex;

    if (colorIndex > 2) this.colorIndex = colorIndex = 0;

    switch (dir) {
      case 'right':
        x -= UNIT_BODY_DIS;
        break;
      case 'bottom':
        y -= UNIT_BODY_DIS;
        break;
      case 'left':
        x += UNIT_BODY_DIS;
        break;
      case 'top':
        y += UNIT_BODY_DIS;
        break;
    }

    let body = {
      x: x,
      y: y,
      dir: dir,
      color: COLORS[colorIndex]
    };

    this.bodies.push(body);
    
    this.draw();
  }

  /**
   * 移动，改变位移
   */
  move() {
    let bodies = this.bodies;
    let len = bodies.length;
    let i = 0;

    for(; i < len; i++){
      let {x, y, dir} = bodies[i];

      switch (dir) {
        case 'right':
          x += UNIT_BODY_MOVE;
          break;
        case 'bottom':
          y += UNIT_BODY_MOVE;
          break;
        case 'left':
          x -= UNIT_BODY_MOVE;
          break;
        case 'top':
          y -= UNIT_BODY_MOVE;
          break;
      }

      bodies[i].x = x;
      bodies[i].y = y;
    }

    this.bodies = bodies;
  }

  /**
   * 开始游戏
   */
  start(){
    if(this.collisionCheck()){
      return;
    }

    setTimeout(() => {
      this.move();
      this.draw();
      this.start();
    }, this.speed);
  }

  /**
   * 碰撞检测
   */
  collisionCheck(){
    let isMeet = false;
    let bodies = this.bodies;
    let head = bodies[0];
    let len = bodies.length;

    let dis = UNIT + UNIT_HALF;

    // 是否碰到画布边缘
    if (head.x > CVS_WIDTH - dis || head.x < 0 || head.y < 0 || head.y > CVS_HEIGHT - dis){
      isMeet = true;
    }

    return isMeet;
  }
}