var gameBoard = document.getElementById("gameboard");
var ctx = gameBoard.getContext("2d");

var curHeight = gameBoard.height = window.innerHeight / 1.5,
    curWidth = gameBoard.width = document.body.clientWidth;

var keys = [];

function clearCanvas() {
    ctx.clearRect(0, 0, curWidth, curHeight);
}

let ball = new Ball(60, "red");

ball.x = 0;
ball.y = 60;

var bounceCount = 0;

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
        if (ball.y > curHeight - ball.radius - 1) {
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

    if (ball.y + ball.radius > curHeight) {
        ball.y = curHeight - ball.radius;
        ball.velocityY *= -ball.bounceFactor;

        if (bounceCount++ == 1) {
            ball.clearBounce();
        }
    }

}
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

setInterval(update, 1000 / 60);