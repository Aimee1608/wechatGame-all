let context = canvas.getContext('2d');

const CVS_WIDTH = canvas.width;
const CVS_HEIGHT = canvas.height;
const RECT_SIZE = 15;
const RECT_UNIT = CVS_WIDTH / RECT_SIZE;

const BACKGROUND_COLOR = '#EAEDF4';
const LINE_COLOR = '#e0e3ea';

export default {
  draw(){
    this.fillBackground();
    this.drawLine();
  },
  fillBackground() {
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, CVS_WIDTH, CVS_HEIGHT);
  },
  drawLine(){
    let top = RECT_UNIT;
    let left = RECT_UNIT;

    for (; top < CVS_HEIGHT; top += RECT_UNIT) {
      context.lineWidth = 1;
      context.strokeStyle = LINE_COLOR;
      context.moveTo(0, top);
      context.lineTo(CVS_WIDTH, top);
      context.stroke();
    }

    for (; left < CVS_WIDTH; left += RECT_UNIT) {
      context.lineWidth = 1;
      context.strokeStyle = LINE_COLOR;
      context.moveTo(left, 0);
      context.lineTo(left, CVS_HEIGHT);
      context.stroke();
    }

  }
}