var Score = function() {
    ctx.clearRect(0, 0, 505, 50);
    ctx.font = '42px Impact';
    ctx.fillStyle = 'rgb(241,169,65)';
    ctx.textAlign = 'center';
    ctx.fillText('Human Versus Bug', 252.5, 40);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.strokeText('Human Versus Bug', 252.5, 40);

    ctx.clearRect(0, 590, 510, 300);
    ctx.font = '40px Impact';
    ctx.fillStyle = 'rgb(95,193,72)';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + player.score, 5, 630);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.strokeText('Score: ' + player.score, 5, 630);

    ctx.font = '40px Impact';
    ctx.fillStyle = 'rgb(78,102,210)';
    ctx.textAlign = 'right';
    ctx.fillText('Hi-Score: ' + player.hiscore, 500, 630);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.strokeText('Hi-Score: ' + player.hiscore, 500, 630);
};



// Enemies our player must avoid. Includes random
// speed each enemy will travel at.
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.randomSpeed();
};

// Updates the enemy's position. moving the enemy 
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 505) {
        this.randomSpeed();
        this.x = -100;
    } else {
        this.x += (this.speed * dt);
    }
};

// Produces a random speed to be used each time enemy reaches end of the screen
Enemy.prototype.randomSpeed = function() {
    this.speed = (Math.floor(Math.random() * (550 - 200)) + 200);
};

// Draws the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class runs the this.lose function to set the
// initial playerlocation and randomise which
// sprite the player will play as
var Player = function(x, y) {
    this.lose();
    this.hiscore = 0;
};

// This runs the checkCollisions function
// and triggers the win method if the player reaches
// the water
Player.prototype.update = function(dt) {
    this.checkCollisions();
    if (this.y < 0) {
        alert("You did it!");
        this.win();
    }
};

// alerts array to be used in the checkCollisions method
var alerts = ['Mind those Bugs!', 'Oh no! You got hit by a Bug!', "The Bug got you!"];
// This method compares enemy and player 
// locations to check for collisions
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x + 50 >= allEnemies[i].x &&
            this.x < allEnemies[i].x + 60 &&
            this.y + 50 >= allEnemies[i].y &&
            this.y < allEnemies[i].y + 40) {
            alert(alerts[Math.floor(Math.random() * alerts.length)]);
            this.lose();
        }
    }
};

// this lose method resets the player if the player collides.
// and randomizes which sprite the player plays as.
Player.prototype.lose = function() {
    this.x = 202;
    this.y = 400;
    this.sprite = sprites[Math.floor(Math.random() * sprites.length)];
    this.score = 0;
};

// thsi win method resets the player to the beginning
// and updates the score and hi-scores
Player.prototype.win = function() {
    this.x = 202;
    this.y = 400;
    this.score += 1;
    if (this.hiscore >= this.score) {
        this.hiscore = this.hiscore;
    } else {
        this.hiscore += 1;
    }
};

//This renders the player and the scores at the bottom of the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    Score();
};

// This method defines how each key should move the player
Player.prototype.handleInput = function(direction) {
    if (direction === 'up') {
        this.y -= 83;
    }
    if (direction === 'down') {
        if (this.y < 400) {
            this.y += 83;
        } else {
            this.y = 400;
        }
    }
    if (direction === 'right') {
        if (this.x < 404) {
            this.x += 101;
        } else {
            this.x = 404;
        }
    }
    if (direction === 'left') {
        if (this.x > 0) {
            this.x -= 101;
        } else {
            this.x = 0;
        }
    }
};

// Objects instantiation.
// all enemy objects in an array called allEnemies
// player object in a variable called player
// sprites array has three possible player sprites to be chosen at random
var enemyOne = new Enemy(0, 229);
var enemyTwo = new Enemy(0, 146);
var enemyThree = new Enemy(0, 63);
var sprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png'];
var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player(202, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});