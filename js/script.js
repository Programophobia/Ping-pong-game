//Palette
const canvas = document.getElementById("gameCanvas");
console.log(canvas);

const ctx = canvas.getContext("2d");
console.log(ctx);

canvas.classList.add("palette");

function drawPaddle(x, y) {
  ctx.fillRect(x, y, 20, 100);
}

drawPaddle(770, 100);
drawPaddle(10, 300);

//Result
ctx.font = "30px Arial";
ctx.fillStyle = "Brown"

function drawText(text, x, y){
  ctx.fillText(text, x, y);
}

drawText("3", 300, 50);
drawText("6", 500, 50);

//Ball
function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();
}

drawCircle(300, 300, 10);

//Clear canvas
function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}