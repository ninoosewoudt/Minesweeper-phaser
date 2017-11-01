GameStates.Level1 = function(game) {

};

var snake, apple, squareSize, score, speed,
  updateDelay, direction, new_direction,
  addNew, cursors, scoreTextValue, speedTextValue,
  textStyle_Key, textStyle_Value;

GameStates.Level1.prototype = {


  create: function() {

    snake = [];
    apple = {};
    squareSize = 15;
    score = 0;
    speed = 0;
    updateDelay = 0;
    direction = 'right';
    new_direction = null;
    addNew = false;
    cursors = this.input.keyboard.createCursorKeys();

    for (var i = 0; i < 10; i++) {
      snake[i] = this.add.sprite(150 + i * squareSize, 150, 'snak'); // Parameters are (X coordinate, Y coordinate, image)
    }

    this.generateApple();

    textStyle_Key = {
      font: "bold 14px sans-serif",
      fill: "#46c0f9",
      align: "center"
    };
    textStyle_Value = {
      font: "bold 18px sans-serif",
      fill: "#fff",
      align: "center"
    };

    this.add.text(screen.width / 8, 20, "SCORE", textStyle_Key);
    scoreTextValue = this.add.text(screen.width / 8 + 60, 18, score.toString(), textStyle_Value);

    this.add.text(screen.width - 50 - screen.width / 8, 20, "SPEED", textStyle_Key);
    speedTextValue = this.add.text(screen.width - 50 - screen.width / 8 + 60, 18, speed.toString(), textStyle_Value);



  },

  update: function() {
    if (cursors.right.isDown && direction != 'left') {
      new_direction = 'right';
    } else if (cursors.left.isDown && direction != 'right') {
      new_direction = 'left';
    } else if (cursors.up.isDown && direction != 'down') {
      new_direction = 'up';
    } else if (cursors.down.isDown && direction != 'up') {
      new_direction = 'down';
    }

    speed = Math.min(10, Math.floor(score / 5));
    speedTextValue.text = '' + speed;

    updateDelay++;

    if (updateDelay % (10 - speed) == 0) {


      var firstCell = snake[snake.length - 1],
        lastCell = snake.shift(),
        oldLastCellx = lastCell.x,
        oldLastCelly = lastCell.y;

      if (new_direction) {
        direction = new_direction;
        new_direction = null;
      }


      if (direction == 'right') {

        lastCell.x = firstCell.x + 15;
        lastCell.y = firstCell.y;
      } else if (direction == 'left') {
        lastCell.x = firstCell.x - 15;
        lastCell.y = firstCell.y;
      } else if (direction == 'up') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - 15;
      } else if (direction == 'down') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + 15;
      }

      snake.push(lastCell);
      firstCell = lastCell;

      if (addNew) {
        snake.unshift(this.add.sprite(oldLastCellx, oldLastCelly, 'snak'));
        addNew = false;
      }

      this.appleCollision();

      this.selfCollision(firstCell);

      this.wallCollision(firstCell);
    }

  },
  generateApple: function() {


    var randomX = Math.floor(Math.random() * 40) * squareSize,
      randomY = Math.floor(Math.random() * 30) * squareSize;

    apple = this.add.sprite(randomX, randomY, 'snak');
  },
  appleCollision: function() {

    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x == apple.x && snake[i].y == apple.y) {

        addNew = true;

        apple.destroy();

        this.generateApple();

        score++;

        scoreTextValue.text = score.toString();

      }
    }

  },

  selfCollision: function(head) {

    for (var i = 0; i < snake.length - 1; i++) {
      if (head.x == snake[i].x && head.y == snake[i].y) {
        this.state.start('GameOver');

      }
    }

  },

  wallCollision: function(head) {

    if (head.x >= screen.width || head.x < 0 || head.y >= screen.height || head.y < 0) {

      this.state.start('GameOver');
    }

  }

};
