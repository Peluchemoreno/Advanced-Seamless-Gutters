let undoBtn = document.querySelector('.undo-button');
const clearButton = document.querySelector('#clear-button');
const ongoingTouches = [];
const colorPicker = document.querySelector('#color');
let color = colorPicker.style.backgroundColor;
const module = document.querySelector('.module');
const cancelBtn = document.querySelector('.cancel-button');
const setBtn = document.querySelector('.set-button')
const body = document.querySelector('body');
const colorPreview = document.querySelector('.color-preview');
const redBtn = document.querySelector('.red');
const cyanBtn = document.querySelector('.cyan');
const blueBtn = document.querySelector('.blue');
const greenBtn = document.querySelector('.green');
const pinkBtn = document.querySelector('.pink');
const yellowBtn = document.querySelector('.yellow');
const blackBtn = document.querySelector('.black');

let startX, startY;
let currentX, currentY;
const el = document.getElementById('canvas');
let ctx = el.getContext('2d');
let isDrawing = false;
let paths = [];
let newPath = [];
points = [];
let index = -1;
let indexCopy = -1;
const tool = document.querySelector('#tool-select');
const gridNumber = document.querySelector('#grid-size');
let elbowSequence;
let pieceLength;


const testing = document.querySelector('#job-notes');
colorPreview.style.border = '2px solid white';



redBtn.addEventListener('click', () => {
  colorPreview.style.backgroundColor = 'red';
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';
  colorPicker.style.backgroundColor = 'red';
  colorPreview.style.border = '2px solid black';
  console.log('red');
})

cyanBtn.addEventListener('click', () => {
  colorPreview.style.backgroundColor = 'cyan';
  ctx.strokeStyle = 'cyan';
  ctx.fillStyle = 'cyan';
  colorPicker.style.backgroundColor = 'cyan';
  colorPreview.style.border = '2px solid black';
  console.log('cyan');
})

blueBtn.addEventListener('click', () => {
  colorPreview.style.backgroundColor = 'blue';
  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'blue';
  colorPicker.style.backgroundColor = 'blue';
  colorPicker.style.color = 'white';
  colorPreview.style.border = '2px solid black';
  console.log('blue');
})

greenBtn.addEventListener('click', () => {
  colorPreview.style.backgroundColor = '#2efc05';
  ctx.strokeStyle = '#2efc05';
  ctx.fillStyle = '#2efc05';
  colorPicker.style.backgroundColor = '#2efc05';
  colorPreview.style.border = '2px solid black';
  console.log('green');
})

pinkBtn.addEventListener('click', () => {
  colorPreview.style.backgroundColor = 'magenta';
  ctx.strokeStyle = 'magenta';
  ctx.fillStyle = 'magenta';
  colorPreview.style.border = '2px solid black';
  colorPicker.style.backgroundColor = 'magenta';
  console.log('magenta');
})

yellowBtn.addEventListener('click', () => {
  colorPreview.style.backgroundColor = 'yellow';
  ctx.strokeStyle = 'yellow';
  ctx.fillStyle = 'yellow';
  colorPicker.style.backgroundColor = 'yellow';
  colorPicker.style.color = 'black';
  colorPreview.style.border = '2px solid black';
  console.log('yellow');
})

blackBtn.addEventListener('click', () => {
  colorPreview.style.backgroundColor = '#000';
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'black'
  colorPicker.style.backgroundColor = 'black';
  colorPicker.style.color = 'white';
  colorPreview.style.border = '2px solid white';
  console.log('black');
})


module.addEventListener('click', (e) => {
  if (e.target.parentElement == body) {
    module.classList.remove('visible');
  } else {
    return
  }

})

colorPicker.addEventListener('click', (e) => {
  e.preventDefault();
  module.classList.toggle('visible');
  let container = document.querySelector('.module-container');
  container.style.transform = 'translateY(0px)';
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  module.classList.toggle('visible');
})

