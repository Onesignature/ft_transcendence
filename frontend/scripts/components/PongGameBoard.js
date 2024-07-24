import Onion, { Component, createRef } from '../../modules/onion/index.js';

export default class PongGameBoard extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.canvasRef = createRef();
        this.state = {
            scoreOne: 0,
            scoreTwo: 0
        };
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
        this.canvas = this.canvasRef.current;
        this.canvasContext = this.canvas.getContext("2d");
        
        this.initializeGame();
        
        window.addEventListener("resize", this.adjustPaddlePositions);
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }

    onUnmount()
    {
        window.removeEventListener("resize", this.adjustPaddlePositions);
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }

    initializeGame()
    {
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
        if (this.keysPressed["w"] && this.playerOne.y - this.playerOne.speed > 0)
        {
            this.playerOne.y -= this.playerOne.speed;
        }
        if (this.keysPressed["s"] && this.playerOne.y + this.playerOne.height + this.playerOne.speed < this.canvas.height)
        {
            this.playerOne.y += this.playerOne.speed;
        }
        if (this.keysPressed["ArrowUp"] && this.playerTwo.y - this.playerTwo.speed > 0)
        {
            this.playerTwo.y -= this.playerTwo.speed;
        }
        if (this.keysPressed["ArrowDown"] && this.playerTwo.y + this.playerTwo.height + this.playerTwo.speed < this.canvas.height)
        {
            this.playerTwo.y += this.playerTwo.speed;
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
            this.canvasContext.fillRect(element.x, element.y, element.width, element.height);
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
            this.resetBall();
            this.setState({ scoreOne: (this.state.scoreOne + 1) });
        }
        else if (this.ball.x - this.ball.speedX < this.ball.radius)
        {
            this.resetBall();
            this.setState({ scoreTwo: (this.state.scoreTwo + 1) });
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
        if (this.state.scoreOne > this.state.scoreTwo)
        {
            this.ball.speedX = this.ballSpeed;
        }
        else
        {
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
        this.props.onClickUpdateScore(this.state.scoreOne, this.state.scoreTwo);
    }

    loop()
    {
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
