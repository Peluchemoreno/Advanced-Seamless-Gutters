const ongoingTouches = [];
const colorPicker = document.querySelector('#color');
let color = colorPicker.value;
let startX, startY;
let currentX, currentY;
const el = document.getElementById('canvas');
let ctx = el.getContext('2d');
let isDrawing = false;
paths = [];
points = [];
let index = -1;

const testing = document.querySelector('#job-notes');


function startup() {
  let context = el.getContext('2d');
  el.width = 500;
  el.height = 450;
  gridSize = 20;
  //===============draw grid=====================
  for (x = 0; x < el.width; x += gridSize) {
    context.moveTo(x, 0);
    context.lineTo(x, el.height);
    context.strokeStyle = 'lightgray';
    context.stroke();
  }

  for (y = 0; y < el.height; y += gridSize) {
    context.moveTo(0, y);
    context.lineTo(el.width, y);
    context.stroke();
  }
}

document.addEventListener("DOMContentLoaded", startup);

document.body.addEventListener("pointerdown", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, { passive: false });
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, { passive: false });
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, { passive: false });


function updateColor(context) {
  let color = document.querySelector('#color').value;
  context.strokeStyle = color;
  context.fillStyle = color;
}

el.addEventListener('pointerdown', function (event) {
  event.preventDefault();
  startX = (event.pageX - el.offsetLeft);
  startY = (event.pageY - el.offsetTop);
  isDrawing = true;
  let newX = Math.round(startX / gridSize) * gridSize;
  let newY = Math.round(startY / gridSize) * gridSize;
  // points.push({ x: newX, y: newY });
  // console.log(points);
  ctx.beginPath();
  updateColor(ctx);
  ctx.moveTo(newX, newY);
});


el.addEventListener('pointerup', function (event) {
  event.preventDefault();
  isDrawing = false;
  const ctx = el.getContext('2d');
  paths.push(ctx.getImageData(0, 0, el.width, el.height));
  index += 1;
  console.log(paths);
  // console.log(points);
  ctx.moveTo(currentX, currentY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
  ctx.closePath();
});


el.addEventListener('touchcancel', handleCancel);

el.addEventListener('pointermove', function (event) {
  context = el.getContext('2d');
  if (isDrawing) {
    // console.log(currentX, currentY);
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;
    context.lineTo(newX, newY);
    context.lineWidth = 4;
    context.stroke();
  }

});




function clear() {
  const el = document.getElementById('canvas');
  ctx.clearRect(0, 0, el.width, el.height);
  paths = [];
  index = -1;
  startup();

}


const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clear);

function handleCancel(evt) {
  evt.preventDefault();
  log('touchcancel.');
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1);  // remove it; we're done
  }
}

function colorForTouch() {
  const colorPicker = document.querySelector('#color');
  let color = colorPicker.value;
  return color;
}

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}


function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    const id = ongoingTouches[i].identifier;

    if (id === idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

function undo() {

  if (index <= 0) {
    clear();
  } else {
    index -= 1;
    paths.pop();
    ctx.putImageData(paths[index], 0, 0);
  }
}
