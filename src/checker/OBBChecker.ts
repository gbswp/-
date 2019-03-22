namespace app {
    /**
     * OBB旋转矩形检测
     * 
     * @export
     * @class OBBChecker
     */
    export class OBBChecker {
        static check(sp1: Laya.Sprite, sp2: Laya.Sprite) {
            let obb1 = OBB.create(sp1);
            let obb2 = OBB.create(sp2);

            var axies1 = obb1.getAxies();
            var axies2 = obb2.getAxies();

            var p1: Projection;
            var p2: Projection;

            for (var i = 0; i < 4; i++) {
                p1 = obb1.getProjection(axies1[i]);
                p2 = obb2.getProjection(axies1[i]);
                if (!p1.overlap(p2)) {
                    return false;
                }
            }

            for (var j = 0; j < 4; j++) {
                p1 = obb1.getProjection(axies2[j]);
                p2 = obb2.getProjection(axies2[j]);
                if (!p1.overlap(p2)) {
                    return false;
                }
            }
            return true;
        }

    }
}