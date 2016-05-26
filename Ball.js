class Ball {

    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.velocityX = 0;
        this.velocityY = 1;
        this.speed = 2;
        this.avatarSrc = "freebsd2.png";
        this.gravity = 0.9;
        this.bounceFactor = 0.4;
    }

    draw() {
        ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        let avatar = new Image();
        avatar.src = this.avatarSrc;
        // avatar.naturalWidth = this.radius*2;
        ctx.drawImage(avatar, this.x, this.y, this.radius, this.radius);

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    restoreBounce() {
        this.bounceFactor = 0.4;
    }

    clearBounce () {
        this.bounceFactor = 0;
    }
    
    goRight() {
        if (ball.velocityX < ball.speed) {
            ball.velocityX += 3;
        }
        ball.avatarSrc = "freebsd2.png";
    }
    goLeft() {
        if (ball.velocityX > -ball.speed) {
            ball.velocityX -= 3;
        }
        ball.avatarSrc = "freebsd.png";
    }
    jump() {
        ball.velocityY = 40;
        this.restoreBounce();
    }
}