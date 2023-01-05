const canvas = document.querySelector("#canvas");
let c = canvas.getContext("2d");
let color = "black";
let drawWidth = "3";
let isDrawing = false;
canvas.width = 500;
canvas.height = 300;
console.log("createdRepo");

function start(e) {
  e.preventDefault();
  console.log(e);
  let x = e.offsetX;
  let y = e.offsetY;
  isDrawing = true;
  c.beginPath();
  c.moveTo(x, y);
  console.log(x, y);
  // c.stroke();
}

function draw(e) {
  e.preventDefault();
  let x = e.offsetX;
  let y = e.offsetY;
  if (isDrawing) {
    c.lineTo(x, y);
    c.strokeStyle = color;
    c.lineWidth = drawWidth;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.stroke();
  }
}

function end(e) {
  e.preventDefault();
  isDrawing = false;
}

function clearCanvas() {
  c.fillStyle = "white";
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillRect(0, 0, canvas.width, canvas.height);
  console.log("clearing");
}

canvas.addEventListener("pointerdown", start, false);
canvas.addEventListener("pointermove", draw, false);
canvas.addEventListener("pointerup", end, false);
canvas.addEventListener("pointercancel", cancel, false);
