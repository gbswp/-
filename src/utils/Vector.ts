namespace app {
    export class Vector {
        x: number;
        y: number;
        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }

        /** 向量模 */
        get magnitude(): number {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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
            let m = this.magnitude;

            if (m != 0) {
                v.x = this.x / m;
                v.y = this.y / m;
            }

            return v;
        }

        /** 与该向量垂直的单位向量 */
        normal() {
            let p = this.perpendicular();
            return p.normalize();
        }

        setTo(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return `Vector<x:${this.x},y:${this.y}>`
        }
    }

}