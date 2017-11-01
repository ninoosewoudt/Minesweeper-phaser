var GameStates = {



};

GameStates.Boot = function(game) {


};

GameStates.Boot.prototype = {
  preload: function() {


    // load assets to be used later in the preloader e.g. for loading screen / splashscreen
    //this.load.image('preloaderBar', 'Assets/preloader-bar.png');
  },
  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;


    // setup game environment
    // scale, input etc..

    // call next state
    this.state.start('Preloader');
  }
};
