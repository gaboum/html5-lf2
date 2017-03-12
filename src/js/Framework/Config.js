// By Raccoon
// include namespace

'use strict';
var Framework = (function (Framework) {

    /**
     * @class {Framework.Config}
     */
    Framework.Config = {
        fps :30,
        canvasWidth :794,
        canvasHeight :500,
//		canvasWidth : 640,
//		canvasHeight :480,
        isBackwardCompatiable :false,
        isOptimize :false,  // 2017.02.20, from V3.1.1
        isMouseMoveRecorded :false,
    };

    //Lock config
    Object.freeze(Framework.Config);

    return Framework;
})(Framework || {});
