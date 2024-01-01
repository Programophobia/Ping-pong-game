
const canvas = document.getElementById("gameCanvas");
console.log(canvas);

const ctx = canvas.getContext("2d");
console.log(ctx);

// Constants
const CANVAS_HEIGHT = canvas.height; 
const CANVAS_WIDTH = canvas.width; 

const BOARD_Y = 50; // both results
const BOARD_P1_X = 300; // x player P1 points
const BOARD_P2_X = 500; // x player P2 points

const PADDLE_WIDTH = 20; 
const PADDLE_HEIGHT = 100; 
const PADDLE_P1_X = 10; // first P1 player palette x position
const PADDLE_P2_X = 770; // first P2 player palette x position
const PADDLE_START_Y = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
// first y position of both paddles

const BALL_R = 15; // ball radius
const BALL_START_X = CANVAS_WIDTH / 2;
//fist ball x position
const BALL_START_Y = CANVAS_HEIGHT / 2;
// first ball y position
const BALL_START_DX = 4.5;
// first ball speed (axis x)
const BALL_START_DY = 1.5;
// first ball speed (axis y)
const STATE_CHANGE_INTERVAL = 20;

//Palette
canvas.classList.add("palette");

function drawPaddle(x, y) {
  ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}
ctx.fillStyle = "grey"


//Result
ctx.font = "30px Arial";
ctx.fillStyle = "Brown"

function drawPoints(text, x){
  ctx.fillText(text, x, BOARD_Y);
}


//Ball
function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();
}
ctx.fillStyle = "green"
function drawBall(x, y) {
  drawCircle(x, y, BALL_R);
}

//Clear canvas
function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// State
let ballX = BALL_START_X;
let ballY = BALL_START_Y;
let ballDX = BALL_START_DX;
let ballDY = BALL_START_DY;
let p1PaddleY = PADDLE_START_Y;
let p2PaddleY = PADDLE_START_Y;
let p1Points = 0;
let p2Points = 0;


function drawState() {
  clearCanvas();
  drawPoints(p1Points.toString(), BOARD_P1_X);
  drawPoints(p2Points.toString(), BOARD_P2_X);
  drawBall(ballX, ballY);
  drawPaddle(PADDLE_P1_X, p1PaddleY);
  drawPaddle(PADDLE_P2_X, p2PaddleY);
}

function updateState() {
  ballX = ballX + ballDX;
  ballY = ballY + ballDY;

}

function updateAndDrawState() {
  updateState();
  drawState();
}

setInterval(updateAndDrawState, STATE_CHANGE_INTERVAL);