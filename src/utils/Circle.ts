namespace app {
    /**
     * 圆形
     * 
     * @export
     * @class Circle
     */
    export class Circle {
        vector: Vector = new Vector();
        radius: number;
        constructor() {

        }

        initParam(x: number, y: number, radius: number) {
            this.vector.setTo(x, y);
            this.radius = radius;
            return this;
        }

        get x() {
            return this.vector.x;
        }

        get y() {
            return this.vector.y;
        }

        getAxies(vec: Vector) {
            return [this.vector.subtract(vec).normalize()]
        }

        getProjection(axies: Vector) {
            let pro = this.vector.dot(axies);
            return new Projection(pro - this.radius, pro + this.radius);
        }
    }
}