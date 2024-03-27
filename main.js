const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

let scoreOne = 0;
let scoreTwo = 0;

//key movment
window.addEventListener("keypress", doKeyDown, false);

function doKeyDown(e)
{
    const key = e.key;
    if (key == "w" && playerOne.y-playerOne.gravity > 0)
    {
        playerOne.y -= playerOne.gravity * 4;
    }
    else if (key == 's' && playerOne.y + playerOne.height + playerOne.gravity < canvas.height)
        playerOne.y += playerOne.gravity * 4;
    //player2
    if (key == "i" && playerTwo.y-playerTwo.gravity > 0)
    {
        playerTwo.y -= playerTwo.gravity * 4;
    }
    else if (key == 'k' && playerTwo.y + playerTwo.height + playerTwo.gravity < canvas.height)
        playerTwo.y += playerTwo.gravity * 4;
}


class Element
{
    constructor(options)
    {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.speed = options.speed || 2;
        this.gravity = options.gravity;
    }
}

const playerOne = new Element({
    x: 10,
    y: 200,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2,
});

const playerTwo = new Element({
    x: 625,
    y: 200,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2,
});

const ball = new Element({
    x: 620/2,
    y: 400/2,
    width: 15,
    height: 15,
    color: "#20C20E",
    gravity: 1,
    speed: 1,
});

//second paddle

//ball

//draw elements
function drawElement(element){
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height);
}

function displayScoreOne()
{
    context.font = "18px Arial"
    context.fillStyle = '#fff'
    context.fillText(scoreOne, canvas.width/2 - 60, 30)
}

function displayScoreTwo()
{
    context.font = "18px Arial"
    context.fillStyle = '#fff'
    context.fillText(scoreOne, canvas.width/2 + 60, 30)
}

function ballBounce()
{
    if (ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height){
        ball.gravity = ball.gravity * -1;
        ball.y += ball.gravity;
        ball.x += ball.speed;
    } else {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
    ballWallCollision();
}

function ballWallCollision()
{
    if (ball.x + ball.speed <= 0 || ball.x+ball.speed + ball.width >= canvas.width){
        ball.y += ball.gravity;
        ball.speed = ball.speed * -1;
        ball.x += ball.speed;
    } else {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
}

function drawElements()
{
    context.clearRect(0,0,canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    displayScoreOne();
    displayScoreTwo();
}

function loop()
{
    ballBounce();
    drawElements();
    window.requestAnimationFrame(loop)
}

loop();