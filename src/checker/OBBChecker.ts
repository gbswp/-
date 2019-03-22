namespace app {
    /**
     * OBB旋转矩形检测
     * 
     * @export
     * @class OBBChecker
     */
    export class OBBChecker {
        check(sp1: Laya.Sprite, sp2: Laya.Sprite) {
            let axisV1s = this.getSpriteAxisVs(sp1);
            let axisV2s = this.getSpriteAxisVs(sp2);

            let temp: Vector[] = [];
            temp.push(axisV1s[0].normalize());
            temp.push(axisV1s[1].normalize());
            temp.push(axisV2s[0].normalize());
            temp.push(axisV2s[1].normalize());

            let centerV = new Vector(sp2.x - sp1.x, sp2.y - sp1.y);

            for (let i = 0, len = temp.length; i < len; i++) {
                let vec = temp[i];
                let project1 = this.getProjectionRadius(sp1, vec, axisV1s);
                let project2 = this.getProjectionRadius(sp2, vec, axisV2s);
                let centerPro = this.dot(vec, centerV);
                if (project1 + project2 <= centerPro) return false;
            }
            return true;
        }

        /**
         * 取得Sprite轴单位向量
         * 
         * @protected
         * @param {Laya.Sprite} sp 
         * @returns [x轴向量,y轴向量]
         * @memberof OBBChecker
         */
        protected getSpriteAxisVs(sp: Laya.Sprite) {
            let rad = sp.rotation / Math.PI / 180;
            return [new Vector(Math.cos(rad), Math.sin(rad)), new Vector(-Math.sin(rad), Math.cos(rad))];
        }

        /**
         * 取得对象投影半径
         * 
         * @protected
         * @param {Laya.Sprite} sp 
         * @param {Vector} vector 
         * @param {Vector[]} axisVs 
         * @memberof OBBChecker
         */
        protected getProjectionRadius(sp: Laya.Sprite, vec: Vector, axisVs: Vector[]) {
            let projectionX = this.dot(vec, axisVs[0]);
            let projectionY = this.dot(vec, axisVs[1]);
            return projectionX * sp.width / 2 + projectionY * sp.height / 2
        }

        protected dot(vec1: Vector, vec2: Vector) {
            return Math.abs(vec1.x * vec2.x + vec1.y * vec2.y);
        }

    }
}