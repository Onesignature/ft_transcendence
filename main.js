const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

let scoreOne = 0;
let scoreTwo = 0;

class Element
{
    constructor(options)
    {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.speed = options.x || 2;
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

function drawElements()
{
    context.clearRect(0,0,canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
}

function loop(){
    drawElements();
    window.requestAnimationFrame(loop)
}

loop();