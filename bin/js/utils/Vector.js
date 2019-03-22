var app;
(function (app) {
    var Vector = /** @class */ (function () {
        function Vector(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Object.defineProperty(Vector.prototype, "magnitude", {
            /** 向量模 */
            get: function () {
                return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
            },
            enumerable: true,
            configurable: true
        });
        /** 向量相加，返回一个新向量 */
        Vector.prototype.add = function (vector) {
            var v = new Vector();
            v.x = this.x + vector.x;
            v.y = this.y + vector.y;
            return v;
        };
        /** 向量相减，返回一个新向量 */
        Vector.prototype.subtract = function (vector) {
            var v = new Vector();
            v.x = this.x - vector.x;
            v.y = this.y - vector.y;
            return v;
        };
        /** 点乘 */
        Vector.prototype.dot = function (vector) {
            return this.x * vector.x + this.y * vector.y;
        };
        /** 垂直轴 */
        Vector.prototype.perpendicular = function () {
            var v = new Vector();
            v.x = this.y;
            v.y = 0 - this.x;
            return v;
        };
        /**单位向量 */
        Vector.prototype.normalize = function () {
            var v = new Vector();
            var m = this.magnitude;
            if (m != 0) {
                v.x = this.x / m;
                v.y = this.y / m;
            }
            return v;
        };
        /** 与该向量垂直的单位向量 */
        Vector.prototype.normal = function () {
            var p = this.perpendicular();
            return p.normalize();
        };
        Vector.prototype.toString = function () {
            return "Vector<x:" + this.x + ",y:" + this.y + ">";
        };
        return Vector;
    }());
    app.Vector = Vector;
})(app || (app = {}));
//# sourceMappingURL=Vector.js.map