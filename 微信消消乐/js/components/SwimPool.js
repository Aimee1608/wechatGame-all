
import { createSkeleton, randomNum } from "../utils/util";
import { pubsub } from "./Tools";

const { Event, Handler, Tween } = Laya;

let fishes = [];
let shock = [];
let naval;
let shaked = false;

let fishList = [];
export default class SwimPool extends Laya.Sprite {

	constructor() {
		super();
		this.init();
	}

	init() {
		pubsub.on("KILL_5", this, (num)=> {
			for (let i=0; i< num; i++) {
				let fish = new Fish();
				fish.speed = 30;
				fish.pos(randomNum(1304, 30),randomNum(730,20));
				this.addChild(fish);
			}
		});
		Laya.stage.on(Event.CLICK, this, (event)=> {
			naval = [event.stageX, event.stageY];
			this.timer.once(1000, this, ()=> naval=null);
		});

		if (window.wx) {
			//首先定义一下，全局变量
			var lastTime = 0; //此变量用来记录上次摇动的时间
			var x = 0,
				y = 0,
				z = 0,
				lastX = 0,
				lastY = 0,
				lastZ = 0; //此组变量分别记录对应x、y、z三轴的数值和上次的数值
			var shakeSpeed = 110; //设置阈值
			//编写摇一摇方法
			function shake(acceleration) {
				let nowTime = new Date().getTime(); //记录当前时间
				//如果这次摇的时间距离上次摇的时间有一定间隔 才执行
				if (nowTime - lastTime > 100) {
					let diffTime = nowTime - lastTime; //记录时间段
					lastTime = nowTime; //记录本次摇动时间，为下次计算摇动时间做准备
					x = acceleration.x; //获取x轴数值，x轴为垂直于北轴，向东为正
					y = acceleration.y; //获取y轴数值，y轴向正北为正
					z = acceleration.z; //获取z轴数值，z轴垂直于地面，向上为正
					//计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
					let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
					//console.log(speed)
					if (speed > shakeSpeed) { //如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
						shaked = true;
						wx.stopAccelerometer();
						fishList.forEach(fish=> {
							fish.speed = 30;
						});
						setTimeout(()=> {
							shaked = false;
							wx.startAccelerometer();
						}, 2000);
					}
					lastX = x; //赋值，为下一次计算做准备
					lastY = y; //赋值，为下一次计算做准备
					lastZ = z; //赋值，为下一次计算做准备
				}
			}
			wx.onAccelerometerChange(shake);
			wx.startAccelerometer();
		}
	}

}

class Fish extends Laya.Sprite {

	constructor() {
		super();
		this.speed = 1;
		this.init();
		fishList.push(this);
	}

	init() {
		let skeleton = this.skeleton = createSkeleton(`res/fish${['5','8'][randomNum(2)]}`);
		skeleton.rotation = 90;
		this.addChild(skeleton);
		skeleton.play(0, true);
		this.rotation = randomNum(360);
		this.swim();
	}

	swim() {
		this.timer.frameLoop(1, this, ()=> {
			let x = this.x;
			let y = this.y;
			if (x<=30) {
				this.rotation  = randomNum(270+30,450-30)%360;
			} else if (x>=1304) {
				this.rotation = randomNum(90+30,270-30);
			} else if (y<=20) {
				this.rotation = randomNum(0+30,180-30);
			} else if (y>=730) {
				this.rotation = randomNum(180+30,360-30);
			}
			if (naval && (Math.abs(this.x-naval[0])<=10&&Math.abs(this.y-naval[1])<=10) ) {
				return this.destroy();
			} else if (!shaked && this.speed>1) {
				this.speed--;
			}
			this.x +=  this.speed * Math.cos(this.rotation*Math.PI/180);
			this.y += this.speed * Math.sin(this.rotation*Math.PI/180);
		});
	}

}