import { Component, createRef } from '../../modules/onion/index.js';

export default class PongGameBoard3D extends Component 
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

        this.trail = [];
        this.explosions = [];
        this.shakeDuration = 0;
        this.freezeBall = true;
        this.startDelayTime = 800;
    }

    onMount() 
    {
        this.running = !this.props.pause;
        this.canvas = this.canvasRef.current;

        // Remove any margin or padding from the canvas element
        this.canvas.style.margin = '0';
        this.canvas.style.padding = '0';
        this.canvas.style.display = 'block';

        this.initialize3DScene();
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

    initialize3DScene() 
    {
        // Set up the scene, camera, and renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, this.canvas.width / this.canvas.height, 1, 1000);
        this.camera.position.set(0, 0, 700); // Move the camera back to fit everything in view

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(this.canvas.width, this.canvas.height);

        // Set the background color outside the border to #0E0E0E
        this.renderer.setClearColor(0x0E0E0E, 1);

        // Ambient light to give uniform lighting to objects
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Directional light to add some shadows and highlight the objects
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 0, 500);
        this.scene.add(directionalLight);

        // Create paddles and ball as 3D objects
        this.createPaddles();
        this.createBall();
        this.createBorders(); // Adding borders to the canvas
        this.createMidLine(); // Adding mid-line to the canvas
    }

    createPaddles() 
    {
        const paddleGeometry = new THREE.BoxGeometry(15, 100, 15);
        const paddleMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD335 }); // Change to the desired color

        this.playerOne = new THREE.Mesh(paddleGeometry, paddleMaterial);
        this.playerTwo = new THREE.Mesh(paddleGeometry, paddleMaterial);

        // Move paddles closer to the edges
        this.playerOne.position.set(-430, 0, 0); // Closer to the left edge
        this.playerTwo.position.set(430, 0, 0);  // Closer to the right edge

        this.scene.add(this.playerOne);
        this.scene.add(this.playerTwo);
    }

    createBall() 
    {
        const ballGeometry = new THREE.SphereGeometry(8, 32, 32);
        const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

        this.ball = new THREE.Mesh(ballGeometry, ballMaterial);
        this.ball.position.set(0, 0, 0);
        this.scene.add(this.ball);
    }

    createBorders() 
    {
        // Create a border around the canvas as a wireframe, considering the full canvas size (no padding)
        const borderGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(900, 600)); // Full size of canvas
        const borderMaterial = new THREE.LineBasicMaterial({ color: 0xFFD335 }); // Same color as paddles

        const borderMesh = new THREE.LineSegments(borderGeometry, borderMaterial);
        borderMesh.position.set(0, 0, 0); // Center the border to match the canvas exactly
        this.scene.add(borderMesh);
    }

    createMidLine() 
    {
        // Create a mid-line in the center
        const midLineGeometry = new THREE.PlaneGeometry(1, 600); // Full height for mid-line
        const midLineMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD335 });

        const midLineMesh = new THREE.Mesh(midLineGeometry, midLineMaterial);
        midLineMesh.position.set(0, 0, 1); // Position at the center, z slightly forward for visibility
        this.scene.add(midLineMesh);
    }

    initializeGame() 
    {
        this.scoreOne = this.props.scoreOne;
        this.scoreTwo = this.props.scoreTwo;

        this.INITIAL_SPEED = 8;
        this.BALL_SPEED_INCREMENT = 0.5;
        this.ballSpeed = this.INITIAL_SPEED;

        this.ballDirection = new THREE.Vector3(
            this.getRandomDirection() * this.ballSpeed,
            this.getRandomDirection() * (Math.random() * 2 - 1) * this.ballSpeed,
            0
        );

        this.lastUpdateTime = Date.now();
        this.updateInterval = 1000;
        this.lastBall = this.getCurrentBall();

        this.adjustPaddlePositions();
        this.startDelay();
        this.loop();
    }

    startDelay() 
    {
        setTimeout(() => {
            this.freezeBall = false;
        }, this.startDelayTime);
    }

    getRandomDirection() 
    {
        return Math.random() < 0.5 ? -1 : 1;
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
        // Adjust player positions based on canvas size
        this.playerTwo.position.x = 430;
    }

    updatePlayer(upKey, downKey, player) 
    {
        const paddleSpeed = 10;
        if (this.keysPressed[upKey] && player.position.y + 50 < 290) // Adjusted for padding
        {
            player.position.y += paddleSpeed;
        }
        if (this.keysPressed[downKey] && player.position.y - 50 > -290) // Adjusted for padding
        {
            player.position.y -= paddleSpeed;
        }
    }

    updatePlayerPositions() 
    {
        this.updatePlayer("w", "s", this.playerOne);

        if (this.props.isAIEnabled) 
        {
            if (!this.freezeBall) this.updateAIPlayer(this.playerTwo);
        } 
        else 
        {
            this.updatePlayer("ArrowUp", "ArrowDown", this.playerTwo);
        }
    }

    getCurrentBall()
    {
        return {
            x: this.ball.position.x,
            y: this.ball.position.y,
            speedX: this.ballDirection.x,
            speedY: this.ballDirection.y
        };
    }

    calculateInterceptY(ballPosition, ballSpeedX, ballSpeedY) 
    {
        const paddleX = this.playerTwo.position.x;
        const distanceToPaddle = paddleX - ballPosition.x;
        let timeToIntercept = distanceToPaddle / ballSpeedX;
    
        // Start at the ball's current position and simulate its path, including wall bounces
        let predictedY = ballPosition.y;
        let remainingTime = timeToIntercept;
    
        // Simulate the ball's Y position, accounting for wall bounces
        while (remainingTime > 0) 
        {
            // Time until the ball hits the top or bottom wall
            let timeToWall;
            if (ballSpeedY > 0) 
            {
                // Ball is moving downwards
                timeToWall = (290 - predictedY) / ballSpeedY;
            } 
            else 
            {
                // Ball is moving upwards
                timeToWall = (-290 - predictedY) / ballSpeedY;
            }
    
            if (timeToWall > remainingTime) 
            {
                // The ball will not hit a wall before reaching the AI paddle
                predictedY += ballSpeedY * remainingTime;
                remainingTime = 0; // End simulation
            } 
            else 
            {
                // The ball will hit a wall, reflect, and we continue predicting
                predictedY += ballSpeedY * timeToWall;
                ballSpeedY = -ballSpeedY; // Reflect the Y direction
                remainingTime -= timeToWall; // Subtract the time it took to hit the wall
            }
        }
    
        // Ensure the predicted Y is within the canvas boundaries
        predictedY = Math.max(-290, Math.min(predictedY, 290));
    
        return predictedY;
    }
    
    updateAIPlayer(player) 
    {
        const currentTime = Date.now();
        
        // Update the ball position every second
        if (currentTime - this.lastUpdateTime >= this.updateInterval)
        {
            this.lastUpdateTime = currentTime;
            this.lastBall = this.getCurrentBall(); // Update the last known ball position
        }

        // Use the last known ball speed and position to calculate the intercept
        const ballSpeedX = this.lastBall.speedX;
        const ballSpeedY = this.lastBall.speedY;
        const ballPosition = { x: this.lastBall.x, y: this.lastBall.y };

        // Calculate predicted intercept Y position, including wall bounces
        const targetY = this.calculateInterceptY(ballPosition, ballSpeedX, ballSpeedY) - (player.geometry.parameters.height / 2);

        // AI Paddle speed is the same as player's paddle speed
        const paddleSpeed = 10;

        // Threshold for movement (if the difference between current Y and target Y is more than 5 units)
        const movementThreshold = 5;

        // Ensure the paddle stays within the canvas limits
        const paddleHalfHeight = player.geometry.parameters.height / 2;
        const upperLimit = 290 - paddleHalfHeight;
        const lowerLimit = -290 + paddleHalfHeight;

        // Move the paddle only if the difference between current Y and target Y exceeds the threshold
        if (player.position.y > targetY + movementThreshold && player.position.y - paddleSpeed > lowerLimit) 
        {
            player.position.y -= paddleSpeed;
        } 
        else if (player.position.y < targetY - movementThreshold && player.position.y + paddleSpeed < upperLimit) 
        {
            player.position.y += paddleSpeed;
        }

        // Ensure paddle doesn't go beyond the boundary (hard limit)
        if (player.position.y - paddleHalfHeight < -290) 
        {
            player.position.y = -290 + paddleHalfHeight;
        }
        if (player.position.y + paddleHalfHeight > 290) 
        {
            player.position.y = 290 - paddleHalfHeight;
        }
    }

    ballWallCollision() 
    {
        // Adjust for vertical wall collisions (top and bottom)
        if (this.ball.position.y + this.ballDirection.y > 290 || this.ball.position.y + this.ballDirection.y < -290) 
        {
            this.ballDirection.y = -this.ballDirection.y;
        }

        // Adjust for horizontal wall collisions (left and right)
        if (this.ball.position.x + this.ballDirection.x > 450) // Right wall (half of 900)
        {
            this.scoreOne += 1;
            this.displayScores();
            this.resetBall();
        } 
        else if (this.ball.position.x + this.ballDirection.x < -450) // Left wall (half of 900)
        {
            this.scoreTwo += 1;
            this.displayScores();
            this.resetBall();
        }
    }

    ballPaddleCollision(player) 
    {
        const nextBallX = this.ball.position.x + this.ballDirection.x;
        const nextBallY = this.ball.position.y + this.ballDirection.y;

        if (
            nextBallX < player.position.x + 15 &&
            nextBallX > player.position.x - 15 &&
            nextBallY < player.position.y + 50 &&
            nextBallY > player.position.y - 50
        ) 
        {
            // Calculate relative hit position on the paddle (from -1 to 1)
            const relativeIntersectY = (player.position.y - this.ball.position.y) / (player.geometry.parameters.height / 2);

            // Modify the ball's direction based on where it hit the paddle (reversed)
            this.ballDirection.x = -this.ballDirection.x; // Reverse the x-direction
            this.ballDirection.y = -relativeIntersectY * this.ballSpeed; // Reversed y-direction based on the hit position

            // Increase ball speed slightly
            this.ballSpeed += this.BALL_SPEED_INCREMENT;
        }
    }

    resetBall() 
    {
        this.ballSpeed = this.INITIAL_SPEED;
        this.ball.position.set(0, 0, 0);
        this.ballDirection.set(
            this.getRandomDirection() * this.ballSpeed,
            this.getRandomDirection() * (Math.random() * 2 - 1) * this.ballSpeed,
            0
        );
    }

    updateBallPosition() 
    {
        this.ball.position.add(this.ballDirection);
        this.ballWallCollision();
        this.ballPaddleCollision(this.playerOne);
        this.ballPaddleCollision(this.playerTwo);
    }

    displayScores() 
    {
        this.props.onClickUpdateScore(this.scoreOne, this.scoreTwo);
    }

    loop() 
    {
        if (!this.running) return;

        this.updatePlayerPositions();
        if (!this.freezeBall) 
        {
            this.updateBallPosition();
        }

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.loop);
    }

    render() 
    {
        return String.raw`
            <link rel="stylesheet" href="/styles/PongGameBoard3D.css">
            <canvas id="pongGame3D" ref="canvasRef" width="900" height="600"></canvas>
        `;
    }
}
