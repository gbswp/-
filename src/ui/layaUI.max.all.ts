
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.test {
    export class TestPageUI extends View {
		public sp1:Laya.Sprite;
		public sp2:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Sprite","props":{"y":162,"x":189,"width":162,"var":"sp1","rotation":50,"pivotY":50,"pivotX":81,"height":100},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":162,"lineWidth":1,"height":100,"fillColor":"#ff0000"}}]},{"type":"Sprite","props":{"y":208,"x":489,"width":100,"var":"sp2","pivotY":50,"pivotX":50,"height":100},"child":[{"type":"Circle","props":{"y":50,"x":50,"radius":50,"lineWidth":1,"fillColor":"#ff0000"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.TestPageUI.uiView);

        }

    }
}
