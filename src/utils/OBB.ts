namespace app {
    export class Projection {
        min = 0;
        max = 0;
        constructor(min: number, max: number) {
            this.min = min;
            this.max = max;
        }

        getMin() {
            return this.min;
        }

        getMax() {
            return this.max;
        }

        overlap(proj: Projection) {
            if (this.min > proj.getMax()) return false;
            if (this.max < proj.getMin()) return false;

            return true;
        }
    }

    export class OBB {
        pList: app.Vector[] = [];

        static create(sp: Laya.Sprite) {
            let temp = this.getPList(sp);
            let obb = new OBB();
            for (let i = 0, len = temp.length; i < len; i++) {
                let p = temp[i];
                obb.setVertex(i, p.x, p.y);
            }
            return obb;
        }

        private static getPList(sp: Laya.Sprite) {
            let hw = sp.width / 2, hh = sp.height / 2;
            let c = new Laya.Point(sp.x - sp.pivotX + hw, sp.y - sp.pivotY + hh);
            let cx = c.x, cy = c.y;
            let o1 = new Laya.Point(cx - hw, cy - hh);
            let o2 = new Laya.Point(cx + hw, cy - hh);
            let o3 = new Laya.Point(cx + hw, cy + hh);
            let o4 = new Laya.Point(cx - hw, cy + hh);
            let t1 = this.getPoint(c, o1, sp.rotation);
            let t2 = this.getPoint(c, o2, sp.rotation);
            let t3 = this.getPoint(c, o3, sp.rotation);
            let t4 = this.getPoint(c, o4, sp.rotation);
            return [t1, t2, t3, t4];
        }

        private static getPoint(v0: Laya.Point, v1: Laya.Point, rotation: number) {
            let dx = v1.x - v0.x;
            let dy = v1.y - v0.y;
            let rad = rotation * Math.PI / 180;
            let tx = Math.cos(rad) * dx - Math.sin(rad) * dy + v0.x;
            let ty = Math.sin(rad) * dx + Math.cos(rad) * dy + v0.y;
            return new Laya.Point(tx, ty);
        }

        constructor() {
            this.pList = [];
            this.pList.push(new app.Vector());
            this.pList.push(new app.Vector());
            this.pList.push(new app.Vector());
            this.pList.push(new app.Vector());
        }

        getVertex(index: number) {
            return this.pList[index];
        }

        setVertex(index: number, x: number, y: number) {
            let p = this.pList[index];
            p.setTo(x, y);
        }

        getAxies() {
            let axies = [];
            for (let i = 0; i < 4; i++) {
                let v = this.pList[i].subtract(this.pList[(i + 1) % 4]);
                axies[i] = v.normal();
            }
            return axies;
        }

        getProjection(axies: app.Vector) {
            var min = this.pList[0].dot(axies);
            var max = min;

            for (var i = 1; i < 4; i++) {
                var temp = this.pList[i].dot(axies);
                if (temp > max)
                    max = temp;
                else if (temp < min)
                    min = temp;
            }

            return new Projection(min, max);
        }

    }


}