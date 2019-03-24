namespace app {
    export class Vector extends Laya.Point {

        /** 向量模 */
        get length(): number {
            return this.distance(0, 0)
        }

        /** 向量相加，返回一个新向量 */
        add(vector: Vector): Vector {
            let v = new Vector();
            v.x = this.x + vector.x;
            v.y = this.y + vector.y;
            return v;
        }

        /** 向量相减，返回一个新向量 */
        subtract(vector: Vector): Vector {
            let v = new Vector();
            v.x = this.x - vector.x;
            v.y = this.y - vector.y;
            return v;
        }

        /** 点乘 */
        dot(vector: Vector) {
            return this.x * vector.x + this.y * vector.y;
        }

        /** 垂直轴 */
        perpendicular() {
            let v = new Vector();
            v.x = this.y;
            v.y = 0 - this.x;
            return v;
        }

        /**单位向量 */
        normalize() {
            let v = new Vector();
            let m = this.length;

            if (m != 0) {
                v.x = this.x / m;
                v.y = this.y / m;
            }

            return v;
        }

        /**垂直单位向量 */
        perpendicularNormal() {
            let p = this.perpendicular();
            return p.normalize();
        }

        toString() {
            return `Vector<x:${this.x},y:${this.y}>`
        }
    }

}