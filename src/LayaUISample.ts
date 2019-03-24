import test = ui.test.TestPageUI;
import Label = Laya.Label;
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

class TestUI extends ui.test.TestPageUI {

	constructor() {
		super();
		Laya.timer.frameLoop(1, this, this.checkCollision);
		this.registDrag(this.sp1);
		this.registDrag(this.sp2);
	}

	private checkCollision() {
		let bool = app.checkHelper.checkPolygon(app.checkHelper.createRect(this.sp1), app.checkHelper.createRect(this.sp2));
		this.renderSprite(this.sp1, bool);
		this.renderSprite(this.sp2, bool);
	}

	private renderSprite(sp: Laya.Sprite, bool: boolean) {
		sp.graphics.clear();
		sp.graphics.drawRect(0, 0, sp.width, sp.height, bool ? "#ffffff" : "#ff0000")
	}

	private renderSprite2(sp: Laya.Sprite, bool: boolean) {
		sp.graphics.clear();
		sp.graphics.drawCircle(sp.width / 2, sp.height / 2, sp.width / 2, bool ? "#ffffff" : "#ff0000")
	}

	private registDrag(sp: Laya.Sprite) {
		sp.on(Laya.Event.MOUSE_DOWN, this, () => sp.startDrag());
		sp.on(Laya.Event.MOUSE_OUT, this, () => sp.stopDrag());
		sp.on(Laya.Event.MOUSE_UP, this, () => sp.stopDrag());
	}
}

//程序入口
Laya.init(600, 400, WebGL);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad));

function beginLoad() {
	Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
}

function onLoaded(): void {
	//实例UI界面
	var testUI: TestUI = new TestUI();
	Laya.stage.addChild(testUI);
}