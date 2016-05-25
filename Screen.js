class Obstacle {

    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.radius = 20;
    }


    draw() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}

class Screen {
    constructor(currHeight, currWidth) {
        this.obstacleArray = [];
        this.currHeight = currHeight;
        this.currWidth = currWidth;
    }
    
    generateObstacles(obstacleCount) {
        this.obstacleArray = [];
        for (var i = 0; i < obstacleCount; i++)
        {
            var height = 100;
            var width = 100;
            var x = Math.floor((Math.random() * this.currWidth) + 100);
            var y = this.currHeight - height;
            let obstacle = new Obstacle(x, y, width, height, 'blue');
            // console.log(obstacle.x);
            // console.log(obstacle.y);
            this.obstacleArray.push(obstacle);
        }
    }
}