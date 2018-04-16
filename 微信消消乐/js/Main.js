import Play from "components/Play";
import SwimPool from "components/SwimPool";

const { Stage, Sprite, Event, Handler, Text } = Laya;

export default class Main {

	constructor() {
		Laya.MiniAdpter.init();
		this.restart();
	}

	restart() {
		var stage;
		Laya.init(1334, 750, Laya.WebGL);
		Laya.MiniAdpter.init();
		stage = Laya.stage;
		stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
		stage.alignH = Stage.ALIGN_CENTER;
		stage.alignV = Stage.ALIGN_MIDDLE;
		stage.screenMode = Stage.SCREEN_HORIZONTAL;
		stage.bgColor =	"#46ABFC";

		const registeFnt = fontRes=> {
	        for (let i = 0; i < fontRes.length; i++) {
	            let bitmapFont = new Laya.BitmapFont();
	            bitmapFont.loadFont(fontRes[i].url);
	            Laya.Text.registerBitmapFont(fontRes[i].name, bitmapFont);
	        }
	    }
		
		Laya.loader.load([
			{ url: "res/atlas/fish.json", type: "atlas" },
			{ url: "res/bg_cells.png", type: "image" },
			{ url: "res/bg.jpg", type: "image" },
			{ url: "res/fish5.sk", type: "arraybuffer" },
			{ url: "res/fish5.png", type: "image" },
			{ url: "res/fish8.sk", type: "arraybuffer" },
			{ url: "res/fish8.png", type: "image" },
			{ url: "res/prizeFont.fnt", type: "arraybuffer" },
			{ url: "res/prizeFont.png", type: "image" }
		], Laya.Handler.create(null, ()=> {
			/*registeFnt([
				{ url: "res/prizeFont.fnt", name: "prizeFont", type: "xml" },
			]);*/
			let bg = new Laya.Image("res/bg.jpg");
			Laya.stage.addChildAt(bg, 0);
			let play = new Play();
			play.pos(200, 35);
			let swimPool = new SwimPool();
			Laya.stage.addChildren(swimPool, play);
			Laya.SoundManager.playMusic("res/bg.mp3",0);
	    }));
	}


}

// window.AppMain = Main;