setBtn.addEventListener('click', () => {
  module.classList.toggle('visible');
})






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
    let phoneEmailRow = document.querySelector('.customer-details-body2');
    phoneEmailRow.style.marginTop = '-16px';
    let materialSide = document.querySelector('.material-side');
    let canvasSide = document.querySelector('.canvas-side');

    // materialSide.style.height = '800px';
    // canvasSide.style.height = '800px';
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

  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  colorPicker.style.backgroundColor = 'black';
  colorPicker.style.color = 'white';

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


// function updateColor(context) {
//   // let color = document.querySelector('#color').value;
//   // if (color === 'green') {
//   //   context.strokeStyle = "#2efc05";
//   //   context.fillStyle = "#2efc05";
//   // } else {
//   //   context.strokeStyle = color;
//   //   context.fillStyle = color;
//   // }

//   ctx.strokeStyle = '#000';
//   ctx.fillStyle = '#000'
// }

function handleDraw() {
  startX = (event.pageX - el.offsetLeft);
  startY = (event.pageY - el.offsetTop);
  isDrawing = true;
  let newX = Math.round(startX / gridSize) * gridSize;
  let newY = Math.round(startY / gridSize) * gridSize;
  // updateColor(ctx);
  ctx.beginPath();
  // ctx.strokeStyle = color;
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
    // ctx.strokeStyle = color;
    ctx.moveTo(newX, newY);
    ctx.lineTo(newX + gridSize / 1.5, newY + gridSize / 1.5);
    ctx.moveTo(newX, newY);
    ctx.lineTo(newX - gridSize / 1.5, newY + gridSize / 1.5);
    ctx.moveTo(newX, newY);
    ctx.lineTo(newX - gridSize / 1.5, newY - gridSize / 1.5);
    ctx.moveTo(newX, newY);
    ctx.lineTo(newX + gridSize / 1.5, newY - gridSize / 1.5);

    updateColor(ctx);
    context.lineWidth = 2;
    context.stroke();
    // elbowSequence = prompt('Type in the elbow sequence. (eg. AABA)');

  } else if (tool.value === 'valley-shield') {
    startX = (event.pageX - el.offsetLeft);
    startY = (event.pageY - el.offsetTop);
    isDrawing = true;
    let newX = Math.round(startX / gridSize) * gridSize;
    let newY = Math.round(startY / gridSize) * gridSize;
    ctx.beginPath();
    ctx.setLineDash([]);
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
    ctx.font = '1000 12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    if (!userInput) {
      return
    } else {
      ctx.fillText(`${userInput}`, startX, startY);
      newPath.push(ctx.getImageData(0, 0, el.width, el.height));
      indexCopy += 1;
      console.log(paths.length, newPath.length);
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
  // elbowPaths.push(ctx.getImageData(0, 0, el.width, el.height));
  index += 1;
  // indexCopy += 1;
  ctx.moveTo(currentX, currentY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
  ctx.closePath();
  updateGridButton(undoBtn);
  console.log(paths.length, newPath.length);
});


el.addEventListener('touchcancel', handleCancel);


function clear() {
  const el = document.getElementById('canvas');
  ctx.clearRect(0, 0, el.width, el.height);
  paths = [];
  // elbowPaths = [];
  // indexCopy = -1;
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
    indexCopy -= 1;

    newPath.pop();
    paths.pop();
    ctx.putImageData(paths[index], 0, 0);
    // ctx.putImageData(newPath[indexCopy], 0, 0);
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

// function showLegend() {
//   legendPic = document.querySelector('.legend-pic');
//   legendPic.classList.toggle('hidden');
// };


function finish() {
  window.onbeforeprint = (event) => {
    toolsBar = document.querySelector('.tools-bar');
    toolsBar.style.display = 'none';
    legendPic = document.querySelector('.legend-pic');



  };

  window.print();

}


window.onafterprint = (event) => {
  toolsBar = document.querySelector('.tools-bar');
  toolsBar.style.display = 'flex';
  // showLegend();

}
