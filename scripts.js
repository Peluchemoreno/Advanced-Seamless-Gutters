const clearButton = document.querySelector('#clear-button');
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
const tool = document.querySelector('#tool-select');
const gridNumber = document.querySelector('#grid-size');


const testing = document.querySelector('#job-notes');

function updateGridSize(number) {
  let gridNumber = document.querySelector('#grid-size');
  gridNumber.value = number;
  return number;
}

function startup() {
  let context = el.getContext('2d');
  let gridNumber = document.querySelector('#grid-size');
  el.width = 500;
  el.height = 450;
  gridSize = updateGridSize(parseInt(gridNumber.value));

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

  if (tool.value === 'gutter') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    // points.push({ x: newX, y: newY });
    // console.log(points);
    ctx.beginPath();
    ctx.setLineDash([]);
    updateColor(ctx);
    ctx.moveTo(newX, newY);
  } else if (tool.value === 'existing-gutter') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    // points.push({ x: newX, y: newY });
    // console.log(points);
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    updateColor(ctx);
    ctx.moveTo(newX, newY);
  } else if (tool.value === 'gutter-w-screen') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    // points.push({ x: newX, y: newY });
    // console.log(points);
    ctx.beginPath();
    ctx.setLineDash([]);
    updateColor(ctx);
    ctx.moveTo(newX, newY);
  } else if (tool.value === 'drop') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    // points.push({ x: newX, y: newY });
    // console.log(points);
    ctx.beginPath();
    ctx.setLineDash([]);
    updateColor(ctx);
    ctx.moveTo(newX, newY);
  } else if (tool.value === 'downspout') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    // points.push({ x: newX, y: newY });
    // console.log(points);
    ctx.beginPath();
    ctx.setLineDash([]);
    updateColor(ctx);
    ctx.moveTo(newX, newY);
  } else if (tool.value === 'flashing') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    // points.push({ x: newX, y: newY });
    // console.log(points);
    ctx.beginPath();
    ctx.setLineDash([]);
    updateColor(ctx);
    ctx.moveTo(newX, newY);
  } else if (tool.value === 'fascia-repair') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    // points.push({ x: newX, y: newY });
    // console.log(points);
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.moveTo(newX, newY);
  }

});




el.addEventListener('pointermove', function (event) {
  context = el.getContext('2d');
  if (isDrawing && tool.value === 'gutter') {
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;
    context.setLineDash([]);
    context.lineTo(newX, newY);
    context.lineWidth = 2;
    context.stroke();
  } else if (isDrawing && tool.value === 'gutter-w-screen') {
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;
    context.setLineDash([40, 5, 5, 5, 5, 5, 5, 5]);
    context.lineTo(newX, newY);
    context.lineWidth = 2;
    context.stroke();

  } else if (isDrawing && tool.value === 'existing-gutter') {
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;
    context.setLineDash([2, 2]);
    context.lineTo(newX, newY);
    context.lineWidth = 2;
    context.stroke();

  } else if (isDrawing && tool.value === 'drop') {
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * (gridSize);
    let newY = Math.round(currentY / gridSize) * (gridSize);
    context.setLineDash([]);
    context.beginPath();
    context.arc(newX, newY, gridSize / 4, 0, 2 * Math.PI);
    // context.lineTo(newX, newY);
    context.lineWidth = 1;
    context.stroke();
  } else if (isDrawing && tool.value === 'downspout') {
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * (gridSize);
    let newY = Math.round(currentY / gridSize) * (gridSize);
    context.setLineDash([]);
    context.beginPath();
    context.arc(newX, newY, gridSize / 2, 0, 2 * Math.PI);
    context.fillStyle = updateColor(ctx);
    context.lineWidth = 1;
    context.fill();
  } else if (isDrawing && tool.value === 'flashing') {
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;
    context.setLineDash([]);
    context.lineTo(newX + 4, newY - 4);
    context.moveTo(newX + 4, newY - 4);

    context.lineWidth = 2;
    context.stroke();
  } else if (isDrawing && tool.value === 'fascia-repair') {
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;
    context.setLineDash([]);
    context.lineTo(newX, newY);
    context.moveTo(newX - 5, newY + 5);

    context.lineWidth = 2;
    context.stroke();
  }

});

el.addEventListener('pointerup', function (event) {
  event.preventDefault();
  isDrawing = false;
  const ctx = el.getContext('2d');
  paths.push(ctx.getImageData(0, 0, el.width, el.height));
  index += 1;
  ctx.moveTo(currentX, currentY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
  ctx.closePath();
});


el.addEventListener('touchcancel', handleCancel);


function clear() {
  const el = document.getElementById('canvas');
  ctx.clearRect(0, 0, el.width, el.height);
  paths = [];
  index = -1;
  startup();

}


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


//====================================================


// console.log(typeof parseInt(gridNumber.value));
