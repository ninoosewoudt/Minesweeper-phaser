GameStates.MainMenu = function(game) {

};



GameStates.MainMenu.prototype = {
  create: function() {



    this.stage.backgroundColor = '#ebe';

    this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    this.enterKey.onDown.add(this.playGame, this);
  },
  playGame: function() {

    this.state.start('Level1');
  }
};
