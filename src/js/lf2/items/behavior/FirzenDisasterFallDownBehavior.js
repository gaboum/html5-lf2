"use strict";
var lf2 = (function (lf2) {
    const METHOD_NOT_IMPLEMENT = "Method Not Implemented";
    const Point3D = Framework.Point3D;
    /**
     * FirzenDisasterFallDownBehavior
     *
     * @class lf2.FirzenDisasterFallDownBehavior
     * @extends lf2.AbstractBehavior
     */
    lf2.FirzenDisasterFallDownBehavior = class FirzenDisasterFallDownBehavior extends lf2.AbstractBehavior {
        /**
         *
         * @param {lf2.Ball} ball
         * @param {lf2.WorldScene} world
         */
        constructor(ball, world) {
            super(ball, world);
            this._attached = false
        }

        /**
         *
         * @returns {Framework.Point3D}
         */
        getVelocity() {
            return new Point3D(0, 0, 0);
        }


        update() {
            if (this._ball && !this._ball.alive && this._attached) {
                //Remove reference of ball
                this._ball._behavior = null;
                this._ball = null;
            }

            if (this._attached) return;


            let ops = [
                new lf2.ObjectPoint(`kind: 1  x: 0  y: 0  action: 0  dvx: 5  dvy: -15  oid: 221  facing: 20`),
                new lf2.ObjectPoint(`kind: 1  x: 0  y: 0  action: 0  dvx: 5  dvy: -13  oid: 222  facing: 20`),
            ];

            ops.forEach(opoint=>{
                let ball = this.belongTo.addBall(opoint, this._ball);
                ball.forEach(b => {
                    b._affectByFriction = true;
                });
            });

            this._attached = true;
        }

        /**
         *
         * @returns {lf2.GameItem}
         */
        getTarget() {
            return null;
        }
    };


    return lf2;
})(lf2 || {});