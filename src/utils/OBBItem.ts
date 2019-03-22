namespace app {
    export class OBBItem {
        /**
         * 顶点向量
         * 
         * @type {Vector[]}
         * @memberof OBBItem
         */
        borderVecs: Vector[] = [];
        /**
         * 边向量
         * 
         * @type {Vector[]}
         * @memberof OBBItem
         */
        normalVecs: Vector[] = [];
        centerP: Laya.Point = new Laya.Point(0, 0);


        getProjection(normalVec: Vector) {
            let min = 0, max = 0;
            this.borderVecs.forEach(vec => {
                let value = vec.dot(normalVec);
                min = Math.min(value, min);
                max = Math.max(value, max);
            })
            return [min, max];
        }

        static createOBBBySprite(sp: Laya.Sprite) {
            let hw = sp.width / 2, hh = sp.height / 2;
            let c = new Laya.Point(sp.x - sp.pivotX + hw, sp.y - sp.pivotY + hh);
            let cx = c.x, cy = c.y;
            let o1 = new Laya.Point(cx - hw, cy - hh);
            let o2 = new Laya.Point(cx + hw, cy - hh);
            let o3 = new Laya.Point(cx + hw, cy + hh);
            let o4 = new Laya.Point(cx - hw, cy + hh);
            let t1 = this.getPointByRotation(c, o1, sp.rotation);
            let t2 = this.getPointByRotation(c, o2, sp.rotation);
            let t3 = this.getPointByRotation(c, o3, sp.rotation);
            let t4 = this.getPointByRotation(c, o4, sp.rotation);
            let obb = new OBBItem();
            obb.centerP = c;
            let v1 = new Vector(t1.x, t1.y);
            let v2 = new Vector(t2.x, t2.y);
            let v3 = new Vector(t3.x, t3.y);
            let v4 = new Vector(t4.x, t4.y);

            let b1 = v2.subtract(v1);
            let b2 = v3.subtract(v2);
            let b3 = v4.subtract(v3)
            let b4 = v1.subtract(v4)

            obb.borderVecs.push(b1);
            obb.borderVecs.push(b2);
            obb.borderVecs.push(b3);
            obb.borderVecs.push(b4);

            obb.normalVecs.push(b1.normal());
            obb.normalVecs.push(b2.normal());
            obb.normalVecs.push(b3.normal());
            obb.normalVecs.push(b4.normal());

            return obb;
        }

        /**
        * 旋转后定点的计算
        * 
        * @param {Laya.Point} v0 
        * @param {Laya.Point} v1 
        * @param {number} rotation 
        * @returns 
        * @memberof TestUI
        */
        static getPointByRotation(v0: Laya.Point, v1: Laya.Point, rotation: number) {
            let dx = v1.x - v0.x;
            let dy = v1.y - v0.y;
            let rad = rotation * Math.PI / 180;
            let tx = Math.cos(rad) * dx - Math.sin(rad) * dy + v0.x;
            let ty = Math.sin(rad) * dx + Math.cos(rad) * dy + v0.y;
            return new Laya.Point(tx, ty);
        }

    }
}