import MathTool from '../base/math-tool';

const context = canvas.getContext('2d');

const CVS_WIDTH = canvas.width;
const CVS_HEIGHT = canvas.height;

const CIRCLE_RADIUS = 40;
const POINT_RADIUS = 10;
const POINT_X = 50;
const POINT_Y = CVS_HEIGHT - 50;

const DIS = 2;
const SECTORS = {
  top: {
    start: -135 + DIS,
    end: -45 - DIS
  },
  right: {
    start: -45 + DIS,
    end: 45 - DIS
  },
  bottom: {
    start: 45 + DIS,
    end: 135 - DIS
  },
  left: {
    start: 135 + DIS,
    end: -135 - DIS
  }
};

export default class Control {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.context.globalCompositeOperation = 'source-over';

    this.initEvents();
  }

  /**
   * 开始绘制
   */
  draw() {
    this.context.clearRect(0, 0, CVS_WIDTH, CVS_HEIGHT);
    this.drawCircle();

    if(this.activeDir){
      // this.drawSector(this.activeDir);
    }

    context.drawImage(this.canvas, 0, 0);
  }

  /**
   * 画控制区域圆形
   */
  drawCircle() {
    // dot
    this.context.fillStyle = 'rgba(0,0,0,0.6)';
    this.context.beginPath();
    this.context.arc(POINT_X, POINT_Y, POINT_RADIUS, 0, 2 * Math.PI, true);
    this.context.closePath();
    this.context.fill();

    // area
    this.context.fillStyle = 'rgba(0,0,0,0.4)';
    this.context.beginPath();
    this.context.arc(POINT_X, POINT_Y, CIRCLE_RADIUS, 0, 2 * Math.PI, true);
    this.context.closePath();
    this.context.fill();
  }

  /**
   * 画控制扇形
   */
  drawSector(dir){
    let grd = this.context.createRadialGradient(POINT_X, POINT_Y, POINT_RADIUS, POINT_X, POINT_Y, CIRCLE_RADIUS);
    grd.addColorStop(0, 'rgba(105,105,105,0.1)');
    grd.addColorStop(1, 'rgba(105,105,105,0.9)');

    this.context.lineWidth = 30;
    this.context.strokeStyle = grd || 'rgba(255,255,255,0.2)';
    this.context.beginPath();
    this.context.arc(POINT_X, POINT_Y, POINT_RADIUS + 14, MathTool.getRadian(SECTORS[dir].start), MathTool.getRadian(SECTORS[dir].end));
    this.context.stroke();
  }

  initEvents(){
    wx.onTouchStart((e) => {
      let { pageX, pageY } = e.touches[0];
      let dis = MathTool.getDistanceBetweenTwoPoints(POINT_X, -POINT_Y, pageX, -pageY);

      let rad = MathTool.getAngleFromCircle(
        { x: POINT_X, y: -POINT_Y },
        { x: pageX, y: -pageY },
        CIRCLE_RADIUS);

      let deg = MathTool.getDegrees(rad);

      // console.log(rad);
      // console.log(deg);

      if (dis > CIRCLE_RADIUS || dis < POINT_RADIUS) return;
      
      let dir;

      for(dir in SECTORS){
        let dirAngle = SECTORS[dir];
        
        if (dirAngle.start < deg && dirAngle.end > deg ){
          this.activeDir = dir;
          return;
        }
      }
      
    });
  }
}