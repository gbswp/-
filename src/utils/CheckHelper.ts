namespace app {
    export interface IProjection {
        getProjection: (value: Vector) => Projection;
    }

    /**
     * 投影范围
     * 
     * @export
     * @class Projection
     */
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

    /**
     * 碰撞检测
     * 
     * @export
     * @class CheckHelper
     */
    export class CheckHelper {

        checkPolygon(obb1: Polygon, obb2: Polygon) {
            return this.check(obb1, obb2, obb1.getAxies(), obb2.getAxies());
        }

        checkPolygonCircle(obb1: Polygon, obb2: Circle) {
            var axies1 = obb1.getAxies();
            var axies2 = obb2.getAxies(obb1.getNearestPoint(obb2.x, obb2.y));
            return this.check(obb1, obb2, axies1, axies2);
        }

        private check(ob1: IProjection, ob2: IProjection, axies1: Vector[], axies2: Vector[]) {
            let p1: Projection;
            let p2: Projection;

            for (let i = 0, len = axies1.length; i < len; i++) {
                p1 = ob1.getProjection(axies1[i]);
                p2 = ob2.getProjection(axies1[i]);
                if (!p1.overlap(p2)) {
                    return false;
                }
            }

            for (let j = 0, len = axies2.length; j < len; j++) {
                p1 = ob1.getProjection(axies2[j]);
                p2 = ob2.getProjection(axies2[j]);
                if (!p1.overlap(p2)) {
                    return false;
                }
            }
            return true;
        }

        createRect(sp: Laya.Sprite) {
            let temp = this.getVerticesByRect(sp);
            let rect = new Rect();
            for (let i = 0, len = temp.length; i < len; i++) {
                let p = temp[i];
                rect.setVertex(i, p.x, p.y);
            }
            return rect;
        }

        createCircle(sp: Laya.Sprite) {
            return new Circle().initParam(sp.x, sp.y, sp.width / 2)
        }

        createPloygon(sp: Laya.Sprite) {
            let temp = this.getVertices(sp);
            let poly = new Polygon();
            for (let i = 0, len = temp.length; i < len; i++) {
                let p = temp[i];
                poly.setVertex(i, p.x, p.y);
            }
            return poly;
        }

        private getPivotByRect(sp: Laya.Sprite) {
            let hw = sp.width / 2, hh = sp.height / 2;
            return [sp.x - sp.pivotX + hw, sp.y - sp.pivotY + hh];
        }

        private getVerticesByRect(sp: Laya.Sprite) {
            let [cx, cy] = this.getPivotByRect(sp);
            let hw = sp.width / 2, hh = sp.height / 2;
            let o1 = new Laya.Point(cx - hw, cy - hh);
            let o2 = new Laya.Point(cx + hw, cy - hh);
            let o3 = new Laya.Point(cx + hw, cy + hh);
            let o4 = new Laya.Point(cx - hw, cy + hh);
            return [o1, o2, o3, o4];
        }

        private getVertices(sp: Laya.Sprite) {
            let [o1, o2, o3, o4] = this.getVerticesByRect(sp);
            let [cx, cy] = this.getPivotByRect(sp);
            let c = new Laya.Point(cx, cy);
            let t1 = this.getVertice(c, o1, sp.rotation);
            let t2 = this.getVertice(c, o2, sp.rotation);
            let t3 = this.getVertice(c, o3, sp.rotation);
            let t4 = this.getVertice(c, o4, sp.rotation);
            return [t1, t2, t3, t4];
        }

        private getVertice(v0: Laya.Point, v1: Laya.Point, rotation: number) {
            let dx = v1.x - v0.x;
            let dy = v1.y - v0.y;
            let rad = rotation * Math.PI / 180;
            let tx = Math.cos(rad) * dx - Math.sin(rad) * dy + v0.x;
            let ty = Math.sin(rad) * dx + Math.cos(rad) * dy + v0.y;
            return new Laya.Point(tx, ty);
        }
    }

    export var checkHelper = new CheckHelper();
}