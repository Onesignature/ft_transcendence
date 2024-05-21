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

// Create additional canvas for player names and scores
const canvasTop = document.createElement('canvas');
const contextTop = canvasTop.getContext('2d');

// Set width, height, and styling for the new canvas
canvasTop.width = 650;
canvasTop.height = 50;
canvasTop.style.position = "absolute";
canvasTop.style.left = `${centerX}px`;
canvasTop.style.top = `${centerY - 60}px`; // Positioned above the main canvas
canvasTop.style.border = "none";

// Append the new canvas to the body of the document
document.body.appendChild(canvasTop);

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
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    
    // Set styles for player names
    contextTop.fillStyle = '#ffd335';
    contextTop.font = '24px Arial';  // Increased font size
    
    // Draw player names
    const playerOneText = 'Player1';
    const playerTwoText = 'Player2';
    const playerOneTextWidth = contextTop.measureText(playerOneText).width;
    const playerTwoTextWidth = contextTop.measureText(playerTwoText).width;

    // Player One name
    contextTop.fillText(playerOneText, 10, 35);  // Adjusted position
    contextTop.strokeStyle = '#ffd335';
    contextTop.lineWidth = 2;
    contextTop.strokeRect(5, 10, playerOneTextWidth + 10, 30);  // Add a border

    // Player Two name
    contextTop.fillText(playerTwoText, canvasTop.width - playerTwoTextWidth - 15, 35);  // Adjusted position
    contextTop.strokeRect(canvasTop.width - playerTwoTextWidth - 20, 10, playerTwoTextWidth + 10, 30);  // Add a border

    // Score in white
    contextTop.fillStyle = '#ffffff';
    contextTop.font = '30px Arial';  // Larger font size for the score
    contextTop.fillText(`${scoreOne} : ${scoreTwo}`, canvasTop.width / 2 - 35, 35);  // Adjusted position
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
