const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const generateRandomColor = () => `rgb(${generateRandomNumber(0, 255)},${generateRandomNumber(0, 255)},${generateRandomNumber(0, 255)})`;

// Object for the ball

class Ball {
    constructor(x,y,velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    };

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    };

    update(){
        if((this.x + this.size) >= width){
            this.velX = -(this.velX);
        }

        if((this.x  - this.size) <= 0){
            this.velX = -(this.velX);
        };

        if((this.y + this.size) >= height){
            this.velY = -(this.velY);
        };

        if((this.y - this.size) <= 0){
            this.velY = -(this.velY)
        };

        this.x = this.x + this.velX;
        this.y = this.y + this.velY;
    };

    collisionDetection(){
        for (const ball of balls) {
            if (this !== ball) {
              const dx = this.x - ball.x;
              const dy = this.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < this.size + ball.size) {
                ball.color = this.color = generateRandomColor();
              }
            }
          }
    };
};

// generating the balls

const balls = [];

while(balls.length < 100){
    const size = generateRandomNumber(10,20);
    const ball = new Ball(generateRandomNumber(0 + size, width - size), generateRandomNumber(0 + size, height - size), generateRandomNumber(-7, 7), generateRandomNumber(-7,7), generateRandomColor(), size);
    balls.push(ball)
};

// looping and updating the balls

const loop = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0,0,width, height);

    for (const ball of balls){
        ball.draw();
        ball.update();
        ball.collisionDetection();
    };

    requestAnimationFrame(loop);
};

loop();
