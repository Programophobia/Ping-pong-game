
const canvas = document.getElementById('gameCanvas');
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);

const myElem = document.querySelector('canvas');
myElem.style='border:10px solid';

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
const PADDLE_START_X = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
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

//Assigned buttons and printed action
const PADDLE_STEP = 3;
const P1_UP_BUTTON = 'KeyQ';
const P1_DOWN_BUTTON = 'KeyA';
const P2_UP_BUTTON = 'KeyP';
const P2_DOWN_BUTTON = 'KeyL';
const UP_ACTION = "up";
const DOWN_ACTION = "down";
const STOP_ACTION = "stop";

function drawPaddle(x, y) {
  ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}
ctx.fillStyle = 'grey';


//Result
ctx.font = '30px Arial';
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
let p1PaddleX = PADDLE_START_X;
let p2PaddleX = PADDLE_START_X;
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


function updateAndDrawState() {
  if (paused) return;
  updateState();
  drawState();
}

setInterval(updateAndDrawState, STATE_CHANGE_INTERVAL);

//Movement
let p1Action = STOP_ACTION;
let p2Action = STOP_ACTION;

window.addEventListener('keydown', event => {
  let code = event.code;
  if (code === P1_UP_BUTTON) {
    p1Action = UP_ACTION;
  } else if (code === P1_DOWN_BUTTON) {
    p1Action = DOWN_ACTION;
  } else if (code === P2_UP_BUTTON) {
    p2Action = UP_ACTION;
  } else if (code === P2_DOWN_BUTTON) {
    p2Action = DOWN_ACTION;
  }
  console.log('down' + event.code);
});

window.addEventListener('keyup', function(event){

  console.log('up');
});

function movePaddles() {
  if (p1Action === UP_ACTION) {
    p1PaddleY = p1PaddleY - PADDLE_STEP;
  } else if (p1Action === DOWN_ACTION) {
    p1PaddleY = p1PaddleY + PADDLE_STEP;
  }
  if (p2Action === UP_ACTION && p2PaddleY >= 0) {
    p2PaddleY = p2PaddleY - PADDLE_STEP;
  } else if (p2Action === DOWN_ACTION) {
    p2PaddleY = p2PaddleY + PADDLE_STEP;
  }
}

window.addEventListener('keyup', function (event) {
  let code = event.code;
  if (
    (code === P1_UP_BUTTON && p1Action === UP_ACTION) ||
  (code === P1_DOWN_BUTTON && p1Action === DOWN_ACTION)
  ) {
    p1Action = STOP_ACTION;
  } else if (
    (code === P2_UP_BUTTON && p2Action === UP_ACTION) ||
  (code === P2_DOWN_BUTTON && p2Action === DOWN_ACTION)
  ) {
    p2Action = STOP_ACTION;
  }
});

//functions for paddle sensitive borders

function coerceIn(value, min, max) {
  if (value <= min) {
    return min;
  } else if(value >= max) {
    return max;
  } else {
    return value;
  }
}

function coercePaddle(paddleY) {
  const minPaddleY = 0;
  const maxPaddleY = CANVAS_HEIGHT - PADDLE_HEIGHT;
  return coerceIn(paddleY, minPaddleY, maxPaddleY);
}

function movePaddles() {
  if (p1Action === UP_ACTION) {
    p1PaddleY = coercePaddle(p1PaddleY - PADDLE_STEP);
  } else if (p1Action === DOWN_ACTION) {
    p1PaddleY = coercePaddle(p1PaddleY + PADDLE_STEP);
  }
  if (p2Action === UP_ACTION) {
    p2PaddleY = coercePaddle(p2PaddleY - PADDLE_STEP);
  } else if (p2Action === DOWN_ACTION) {
    p2PaddleY = coercePaddle(p2PaddleY + PADDLE_STEP);
  }
}

const PAUSE_BUTTON = 'Space';

let paused = false;

window.addEventListener('keydown', function (event) {
  let code = event.code;
  if (code === PAUSE_BUTTON) {
    paused = !paused;
  }
});

//Ball movement

function moveBallByStep() {
  ballX += ballDX;
  ballY += ballDY;
}
function moveBallToStart() {
  ballX = BALL_START_X;
  ballY = BALL_START_Y;
}

function ballIsOutsideOnLeft() {
  return ballX + BALL_R < 0;
}

function ballIsOutsideOnRight() {
  return ballX - BALL_R > CANVAS_WIDTH;
}

function moveBall() {
  if (ballIsOutsideOnLeft()) {
    moveBallToStart();
    p2Points++;
  } else if (ballIsOutsideOnRight()) {
    moveBallToStart();
    p1Points++;
  }
  moveBallByStep();
}

function updateState() {
  moveBall();
  movePaddles();
}