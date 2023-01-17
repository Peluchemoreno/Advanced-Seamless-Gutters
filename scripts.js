const ongoingTouches = [];
const colorPicker = document.querySelector('#color');
let color = colorPicker.value;
let startX, startY;
let currentX, currentY;
const el = document.getElementById('canvas');
let ctx = el.getContext('2d');
ctx.strokeStyle = color;
ctx.fillStyle = color;
let isDrawing = false;

const testing = document.querySelector('#job-notes');


function startup() {
  let context = el.getContext('2d');
  el.width = 500;
  el.height = 450;
  gridSize = 40;
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

ctx.strokeStyle = color;

el.addEventListener('pointerdown', function (event) {
  startX = (event.pageX - el.offsetLeft);
  startY = (event.pageY - el.offsetTop);
  isDrawing = true;
  console.log(startX, startY);
  let newX = Math.round(startX / gridSize) * gridSize;
  let newY = Math.round(startY / gridSize) * gridSize;
  // console.log(newX, newY);
  ctx.beginPath();
  ctx.moveTo(newX, newY);
  ctx.strokeStyle = color;
  // ctx.fillRect(newX, newY, 5, 5);
  // ctx.stroke();
  // console.log(ctx);

});


el.addEventListener('pointerup', function (event) {
  event.preventDefault();
  isDrawing = false;
  const ctx = el.getContext('2d');
  // let currentX, currentY, startX, startY;

  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  let snapX = Math.round(currentX / gridSize) * gridSize;
  let snapY = Math.round(currentY / gridSize) * gridSize;
  // ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  ctx.lineTo(currentX, currentY);
  // ctx.fillRect(snapX, snapY, 5, 5);
  // console.log(currentX, currentY);
  ctx.stroke();
  // console.log("not drawing");

});


el.addEventListener('touchcancel', handleCancel);
// el.addEventListener('pointermove', function (event) {
//   if (isDrawing) {
//     // console.log(event);
//     currentX = event.clientX - el.offsetLeft;
//     currentY = event.clientY - el.offsetTop;
//     console.log(currentX, currentY);
//     // console.log('hi');
//   }
// });

el.addEventListener('pointermove', function (event) {
  context = el.getContext('2d');
  if (isDrawing) {
    // console.log(event);
    currentX = (event.pageX - el.offsetLeft);
    currentY = (event.pageY - el.offsetTop);
    // console.log(currentX, currentY);
    // context.moveTo(currentX, currentY);
    let newX = Math.round(currentX / gridSize) * gridSize;
    let newY = Math.round(currentY / gridSize) * gridSize;

    context.strokeStyle = color;
    context.lineTo(newX, newY);
    context.lineWidth = 2;
    context.stroke();
    // console.log('moving');

    // const touches = event.changedTouches;

    // for (let i = 0; i < touches.length; i++) {
    //   const color = colorForTouch(touches[i]);
    //   const idx = ongoingTouchIndexById(touches[i].identifier);

    //   if (idx >= 0) {
    //     ctx.beginPath();
    //     ctx.moveTo(ongoingTouches[idx].pageX - el.offsetLeft, ongoingTouches[idx].pageY - el.offsetTop);
    //     ctx.lineTo(touches[i].pageX - el.offsetLeft, touches[i].pageY - el.offsetTop);
    //     ctx.lineWidth = 2;
    //     ctx.strokeStyle = color;
    //     ctx.stroke();

    //     ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
    //   } else {
    //     log('can\'t figure out which touch to continue');
    //   }
    // }
    // console.log('hi');
  }
});




// let c = canvas.getContext("2d");

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', function () {
  const el = document.getElementById('canvas');
  // c.fillStyle = "white";
  ctx.clearRect(0, 0, el.width, el.height);
  // el.style.backgroundImage = `url(img/pintrestgrid.jpg)`;
  startup();
})


//=================================




