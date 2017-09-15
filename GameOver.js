GameStates.GameOver = function(game) {

};






GameStates.GameOver.prototype = {

    create: function() {
        background = this.add.tileSprite(0, 0, 800, 600, 'lost');

        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.enterKey.onDown.add(this.playGame, this);





    },

    playGame: function() {

        this.state.start('MainMenu');
    }




};