GameStates.MainMenu = function(game) {

};



GameStates.MainMenu.prototype = {
    create: function() {


        background = this.add.tileSprite(0, 0, 800, 600, 'menu');

        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.enterKey.onDown.add(this.playGame, this);
    },
    playGame: function() {
    
        this.state.start('Level1');
    }
};