namespace app {
    /**
     * 多边形
     * 
     * @export
     * @class Polygon
     */
    export class Polygon {
        vertices: Vector[] = [];
        constructor() {
            this.vertices = [];
            this.vertices.push(new Vector());
            this.vertices.push(new Vector());
            this.vertices.push(new Vector());
            this.vertices.push(new Vector());
        }

        getVertex(index: number) {
            return this.vertices[index];
        }

        setVertex(index: number, x: number, y: number) {
            let p = this.vertices[index];
            p.setTo(x, y);
        }

        getAxies() {
            let axies = [];
            let len = this.vertices.length;
            for (let i = 0; i < len; i++) {
                let v = this.vertices[i].subtract(this.vertices[(i + 1) % len]);
                axies[i] = v.perpendicularNormal();
            }
            return axies;
        }

        getProjection(axies: Vector) {
            var min = this.vertices[0].dot(axies);
            var max = min;

            for (var i = 1; i < 4; i++) {
                var temp = this.vertices[i].dot(axies);
                if (temp > max)
                    max = temp;
                else if (temp < min)
                    min = temp;
            }

            return new Projection(min, max);
        }


        getNearestPoint(x: number, y: number) {
            let value = this.vertices[0];
            let minDis = value.distance(x, y);
            for (let i = 1, len = this.vertices.length; i < len; i++) {
                let vertice = this.vertices[i];
                let distance = vertice.distance(x, y);
                if (distance < minDis) {
                    value = vertice;
                    minDis = distance;
                }
            }
            return value;
        }
    }
}