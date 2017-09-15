GameStates.WinScreen = function(game) {

};






GameStates.WinScreen.prototype = {

    create: function() {
        background = this.add.tileSprite(0, 0, 800, 600, 'won');

        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.enterKey.onDown.add(this.playGame, this);





    },

    playGame: function() {

        this.state.start('MainMenu');
    }






};