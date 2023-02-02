let undoBtn = document.querySelector('.undo-button');
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
let elbowSequence;
let pieceLength;


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
  el.height = 500;
  gridSize = updateGridSize(parseInt(gridNumber.value));

  if (window.chrome) {
    console.log('this is chrome');
    let phoneEmailRow = document.querySelector('.customer-details-body2');
    phoneEmailRow.style.marginTop = '-16px';
  }

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

  updateGridButton(undoBtn);
}

document.addEventListener("DOMContentLoaded", startup);

document.body.addEventListener("pointerdown", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
    updateGridButton(undoBtn);
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

function handleDraw() {
  startX = (event.pageX - el.offsetLeft);
  startY = (event.pageY - el.offsetTop);
  isDrawing = true;
  let newX = Math.round(startX / gridSize) * gridSize;
  let newY = Math.round(startY / gridSize) * gridSize;
  ctx.beginPath();
  updateColor(ctx);
  ctx.moveTo(newX, newY);
}

el.addEventListener('pointerdown', function (event) {
  event.preventDefault();

  if (tool.value === 'gutter') {
    handleDraw();
  } else if (tool.value === 'existing-gutter') {
    handleDraw();
  } else if (tool.value === 'gutter-w-screen') {
    handleDraw();
  } else if (tool.value === 'drop') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    ctx.beginPath();
    ctx.setLineDash([]);
    updateColor(ctx);
    context.arc(newX, newY, gridSize / 4, 0, 2 * Math.PI);
    context.lineWidth = 1;
    context.stroke();
  } else if (tool.value === 'downspout') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    ctx.beginPath();
    ctx.setLineDash([]);
    updateColor(ctx);
    ctx.moveTo(newX, newY);
    ctx.lineTo(newX + gridSize / 3, newY + gridSize / 3);
    ctx.moveTo(newX, newY);
    ctx.lineTo(newX - gridSize / 3, newY + gridSize / 3);
    ctx.moveTo(newX, newY);
    ctx.lineTo(newX - gridSize / 3, newY - gridSize / 3);
    ctx.moveTo(newX, newY);
    ctx.lineTo(newX + gridSize / 3, newY - gridSize / 3);

    updateColor(ctx);
    context.lineWidth = 1;
    context.stroke();
    // elbowSequence = prompt('Type in the elbow sequence. (eg. AABA)');
    console.log(elbowSequence);
  } else if (tool.value === 'valley-shield') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    ctx.beginPath();
    // ctx.setLineDash([]);
    updateColor(ctx);
    ctx.moveTo(newX, newY);
    context.arc(newX, newY, gridSize / 4, 0, 2 * Math.PI);
    context.fill();

  } else if (tool.value === 'flashing') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
    ctx.moveTo(newX, newY);
  } else if (tool.value === 'fascia-repair') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.moveTo(newX, newY);
  } else if (tool.value === 'free-text') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    let userInput = prompt('Type in the elbow sequence or the length of the piece. (ex: AABA, 57")');
    ctx.font = '8px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    if (!userInput) {
      return
    } else {
      ctx.fillText(`${userInput}`, startX, startY);
    }
  }

});




el.addEventListener('pointermove', function (event) {
  context = el.getContext('2d');
  if (isDrawing && tool.value === 'gutter') {
    context.globalCompositeOperation = 'source-over';
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
    // context.setLineDash([40, 5, 5, 5, 5, 5, 5, 5]);
    context.lineTo(newX, newY);
    context.lineWidth = gridSize / 2.5;
    // context.moveTo(newX, newY);
    // context.lineTo(newX, newY);
    context.stroke();
    context.lineWidth = 1;
    // context.strokeStyle = 'red';
    // context.fillStyle = 'red';
    context.globalCompositeOperation = 'xor';

    context.stroke();

  } else if (isDrawing && tool.value === 'existing-gutter') {
    context.globalCompositeOperation = 'source-over';
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;
    context.setLineDash([2, 2]);
    context.lineTo(newX, newY);
    context.lineWidth = 2;
    context.stroke();

  } else if (isDrawing && tool.value === 'flashing') {
    context.globalCompositeOperation = 'source-over';
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;
    context.setLineDash([]);
    context.lineTo(newX, newY);
    context.moveTo(newX + 4, newY - 4);

    context.lineWidth = 2;
    context.stroke();
  } else if (isDrawing && tool.value === 'fascia-repair') {
    context.globalCompositeOperation = 'source-over';
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
  updateGridButton(undoBtn);
});


el.addEventListener('touchcancel', handleCancel);


function clear() {
  const el = document.getElementById('canvas');
  ctx.clearRect(0, 0, el.width, el.height);
  paths = [];
  index = -1;
  updateGridButton(undoBtn);
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

function updateGridButton(element) {
  if (paths.length > 0) {
    element.innerText = 'Undo';
    element.style.backgroundColor = 'silver';
  } else {
    element.style.backgroundColor = '#d9f170';
    element.innerText = 'Update Grid';
  }
};

function showLegend() {
  legendPic = document.querySelector('.legend-pic');
  legendPic.classList.toggle('hidden');
};


function finish() {

  window.onbeforeprint = (event) => {
    toolsBar = document.querySelector('.tools-bar');
    toolsBar.style.display = 'none';
    legendPic = document.querySelector('.legend-pic');
    legendPic.classList.remove('hidden');


  };

  window.print();

}


window.onafterprint = (event) => {
  toolsBar = document.querySelector('.tools-bar');
  toolsBar.style.display = 'flex';
  showLegend();

}
