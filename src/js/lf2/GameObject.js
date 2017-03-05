"use strict";
var lf2 = (function (lf2) {

    /**
     * @type {BmpInfo}
     */
    const BmpInfo = lf2.BmpInfo;

    /**
     * @type {Frame}
     */
    const Frame = lf2.Frame;

    /**
     * GameObject
     *
     * @type {GameObject}
     * @class lf2.GameObject
     */
    lf2.GameObject = class {
        /**
         *
         * @param {Object} fileInfo
         * @param {String} context
         */
        constructor(fileInfo, context) {
            this.fileInfo = fileInfo;
            this.sourceCode = context;

            this.bmpInfo = new BmpInfo(context);
            this.frames = lf2.GameObject._parseFrames(context);

        }

        /**
         * Promise when all image loaded
         *
         * @returns {Promise.<*>}
         */
        done() {
            let arr = [].concat(this.bmpInfo._bmpLoad);
            return Promise.all(arr);
        }

        /**
         * Get current frame
         * @returns {Frame}
         */
        get currentFrame() {
            return this.frames[this._currentFrameIndex];
        }

        /**
         * Parse frame block
         *
         * @param context
         * @returns {Array}
         * @private
         */
        static _parseFrames(context) {
            const FRAME_START_TAG = '<frame>';
            const FRAME_END_TAG = '<frame_end>';
            let framesIndex = [], frameContent = [];

            for (
                let index = context.indexOf(FRAME_START_TAG);
                index !== -1;
                index = context.indexOf(FRAME_START_TAG, index + 1)
            ) {
                framesIndex.push(index);
            }
            framesIndex.forEach((i) => {
                let str = context.getStringBetween(FRAME_START_TAG, FRAME_END_TAG, i).trim();
                let frame = new Frame(str);

                frameContent[frame.id] = frame;
            });

            return frameContent;
        }
    };


    return lf2;
})(lf2 || {});