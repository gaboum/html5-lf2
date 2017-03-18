'use strict';
var Framework = (function (Framework) {

    /**
     *
     * @class {Framework.Point3D}
     * @extends {Framework.Point}
     */
    Framework.Point3D = class Point3D extends Framework.Point {

        /**
         * Set Point
         *
         * @param {Number} x
         * @param {Number} y
         * @param {Number} z
         */
        constructor(x, y, z) {
            super(x, y);
            this._z = intval(z) || 0;
        }

        /**
         * Gets the z coordinate.
         *
         * @return  {Number}   z.
         */
        get z() {
            return this._z;
        }

        /**
         * Z coordinates the given value.
         *
         * @param  {Number} value   The value.
         *
         * @return  {void}
         */
        set z(value) {
            this._z = intval(value);
        }

        /**
         * Clone
         *
         * @override
         * @returns {Point3D}
         */
        clone() {
            return new Point3D(this._x, this._y, this._z);
        }

        /**
         *
         * @param {Number} x
         * @param {Number} y
         * @param {Number} z
         * @returns {Point3D}
         */
        offset(x, y, z){
            this.x+=intval(x);
            this.y+=intval(y);
            this.z+=intval(z);

            return this;
        }
    };

    return Framework;
})(Framework || {});