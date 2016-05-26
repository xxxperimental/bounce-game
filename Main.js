var gameBoard = document.getElementById("gameboard");
var ctx = gameBoard.getContext("2d");


var currHeight = gameBoard.height = window.innerHeight / 1.5,
    currWidth = gameBoard.width = document.body.clientWidth;

var keys = [];

function clearCanvas() {
    ctx.clearRect(0, 0, currWidth, currHeight);
}

let ball = new Ball(60, "red");

ball.x = 0;
ball.y = 60;

var bounceCount = 0;

var obstacleCount = 0;

var screen = new Screen(currHeight, currWidth);
screen.generateObstacles(++obstacleCount);

function update() {
    clearCanvas();
    ball.draw();

    if (keys[39]) {
        ball.goRight();
    }
    if (keys[37]) {
        ball.goLeft();
    }
    if (keys[32]) {
        if (ball.y == 440 || ball.y > currHeight - ball.radius - 1) {
            ball.jump();
            bounceCount = 0;
        }
    }

    ball.y += ball.velocityY;
    ball.velocityY += ball.gravity;

    ball.x += ball.velocityX;
    ball.velocityX *= ball.gravity;

    if (ball.x < 0) {
        ball.x = 0;
    }

    if (ball.y + ball.radius > currHeight) {
        ball.y = currHeight - ball.radius;
        ball.velocityY *= -ball.bounceFactor;

        if (bounceCount++ == 1) {
            ball.clearBounce();
        }
    }

    if (ball.x > this.currWidth) {
        clearCanvas();
        ball.draw();
        ball.x = 0;
        screen.generateObstacles(++obstacleCount);
    }

    for (var i = 0; i < obstacleCount; i++) {
        var obstacle = screen.obstacleArray[i];
        obstacle.draw();
        console.log(obstacle.x);
        console.log(obstacle.y);

        if (ball.x + ball.radius > obstacle.x &&
            ball.x + ball.radius < obstacle.x + 5 &&
            ball.y + ball.radius > obstacle.y) {
            ball.x = obstacle.x - ball.radius;
        }
        else if (ball.x + ball.radius > obstacle.x + 5 &&
            ball.x < obstacle.x + obstacle.width - 5 &&
            ball.y + ball.radius > obstacle.y) {
            ball.y = obstacle.y - ball.radius;

            ball.velocityY = 0;
        }
        else if (ball.x < obstacle.x + obstacle.width &&
            ball.x > obstacle.x + obstacle.width - 5 &&
            ball.y + ball.radius > obstacle.y) {
            ball.x = obstacle.x + obstacle.width;
        }
    }


    ctx.font = '30px sans-serif';
    ctx.fillStyle = 'black';
    ctx.strokeText("Level " + obstacleCount, 15, 30);
    ctx.font = "15px sans-serif";
    ctx.fillText("Ball x: " + ball.x, this.currWidth - 200, 15);
    ctx.fillText("Ball y: " + ball.y, this.currWidth - 200, 35);
}


document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

setInterval(update, 1000 / 60);