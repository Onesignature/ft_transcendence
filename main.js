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
    y: (canvas.height - 80) / 2,
    width: 15,
    height: 80,
    color: '#ffd335',
    speed: 10,
};

const playerTwo = {
    x: 625,
    y: (canvas.height - 80) / 2,
    width: 15,
    height: 80,
    color: '#ffd335',
    speed: 10,
};

const INITIAL_SPEED = 4;
let ballSpeed = INITIAL_SPEED;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    color: '#fff',
    speedX: ballSpeed,
    speedY: 0,
};

let keysPressed = {
    "w": false,
    "s": false,
    "ArrowUp": false,
    "ArrowDown": false,
};

const PADDLE_SPEED = 2.5;

window.addEventListener("keydown", (e) => {
    keysPressed[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keysPressed[e.key] = false;
});

// Create divs for player names and scores
const playerInfoDiv = document.createElement('div');
playerInfoDiv.style.position = "absolute";
playerInfoDiv.style.left = `${centerX}px`;
playerInfoDiv.style.top = `${centerY - 60}px`; // Positioned above the main canvas
playerInfoDiv.style.width = "650px";
playerInfoDiv.style.height = "50px";
playerInfoDiv.style.display = "flex";
playerInfoDiv.style.justifyContent = "space-between";
playerInfoDiv.style.alignItems = "center";
playerInfoDiv.style.color = "#ffd335";
playerInfoDiv.style.fontSize = "24px";
playerInfoDiv.style.fontFamily = "Arial";

const playerOneDiv = document.createElement('div');
playerOneDiv.textContent = 'Player1';
playerOneDiv.style.border = "2px solid #ffd335";
playerOneDiv.style.padding = "5px";

const scoreDiv = document.createElement('div');
scoreDiv.style.color = "#ffffff";
scoreDiv.style.fontSize = "30px";

const playerTwoDiv = document.createElement('div');
playerTwoDiv.textContent = 'Player2';
playerTwoDiv.style.border = "2px solid #ffd335";
playerTwoDiv.style.padding = "5px";

playerInfoDiv.appendChild(playerOneDiv);
playerInfoDiv.appendChild(scoreDiv);
playerInfoDiv.appendChild(playerTwoDiv);

document.body.appendChild(playerInfoDiv);

function updatePlayerPositions() {
    if (keysPressed["w"] && playerOne.y - PADDLE_SPEED > 0) {
        playerOne.y -= PADDLE_SPEED;
    }
    if (keysPressed["s"] && playerOne.y + playerOne.height + PADDLE_SPEED < canvas.height) {
        playerOne.y += PADDLE_SPEED;
    }
    if (keysPressed["ArrowUp"] && playerTwo.y - PADDLE_SPEED > 0) {
        playerTwo.y -= PADDLE_SPEED;
    }
    if (keysPressed["ArrowDown"] && playerTwo.y + playerTwo.height + PADDLE_SPEED < canvas.height) {
        playerTwo.y += PADDLE_SPEED;
    }
}

function displayScores() {
    scoreDiv.textContent = `${scoreOne} : ${scoreTwo}`;
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

function normalizeSpeed() {
    const angle = Math.atan2(ball.speedY, ball.speedX);
    ball.speedX = ballSpeed * Math.cos(angle);
    ball.speedY = ballSpeed * Math.sin(angle);
}

function ballWallCollision() {
    if (ball.y + ball.speedY > canvas.height - ball.radius || ball.y + ball.speedY < ball.radius) {
        ball.speedY = -ball.speedY;
        normalizeSpeed();
    }
    if (ball.x + ball.speedX > canvas.width - ball.radius) {
        scoreOne++;
        scoreOneScored = 1;
        resetBall();
    } else if (ball.x - ball.speedX < ball.radius) {
        scoreTwo++;
        scoreTwoScored = 1;
        resetBall();
    }
}

function ballPaddleCollision(player) {
    if (
        ball.x < player.x + player.width + ball.radius &&
        ball.x > player.x - ball.radius &&
        ball.y < player.y + player.height + ball.radius &&
        ball.y > player.y - ball.radius
    ) {
        let paddleCenter = player.y + player.height / 2;
        let hitPos = (ball.y - paddleCenter) / (player.height / 2);
        ball.speedY = hitPos * ballSpeed;
        if (ball.speedX > 0) {
            ball.x = player.x - ball.radius;
        } else {
            ball.x = player.x + player.width + ball.radius;
        }
        ball.speedX = -ball.speedX;
        normalizeSpeed();
    }
}

function resetBall() {
    ballSpeed = INITIAL_SPEED;
    if (scoreOne > scoreTwo) {
        ball.speedX = ballSpeed;
    } else {
        ball.speedX = -ballSpeed;
    }
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedY = 0;
    resetPaddles();
}

function resetPaddles() {
    playerOne.y = (canvas.height - playerOne.height) / 2;
    playerTwo.y = (canvas.height - playerTwo.height) / 2;
}

function drawElements() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    displayScores();
}

function loop() {
    updatePlayerPositions();
    ballWallCollision();
    ballPaddleCollision(playerOne);
    ballPaddleCollision(playerTwo);
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    drawElements();
    requestAnimationFrame(loop);
}

loop();
