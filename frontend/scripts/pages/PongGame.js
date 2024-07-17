import { Component } from "../../modules/onion/index.js";

export default class PongGame extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            scoreOne: 0,
            scoreTwo: 0,
            keysPressed: {
                w: false,
                s: false,
                ArrowUp: false,
                ArrowDown: false,
            },
            playerOne: {
                x: 10,
                y: 0,
                width: 15,
                height: 80,
                color: '#ffd335',
                speed: 10,
            },
            playerTwo: {
                x: 0,
                y: 0,
                width: 15,
                height: 80,
                color: '#ffd335',
                speed: 10,
            },
            ball: {
                x: 0,
                y: 0,
                radius: 8,
                color: '#fff',
                speedX: 4,
                speedY: 0,
            },
        };
        this.INITIAL_SPEED = 4;
        this.PADDLE_SPEED = 2.5;
    }

    onMount()
    {
        this.canvas = document.getElementById('pongGame');
        this.context = this.canvas.getContext('2d');
        this.scoreDiv = document.getElementById('score');

        this.adjustCanvasPosition();
        this.resetPositions();
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('resize', this.adjustCanvasPosition);
        this.loop();
    }

    onUnmount()
    {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('resize', this.adjustCanvasPosition);
    }

    handleKeyDown(event)
    {
        this.setState((prevState) => ({
            keysPressed: {
                ...prevState.keysPressed,
                [event.key]: true,
            },
        }));
    };

    handleKeyUp(event)
    {
        this.setState((prevState) => ({
            keysPressed: {
                ...prevState.keysPressed,
                [event.key]: false,
            },
        }));
    };

    adjustCanvasPosition()
    {
        const canvas = this.canvas;
        const centerX = (window.innerWidth - canvas.width) / 2;
        const centerY = (window.innerHeight - canvas.height) / 2;
        canvas.style.left = `${centerX}px`;
        canvas.style.top = `${centerY}px`;

        this.setState((prevState) => ({
            playerTwo: {
                ...prevState.playerTwo,
                x: canvas.width - prevState.playerTwo.width - 10,
            },
        }));
    };

    updatePlayerPositions = () => {
        const { keysPressed, playerOne, playerTwo } = this.state;

        if (keysPressed['w'] && playerOne.y - this.PADDLE_SPEED > 0) {
        this.setState((prevState) => ({
            playerOne: {
                ...prevState.playerOne,
                y: prevState.playerOne.y - this.PADDLE_SPEED,
            },
        }));
        }

        if (keysPressed['s'] && playerOne.y + playerOne.height + this.PADDLE_SPEED < this.canvas.height) {
        this.setState((prevState) => ({
            playerOne: {
                ...prevState.playerOne,
                y: prevState.playerOne.y + this.PADDLE_SPEED,
            },
        }));
        }

        if (keysPressed['ArrowUp'] && playerTwo.y - this.PADDLE_SPEED > 0) {
        this.setState((prevState) => ({
            playerTwo: {
                ...prevState.playerTwo,
                y: prevState.playerTwo.y - this.PADDLE_SPEED,
            },
        }));
        }

        if (keysPressed['ArrowDown'] && playerTwo.y + playerTwo.height + this.PADDLE_SPEED < this.canvas.height) {
        this.setState((prevState) => ({
            playerTwo: {
            ...prevState.playerTwo,
            y: prevState.playerTwo.y + this.PADDLE_SPEED,
            },
        }));
        }
    };

    displayScores = () => {
        const { scoreOne, scoreTwo } = this.state;
        this.scoreDiv.textContent = `${scoreOne} : ${scoreTwo}`;
    };

    drawElement = (element) => {
        const { context } = this;
        context.fillStyle = element.color;
        if (element === this.state.ball) {
        context.beginPath();
        context.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
        context.fill();
        } else {
        context.fillRect(element.x, element.y, element.width, element.height);
        }
    };

    normalizeSpeed = () => {
        const { ball } = this.state;
        const angle = Math.atan2(ball.speedY, ball.speedX);
        this.setState((prevState) => ({
        ball: {
            ...prevState.ball,
            speedX: this.INITIAL_SPEED * Math.cos(angle),
            speedY: this.INITIAL_SPEED * Math.sin(angle),
        },
        }));
    };

    ballWallCollision = () => {
        const { ball } = this.state;
        const canvas = this.canvas;

        if (ball.y + ball.speedY > canvas.height - ball.radius || ball.y + ball.speedY < ball.radius) {
        this.setState((prevState) => ({
            ball: {
            ...prevState.ball,
            speedY: -prevState.ball.speedY,
            },
        }));
        this.normalizeSpeed();
        }

        if (ball.x + ball.speedX > canvas.width - ball.radius) {
        this.setState((prevState) => ({
            scoreOne: prevState.scoreOne + 1,
        }));
        this.resetBall();
        } else if (ball.x - ball.speedX < ball.radius) {
        this.setState((prevState) => ({
            scoreTwo: prevState.scoreTwo + 1,
        }));
        this.resetBall();
        }
    };

    ballPaddleCollision = (player) => {
        const { ball } = this.state;

        if (
        ball.x < player.x + player.width + ball.radius &&
        ball.x > player.x - ball.radius &&
        ball.y < player.y + player.height + ball.radius &&
        ball.y > player.y - ball.radius
        ) {
        const paddleCenter = player.y + player.height / 2;
        const hitPos = (ball.y - paddleCenter) / (player.height / 2);
        this.setState((prevState) => ({
            ball: {
            ...prevState.ball,
            speedY: hitPos * this.INITIAL_SPEED,
            },
        }));

        if (ball.speedX > 0) {
            this.setState((prevState) => ({
            ball: {
                ...prevState.ball,
                x: player.x - prevState.ball.radius,
                speedX: -prevState.ball.speedX,
            },
            }));
        } else {
            this.setState((prevState) => ({
            ball: {
                ...prevState.ball,
                x: player.x + player.width + prevState.ball.radius,
                speedX: -prevState.ball.speedX,
            },
            }));
        }

        this.normalizeSpeed();
        }
    };

    resetBall = () => {
        this.setState((prevState) => ({
        ball: {
            ...prevState.ball,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            speedX: prevState.scoreOne > prevState.scoreTwo ? this.INITIAL_SPEED : -this.INITIAL_SPEED,
            speedY: 0,
        },
        }));
        this.resetPaddles();
    };

    resetPaddles = () => {
        this.setState((prevState) => ({
        playerOne: {
            ...prevState.playerOne,
            y: (this.canvas.height - prevState.playerOne.height) / 2,
        },
        playerTwo: {
            ...prevState.playerTwo,
            y: (this.canvas.height - prevState.playerTwo.height) / 2,
        },
        }));
    };

    drawElements = () => {
        const { context } = this;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawElement(this.state.playerOne);
        this.drawElement(this.state.playerTwo);
        this.drawElement(this.state.ball);
        this.displayScores();
    };

    loop = () => {
        this.updatePlayerPositions();
        this.ballWallCollision();
        this.ballPaddleCollision(this.state.playerOne);
        this.ballPaddleCollision(this.state.playerTwo);

        this.setState((prevState) => ({
        ball: {
            ...prevState.ball,
            x: prevState.ball.x + prevState.ball.speedX,
            y: prevState.ball.y + prevState.ball.speedY,
        },
        }));

        this.drawElements();
        requestAnimationFrame(this.loop);
    };

    resetPositions = () => {
        this.setState((prevState) => ({
        playerOne: {
            ...prevState.playerOne,
            y: (this.canvas.height - prevState.playerOne.height) / 2,
        },
        playerTwo: {
            ...prevState.playerTwo,
            x: this.canvas.width - prevState.playerTwo.width - 10,
            y: (this.canvas.height - prevState.playerTwo.height) / 2,
        },
        ball: {
            ...prevState.ball,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            speedX: this.INITIAL_SPEED,
            speedY: 0,
        },
        }));
    };

    render()
    {
        return String.raw`
            <div>
                <canvas id="pongGame" width="800" height="400"></canvas>
                <div id="score"></div>
            </div>
        `;
    }
}
