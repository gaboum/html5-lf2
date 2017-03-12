"use strict";
var lf2 = (function (lf2) {
    const Utils = lf2.Utils;
    const Body = lf2.Body;
    const Interaction = lf2.Interaction;
    const GameObject = lf2.GameObject;
    const GameItem = lf2.GameItem;
    const GameObjectPool = lf2.GameObjectPool;
    const PlayerStatusPanel = lf2.PlayerStatusPanel;
    const KeyboardConfig = lf2.KeyboardConfig;
    const KeyBoardManager = Framework.KeyBoardManager;
    const Character = lf2.Character;
    const DEFAULT_HP = 500;
    const DEFAULT_MP = 500;
    /**
     * Player
     *
     * @class lf2.Player
     * @implements Framework.AttachableInterface
     */
    lf2.Player = class Player {
        /**
         *
         * @param {Number} playerId
         * @param {Number} charId
         */
        constructor(playerId, charId) {
            console.log('Create player', playerId, charId);

            this.playerId = playerId;
            this.charId = charId;
            this.status = new PlayerStatusPanel(this);

            this.keyboardConfig = new KeyboardConfig(playerId);
            this.name = this.keyboardConfig.NAME;

            /**
             *
             * @type {lf2.Character}
             */
            this.character = new Character(charId);
            this.character.belongTo = playerId;

            this.hp = DEFAULT_HP;
            this.mp = DEFAULT_MP;

            this._currentDownFunctionKey = 0;
        }

        /**
         *
         * @param e
         * @param list
         * @param {KeyboardEvent} oriE
         */
        keydown(e, list, oriE) {
            this.character.setFuncKey(this._parseKeyDownCode(oriE));
        }

        /**
         *
         * @param e
         * @param list
         * @param {KeyboardEvent} oriE
         */
        keyup(e, list, oriE) {
            this.character.setFuncKey(this._parseKeyDownCode(oriE));
        }

        /**
         * Parse key down code, {"ja", "Fj", "Fa", "Dj", "Da", "Uj", "Ua", "j", "d", "a"}
         *
         * @param {KeyboardEvent} e
         * @returns {Number} return hit key code
         * @private
         */
        _parseKeyDownCode(e) {
            const KEY_CONFIG = this.keyboardConfig.config;
            let currentKey = 0;

            KeyboardConfig.KEY_MAP.KEY_LIST.forEach((k) => {
                if (KeyBoardManager.isKeyDown(KEY_CONFIG[k])) currentKey |= KeyboardConfig.KEY_MAP[k];
            });

            let hitFuncCode = 0;
            for (
                let o = KeyboardConfig.HIT_KEY.HIT_LIST, i = 0, j = o.length;
                i < j && hitFuncCode === 0;
                i++
            ) {
                let hit = o[i];
                if ((currentKey & KeyboardConfig.HIT_KEY[hit]) === KeyboardConfig.HIT_KEY[hit]) {
                    hitFuncCode = KeyboardConfig.HIT_KEY[hit];
                    break;
                }
            }

            return hitFuncCode;
        }

        load() {

        }

        /**
         * Update
         *
         * @override
         */
        update() {


            this.character.update();

        }

        /**
         * Draw player with camera offset
         *
         * @param {CanvasRenderingContext2D} ctx
         * @override
         */
        draw(ctx) {

            this.character.draw(ctx);
        }

        /**
         *
         * @returns {boolean}
         */
        get isObjectChanged() {
            return true;
        }

    };

    lf2.Player.prototype.DEFAULT_HP = DEFAULT_HP;
    lf2.Player.prototype.DEFAULT_MP = DEFAULT_MP;


    return lf2;
})(lf2 || {});