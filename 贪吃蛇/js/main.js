import Snake from './npc/snake';
import Control from './npc/control';
import Background from './runtime/background';

const context = canvas.getContext('2d');

const CVS_WIDTH = canvas.width;
const CVS_HEIGHT = canvas.height;

const snake = new Snake();
const control = new Control();

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.init();
  }

  init() {
    Background.draw();

    this.initSnake();
    this.initControl();
  }

  initSnake() {
    snake.onBeforeDraw = () => {
      context.clearRect(0, 0, CVS_WIDTH, CVS_HEIGHT);

      Background.draw();
      control.draw();
    };

    snake.start();

    // test
    snake.add();
    snake.add();
    snake.add();
  }

  initControl(){
    control.draw();
  }
}
