const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

let scoreOne = 0;
let scoreTwo = 0;

//key movement
window.addEventListener("keypress", doKeyDown, false);

function doKeyDown(e)
{
    const key = e.key;
    if (key == "w" && playerOne.y-playerOne.gravity > 0)
        playerOne.y -= playerOne.gravity *4;
    else if (key == "s" && playerOne.y+playerOne.gravity < canvas.height)
        playerOne.y += playerOne.gravity * 4;

    if (key == "i" && playerTwo.y-playerTwo.gravity > 0)
        playerTwo.y -= playerTwo.gravity *4;
    else if (key == "k" && playerTwo.y+playerTwo.gravity < canvas.height)
        playerTwo.y += playerTwo.gravity * 4;
}

class Element{
    constructor(options){
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.speed = options.speed || 2;
        this.gravity = options.gravity;
    }
}


//paddle1
const playerOne = new Element
(
    {
        x: 10,
        y: 200,
        width: 15,
        height: 80,
        color: '#ffd335',
        gravity: 2,
    }
);

//paddle2
const playerTwo = new Element
(
    {
        x: 625,
        y: 200,
        width: 15,
        height: 80,
        color: '#ffd335',
        gravity: 2,
    }
);

//ball
const ball = new Element
(
    {
        x: 650 / 2,
        y: 400 / 2,
        width: 15,
        height: 15,
        color: '#fff',
        speed: 1,
        gravity: 1,
    }
);

//player one text
function displayScoreOne()
{
    context.font = "18px Arial"
    context.fillStyle = "#ffd335"
    context.fillText(scoreOne, canvas.width / 2 - 60, 30);
}

//player two text
function displayScoreTwo()
{
    context.font = "18px Arial"
    context.fillStyle = "#ffd335"
    context.fillText(scoreOne, canvas.width / 2 + 60, 30);
}

//draw elements
function drawElement(element)
{
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height);
}

// drawElement(playerOne);

//make Ball bounce
function ballBounce()
{
    if (ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height)
    {
        ball.gravity = ball.gravity * -1;
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
    else
    {
        ball.y += ball.gravity;
        ball.x += ball.speed;
    }
ballWallCollision();
}

//detect collision
function ballWallCollision()
{
    // if (ball.x + ball.speed <= 0 || ball.x + ball.speed + ball.width >= canvas.width)
    // {
    //     ball.y += ball.gravity;
    //     ball.speed  = ball.speed * -1;
    //     ball.x += ball.speed;
    // }
    // else
    // {
    //     ball.y += ball.gravity;
    //     ball.x += ball.speed;
    // }

    if (ball.y + ball.gravity <= playerTwo.y + playerTwo.height &&
        ball.x + ball.width + ball.speed >= playerTwo.x &&
        ball.y + ball.gravity > playerTwo.y ||
        ball.y + ball.gravity <= playerOne.y + playerOne.height &&
        ball.x + ball.width + ball.speed >= playerOne.x &&
        ball.y + ball.gravity > playerOne.y)
        {
            ball.speed = ball.speed * -1;
        }
    else if (ball.x + ball.speed < playerOne.x)
    {
        scoreTwo += 1;
        ball.speed = ball.speed * -1;
        ball.x = 100 + ball.speed;
        ball.y += ball.gravity;
    }
    else if (ball.x + ball.speed > playerTwo.x + playerTwo.width)
    {
        scoreOne += 1;
        ball.speed = ball.speed * -1;
        ball.x = 100 + ball.speed;
        ball.y += ball.gravity;
    }

    drawElements();
}

//drawelements
function drawElements()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    displayScoreOne();
    displayScoreTwo();
}

function loop()
{
    ballBounce();
    window.requestAnimationFrame(loop)
}
loop();