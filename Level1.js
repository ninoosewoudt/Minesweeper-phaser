GameStates.Level1 = function(game) {

};

var gameProperties = {

    tileWidth: 50,
    tileHeight: 50,

    boardWidth: 16,
    boardHeight: 10,

    totalBombs: 15,
    bombCount: 0,
    
};

var tilesMap = ["open", "open1", "open2", "open3", "open4", "open5", "open6", "open7", "open8", "bomb"];

var board = new Array();

GameStates.Level1.prototype = {

    create: function() {
       

        var tile;
        for (var j = 0; j < gameProperties.boardWidth; j++) {
            board[j] = new Array();
            for (var i = 0; i < gameProperties.boardHeight; i++) {
                tile = this.add.sprite(gameProperties.tileWidth * j, 50 + gameProperties.tileHeight * i, 'closed');
                tile.scale.setTo(.5, .5);
                tile.inputEnabled = true;
                tile.events.onInputDown.add(tileClickListener, this);
                tile.xLoc = j;
                tile.yLoc = i;
                tile.tileVal = "back";
                tile.revealed = false;
                board[j][i] = tile;
            }
        }
        genBombs();
        genTileVals();

    }

};

function genBombs() {
    var bombNum = 0;
    var randX;
    var randY;
    var tile;

    while (bombNum < gameProperties.totalBombs) {
        randX = Math.floor(Math.random() * gameProperties.boardWidth);
        randY = Math.floor(Math.random() * gameProperties.boardHeight);
        tile = board[randX][randY];
        if (tile.tileVal == "back") {
            tile.tileVal = "9";
            bombNum++;
        }
    }
}

function genTileVals() {
    for (var j = 0; j < gameProperties.boardWidth; j++) {
        for (var i = 0; i < gameProperties.boardHeight; i++) {
            if (board[j][i].tileVal != "9") {
                var tmp = 0;
                for (var jj = -1; jj <= 1; jj++) {
                    for (var ii = -1; ii <= 1; ii++) {
                        var tj = j + jj;
                        var ti = i + ii;
                        if (tj >= 0 && tj < gameProperties.boardWidth && ti >= 0 && ti < gameProperties.boardHeight && !(j == tj && i == ti) && board[tj][ti].tileVal == "9") {
                            tmp++;
                        }
                    }
                }

                board[j][i].tileVal = tmp;
            }
        }
    }
}

function tileClickListener(ind) {
    ind.inputEnabled = false;
    ind.events.onInputDown.removeAll();

    var tile;
    var shiftClick = this.input.keyboard.isDown(Phaser.Keyboard.SHIFT);

    if (shiftClick && ind.tileVal != "9" || ind.tileVal == "9" && !shiftClick ) {
        this.state.start('GameOver');
        
    }

    if (shiftClick && ind.tileVal == "9")
        gameProperties.bombCount++;

    tile = this.add.sprite(ind.x, ind.y, tilesMap[ind.tileVal]);

    if (ind.tileVal == 0)
        floodFill.call(this, ind.xLoc, ind.yLoc);

  
        tile.scale.setTo(.5, .5);
        tile.xLoc = ind.xLoc;
        tile.yLoc = ind.yLoc;
        tile.revealed = true;
        tile.tileVal = ind.tileVal;
        board[tile.xLoc][tile.yLoc] = tile;
        ind.destroy();
    

    if (gameProperties.bombCount == gameProperties.totalBombs) {
        gameProperties.bombCount = 0;
        this.state.start('WinScreen');
        
    }

}

function floodFill(col, row) {
    var tile;
    var ind = board[col][row];
    if (ind.tileVal != '9' && !ind.revealed) {
        ind.inputEnabled = false;
        ind.events.onInputDown.removeAll();
        tile = this.add.sprite(ind.x, ind.y, tilesMap[ind.tileVal]);
        tile.scale.setTo(.5, .5);
        tile.xLoc = ind.xLoc;
        tile.yLoc = ind.yLoc;
        tile.revealed = true;
        tile.tileVal = ind.tileVal;
        board[col][row] = tile;
        ind.destroy();

        for (var j = -1; j <= 1; j++) {
            for (var i = -1; i <= 1; i++) {
                var tj = col + j;
                var ti = row + i;
                if (tj >= 0 && tj < gameProperties.boardWidth && ti >= 0 && ti < gameProperties.boardHeight && !(col == tj && row == ti)) {
                    if (ind.tileVal > 0)
                        return;
                    floodFill.call(this, tj, ti);
                }
            }
        }
    }
}