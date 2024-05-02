// Set canvas to be in the center of the browser window
const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

// Calculate center position for canvas
const centerX = (window.innerWidth - canvas.width) / 2;
const centerY = (window.innerHeight - canvas.height) / 2;

// Set canvas position and style
canvas.style.position = "absolute";
canvas.style.left = `${centerX}px`;
canvas.style.top = `${centerY}px`;
canvas.style.border = "yellow solid 5px";
document.body.style.backgroundColor = "black";

let scoreOne = 0;
let scoreTwo = 0;

const playerOne = {
    x: 10,
    y: 200,
    width: 15,
    height: 80,
    color: '#ffd335',
    speed: 10, // Adjust speed for paddle movement
};

const playerTwo = {
    x: 625,
    y: 200,
    width: 15,
    height: 80,
    color: '#ffd335',
    speed: 10, // Adjust speed for paddle movement
};

const BALL_SPEED_X = 2; // Constant speed for the ball along X-axis
const BALL_SPEED_Y = 2; // Constant speed for the ball along Y-axis

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8, // Adjust ball size
    color: '#fff',
    speedX: BALL_SPEED_X,
    speedY: BALL_SPEED_Y,
};

// Key movement
window.addEventListener("keydown", doKeyDown);

function doKeyDown(e) {
    const key = e.key;
    if (key === "w" && playerOne.y - playerOne.speed > 0)
        playerOne.y -= playerOne.speed;
    else if (key === "s" && playerOne.y + playerOne.height + playerOne.speed < canvas.height)
        playerOne.y += playerOne.speed;

    if (key === "i" && playerTwo.y - playerTwo.speed > 0)
        playerTwo.y -= playerTwo.speed;
    else if (key === "k" && playerTwo.y + playerTwo.height + playerTwo.speed < canvas.height)
        playerTwo.y += playerTwo.speed;
}

function displayScores() {
    context.font = "18px Arial";
    context.fillStyle = "#ffd335";
    context.fillText(scoreOne, canvas.width / 2 - 60, 30);
    context.fillText(scoreTwo, canvas.width / 2 + 60, 30);
}

function drawElement(element) {
    context.fillStyle = element.color;
    if (element === ball) {
        context.beginPath();
        context.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
        context.fill();
    } else {
        context.fillRect(element.x, element.y, element.width, element.height);
    }
}

function ballWallCollision() {
    if (ball.y + ball.speedY > canvas.height - ball.radius || ball.y + ball.speedY < ball.radius) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x + ball.speedX > canvas.width - ball.radius) {
        scoreOne++;
        resetBall();
    } else if (ball.x - ball.speedX < ball.radius) {
        scoreTwo++;
        resetBall();
    }

    ballPaddleCollision(playerOne);
    ballPaddleCollision(playerTwo);
}

function ballPaddleCollision(player) {
    if (
        ball.x + ball.radius >= player.x &&
        ball.x - ball.radius <= player.x + player.width &&
        ball.y + ball.radius >= player.y &&
        ball.y - ball.radius <= player.y + player.height
    ) {
        // Check if the ball is moving towards the paddle
        if ((ball.speedX < 0 && player === playerOne) || (ball.speedX > 0 && player === playerTwo)) {
            ball.speedX = -ball.speedX; // Change ball's horizontal direction
        }
    }
}


function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = BALL_SPEED_X;
    ball.speedY = BALL_SPEED_Y;
}

function drawElements() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    displayScores();
}

function loop() {
    ballWallCollision();
    ball.x += ball.speedX; // Update ball's horizontal position
    ball.y += ball.speedY; // Update ball's vertical position
    drawElements();
    requestAnimationFrame(loop);
}

loop();
