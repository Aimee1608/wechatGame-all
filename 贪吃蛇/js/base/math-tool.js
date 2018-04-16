/**
 * 数学计算
 */
export default {
  /**
   * 角度转弧度
   */
  getRadian(degrees) {
    return (Math.PI * degrees) / 180
  },

  /**
   * 弧度转角度
   */
  getDegrees(radian) {
    return (radian * 180) / Math.PI
  },

  /**
   * 求两点之间的距离
   */
  getDistanceBetweenTwoPoints(x1, y1, x2, y2) {
    let a = x1 - x2;
    let b = y1 - y2;

    let result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    return result;
  },

  /**
   * 根据两点坐标，求形成的直角三角形角度
   */
  getRightTriangleAngle(A, B) {
    let x1 = A.x;
    let y1 = A.y;
    let x2 = B.x;
    let y2 = B.y;

    let a = Math.abs(x1 - x2);
    let b = Math.abs(y1 - y2);

    if (a === 0 || b === 0) {
      throw new Error('该两点相交的直线无法与水平轴或垂直轴构成三角形');
    }

    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    let randianToAngle = (scale) => {
      let radian = Math.acos(scale);

      let angle = 180 / Math.PI * radian;

      return Math.round(angle);
    }

    let angleA = randianToAngle(b / c);
    let angleB = randianToAngle(a / c);

    return {
      A: angleA,
      B: angleB,
      C: 90
    }
  },

  /**
   * 根据点坐标，求与圆右边切点，所形成的角度
   */
  getAngleFromCircle(center, point, radius) {
    let x1 = point.x + radius;
    let y1 = point.y;
    
    return Math.atan((point.y - center.y) / (point.x - center.x))
      - Math.atan((y1 - center.y) / (x1 - center.x));
  }
}
