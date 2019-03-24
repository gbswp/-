namespace app {
    /**
     * 无旋转矩形
     * 
     * @export
     * @class Rect
     * @extends {Polygon}
     */
    export class Rect extends Polygon {
        getAxies() {
            return [new Vector(0, 1), new Vector(1, 0)];
        }
    }
}