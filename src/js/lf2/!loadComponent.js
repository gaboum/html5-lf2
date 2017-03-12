'use strict';
(function () {
    const GAME_COMPONENT=[
        'define.js',
        'Utils.js',
        'Rectangle.js',
        'ImageInformation.js',
        'KeyboardConfig.js',

        'ColorBar.js',
        'BmpInfo.js',
        'Interaction.js',
        'Body.js',
        'Frame.js',
        'GameObject.js',
        'GameObjectPool.js',
        'GameItem.js',
        'GameObjectBall.js',
        'GameObjectCharacter.js',

        'Ball.js',
        'Character.js',

        'PlayerStatusPanel.js',
        'Player.js',

        'GameMapLayer.js',
        'GameMap.js',
        'GameMapPool.js',

        'WorldScene.js',

        'LaunchMenu.js',
        'MySettingLevel.js',
        'LoadingLevel.js',
        'FightLevel.js',

        '!MainGame.js',
    ];

    LoadScriptInSequence.call(document.currentScript, GAME_COMPONENT);
})();
