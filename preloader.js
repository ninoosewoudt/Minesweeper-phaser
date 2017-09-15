GameStates.Preloader = function(game) {
    this.preloadBar = null;
}



GameStates.Preloader.prototype = {

    preload: function() {
        // //loadingbar
        // this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        // this.load.setPreloadSprite(this.preloadBar);

        // load all game assets
        this.load.image('menu', "Assets/startMenu.png");
        this.load.image('lost', "Assets/lost.png");
        this.load.image('won', "Assets/won.png");
        this.load.image('closed', "Assets/closed.png");
        this.load.image('open', "Assets/open.png");
        this.load.image('open1', "Assets/open1.png");
        this.load.image('open2', "Assets/open2.png");
        this.load.image('open3', "Assets/open3.png");
        this.load.image('open4', "Assets/open4.png");
        this.load.image('open5', "Assets/open5.png");
        this.load.image('open6', "Assets/open6.png");
        this.load.image('open7', "Assets/open7.png");
        this.load.image('open8', "Assets/open8.png");
        this.load.image('bomb', "Assets/bomb.png");


    },

    create: function() {
        //start
        this.state.start('MainMenu');

    }
};