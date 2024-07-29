import { Component, createRef } from '../../modules/onion/index.js';

export default class PongAIGameBoard extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.running = true;
        this.canvasRef = createRef();
        this.keysPressed = {
            "w": false,
            "s": false,
            "ArrowUp": false,
            "ArrowDown": false,
        };

        this.loop = this.loop.bind(this);
        this.adjustPaddlePositions = this.adjustPaddlePositions.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    onMount()
    {
        this.running = !this.props.pause;
        this.canvas = this.canvasRef.current;
        this.canvasContext = this.canvas.getContext("2d");

        this.initializeGame();

        window.addEventListener("resize", this.adjustPaddlePositions);
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }

    onUnmount()
    {
        this.running = false;

        window.removeEventListener("resize", this.adjustPaddlePositions);
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }

    initializeGame()
    {
        this.scoreOne = this.props.scoreOne;
        this.scoreTwo = this.props.scoreTwo;

        this.playerOne = {
            x: 10,
            y: (this.canvas.height - 80) / 2,
            width: 15,
            height: 80,
            color: '#ffd335',
            speed: 10,
        };

        this.playerTwo = {
            x: this.canvas.width - 25,
            y: (this.canvas.height - 80) / 2,
            width: 15,
            height: 80,
            color: '#ffd335',
            speed: 10,
            difficulty: this.props.difficulty || 1 // Add difficulty parameter (1: Easy, 2: Medium, 3: Hard)
        };

        this.INITIAL_SPEED = 8;
        this.ballSpeed = this.INITIAL_SPEED;

        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            radius: 8,
            color: '#fff',
            speedX: this.ballSpeed,
            speedY: 0,
        };

        this.adjustPaddlePositions();
        this.loop();
    }

    handleKeyDown(event)
    {
        this.keysPressed[event.key] = true;
    }

    handleKeyUp(event)
    {
        this.keysPressed[event.key] = false;
    }

    adjustPaddlePositions()
    {
        this.playerTwo.x = this.canvas.width - this.playerTwo.width - 10;
    }

    updatePlayerPositions()
    {
        // Player One controls
        if (this.keysPressed["w"] && this.playerOne.y - this.playerOne.speed > 0) {
            this.playerOne.y -= this.playerOne.speed;
        }
        if (this.keysPressed["s"] && this.playerOne.y + this.playerOne.height + this.playerOne.speed < this.canvas.height) {
            this.playerOne.y += this.playerOne.speed;
        }

        // Player Two (AI) controls
        this.updateAIPlayer();
    }

    updateAIPlayer()
    {
        // Predict the ball's future Y position
        const ballFutureY = this.ball.y + (this.ball.speedY * 1); // Predict position 1 second ahead

        // Determine the target Y position for the AI paddle
        const targetY = ballFutureY - (this.playerTwo.height / 2);

        // Smoothly move AI paddle towards the target Y position
        // Adjust difficultyFactor to make AI easier or harder
        const difficultyFactors = [0.1, 0.05, 0.01]; // Difficulty levels (0: Easy, 1: Medium, 2: Hard)
        const difficultyFactor = difficultyFactors[this.playerTwo.difficulty - 1] || 0.1;
        this.playerTwo.y += (targetY - this.playerTwo.y) * difficultyFactor;

        // Ensure AI paddle stays within canvas bounds
        if (this.playerTwo.y < 0)
        {
            this.playerTwo.y = 0;
        }
        if (this.playerTwo.y + this.playerTwo.height > this.canvas.height)
        {
            this.playerTwo.y = this.canvas.height - this.playerTwo.height;
        }
    }

    drawElement(element)
    {
        this.canvasContext.fillStyle = element.color;
        if (element === this.ball)
        {
            this.canvasContext.beginPath();
            this.canvasContext.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
            this.canvasContext.fill();
        }
        else
        {
            this.canvasContext.fillRect(element.x, element.y, element.width, element.height);
        }
    }

    normalizeSpeed()
    {
        const angle = Math.atan2(this.ball.speedY, this.ball.speedX);
        this.ball.speedX = this.ballSpeed * Math.cos(angle);
        this.ball.speedY = this.ballSpeed * Math.sin(angle);
    }

    ballWallCollision()
    {
        if (this.ball.y + this.ball.speedY > this.canvas.height - this.ball.radius || this.ball.y + this.ball.speedY < this.ball.radius)
        {
            this.ball.speedY = -this.ball.speedY;
            this.normalizeSpeed();
        }
        if (this.ball.x + this.ball.speedX > this.canvas.width - this.ball.radius)
        {
            this.scoreOne += 1;
            this.resetBall();
        }
        else if (this.ball.x - this.ball.speedX < this.ball.radius)
        {
            this.scoreTwo += 1;
            this.resetBall();
        }
    }

    ballPaddleCollision(player)
    {
        if (this.ball.x < player.x + player.width + this.ball.radius &&
            this.ball.x > player.x - this.ball.radius &&
            this.ball.y < player.y + player.height + this.ball.radius &&
            this.ball.y > player.y - this.ball.radius)
        {
            let paddleCenter = player.y + player.height / 2;
            let hitPos = (this.ball.y - paddleCenter) / (player.height / 2);
            this.ball.speedY = hitPos * this.ballSpeed;
            if (this.ball.speedX > 0)
            {
                this.ball.x = player.x - this.ball.radius;
            }
            else
            {
                this.ball.x = player.x + player.width + this.ball.radius;
            }
            this.ball.speedX = -this.ball.speedX;
            this.normalizeSpeed();
        }
    }

    resetBall()
    {
        this.ballSpeed = this.INITIAL_SPEED;
        if (this.scoreOne > this.scoreTwo) {
            this.ball.speedX = this.ballSpeed;
        } else {
            this.ball.speedX = -this.ballSpeed;
        }
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.speedY = 0;

        this.resetPaddles();
    }

    resetPaddles()
    {
        this.playerOne.y = (this.canvas.height - this.playerOne.height) / 2;
        this.playerTwo.y = (this.canvas.height - this.playerTwo.height) / 2;
    }

    drawElements()
    {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawElement(this.playerOne);
        this.drawElement(this.playerTwo);
        this.drawElement(this.ball);
        this.displayScores();
    }

    displayScores()
    {
        this.props.onClickUpdateScore(this.scoreOne, this.scoreTwo);
    }

    loop()
    {
        if (!this.running) return;

        this.updatePlayerPositions();

        this.ballWallCollision();
        this.ballPaddleCollision(this.playerOne);
        this.ballPaddleCollision(this.playerTwo);

        this.ball.x += this.ball.speedX;
        this.ball.y += this.ball.speedY;

        this.drawElements();

        requestAnimationFrame(this.loop);
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="/styles/PongGameBoard.css">
            <canvas id="pongGame" ref="canvasRef" width="900" height="600"></canvas>
        `;
    }
}