// function handleStart(evt) {
//   evt.preventDefault();
//   const el = document.getElementById('canvas');
//   const ctx = el.getContext('2d');

//   let startX, startY;
//   el.addEventListener('pointerdown', function (event) {
//     startX = event.clientX - el.offsetLeft;
//     startY = event.clientY - el.offsetTop;
//   });






//   // const touches = evt.changedTouches;

//   // for (let i = 0; i < touches.length; i++) {
//   //   ongoingTouches.push(copyTouch(touches[i]));
//   //   ctx.beginPath();
//   //   ctx.moveTo(touches[i].pageX - 12, touches[i].pageY - 277, 4, 0, 2 * Math.PI);  // a circle at the start
//   //   ctx.fillStyle = color;
//   //   ctx.fill();
//   // }
// }


// function handleMove(evt) {
//   evt.preventDefault();
//   let currentX, currentY;
//   const el = document.getElementById('canvas');
//   const ctx = el.getContext('2d');


//   el.addEventListener('pointermove', function (event) {
//     currentX = event.clientX - el.offsetLeft;
//     currentY = event.clientY - el.offsetTop;
//   });




//   // const touches = evt.changedTouches;

//   // for (let i = 0; i < touches.length; i++) {
//   //   const color = colorForTouch(touches[i]);
//   //   const idx = ongoingTouchIndexById(touches[i].identifier);

//   //   if (idx >= 0) {
//   //     ctx.beginPath();
//   //     ctx.moveTo(ongoingTouches[idx].pageX - 12, ongoingTouches[idx].pageY - 277);
//   //     ctx.lineTo(touches[i].pageX - 12, touches[i].pageY - 277);
//   //     ctx.lineWidth = 2;
//   //     ctx.strokeStyle = color;
//   //     ctx.stroke();

//   //     ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
//   //   } else {
//   //     log('can\'t figure out which touch to continue');
//   //   }
//   // }
// }


// function handleEnd(evt) {
//   evt.preventDefault();
//   const el = document.getElementById('canvas');
//   const ctx = el.getContext('2d');
//   // let currentX, currentY, startX, startY;

//   ctx.strokeStyle = 'black';
//   ctx.lineWidth = 1;

//   const snapX = Math.round(currentX / gridSize) * gridSize;
//   const snapY = Math.round(currentY / gridSize) * gridSize;

//   ctx.beginPath();
//   ctx.moveTo(startX, startY);
//   ctx.lineTo(snapX, snapY);
//   ctx.stroke();



//   // const touches = evt.changedTouches;

//   // for (let i = 0; i < touches.length; i++) {
//   //   const color = colorForTouch(touches[i]);
//   //   let idx = ongoingTouchIndexById(touches[i].identifier);

//   //   if (idx >= 0) {
//   //     ctx.lineWidth = 4;
//   //     ctx.fillStyle = color;
//   //     ctx.beginPath();
//   //     ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY - 277);
//   //     ctx.lineTo(touches[i].pageX - 12, touches[i].pageY - 277);
//   //     // ctx.fillRect(touches[i].pageX - 12 - 4, touches[i].pageY - 4 - 277, 8, 8);  // and a square at the end
//   //     ongoingTouches.splice(idx, 1);  // remove it; we're done
//   //   } else {
//   //     log('can\'t figure out which touch to end');
//   //   }
//   // }
// }

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

// console.log(colorPicker.value);

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


function log(msg) {
  // const container = document.getElementById('log');
  // container.textContent = `${msg} \n${container.textContent}`;
}

//-------------------------------------------------------------

// function drawGrid(cvs, gridSize) {
//   const canvas = document.querySelector('#canvas');
//   const ctx = cvs.getContext('2d');
//   ctx.strokeStyle = 'lightgray';
//   ctx.lineWidth = .5;
//   for (let x = 0; x < cvs.width; x += gridSize) {
//     ctx.beginPath();
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, cvs.height);
//     ctx.stroke();
//   }
// }

// drawGrid(canvas, 500);
