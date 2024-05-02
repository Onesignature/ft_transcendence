document.body.style.backgroundColor = "black";

const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

// Calculate the center position
const centerX = (window.innerWidth - canvas.width) / 2;
const centerY = (window.innerHeight - canvas.height) / 2;

// Set the canvas position
canvas.style.position = "absolute";
canvas.style.left = centerX + "px";
canvas.style.top = centerY + "px";

context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

// Set the outline color
context.strokeStyle = "yellow";
context.lineWidth = 5; // Adjust the line width as needed

// Draw a rectangle with an outline
const outlineWidth = 10; // Width of the outline
context.strokeRect(outlineWidth, outlineWidth, canvas.width - (2 * outlineWidth), canvas.height - (2 * outlineWidth));

let scoreOne = 0;
let scoreTwo = 0;