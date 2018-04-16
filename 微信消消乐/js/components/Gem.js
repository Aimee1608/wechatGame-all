
import { randomNum } from "../utils/util";
const { Event, Handler, Tween, Ease } = Laya;

export default class Gem  extends Laya.Sprite {

    constructor() {
    	super();
    	this.size(80, 80);
    	this.pivot(40, 40);
    }

	
    reset() {
		this.alive = true;
		this.alpha = 1;
		this.scale(1,1);
    	let texture = Laya.loader.getRes(`fish/${this.color}.png`);
    	this.graphics.clear();
    	this.graphics.drawTexture(texture, (78-texture.width)/2, (78-texture.height)/2);
    	this.visible = true;
    }

    kill() {
    	this.alive = false;
		Tween.to(this, { alpha: 0.8, scaleX: 1.2, scaleY: 1.2 }, 100, null, Handler.create(this, ()=> {
			this.visible = false;
		}));
    }

}