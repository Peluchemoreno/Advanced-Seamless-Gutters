const ongoingTouches = [];


function startup() {
  const el = document.getElementById('canvas');
  el.width = 500;
  el.height = 550;
  el.addEventListener('touchstart', handleStart);
  el.addEventListener('touchend', handleEnd);
  el.addEventListener('touchcancel', handleCancel);
  el.addEventListener('touchmove', handleMove);
}

document.addEventListener("DOMContentLoaded", startup);
// let c = canvas.getContext("2d");
// let color = "black";
// let drawWidth = "1";
// let isDrawing = false;



// function start(e) {
//   e.preventDefault();
//   console.log(e);
//   let x = e.offsetX;
//   let y = e.offsetY;
//   isDrawing = true;
//   c.beginPath();
//   c.moveTo(e.offsetX, e.offsetY);
//   console.log(e.offsetX, e.offsetY);
//   // c.stroke();
// }

// function draw(e) {
//   e.preventDefault();
//   let x = e.offsetX;
//   let y = e.offsetY;
//   if (isDrawing) {
//     c.lineTo(x, y);
//     c.strokeStyle = color;
//     c.lineWidth = drawWidth;
//     c.lineCap = "round";
//     c.lineJoin = "round";
//     c.stroke();
//   }
// }

// function end(e) {
//   e.preventDefault();
//   isDrawing = false;
// }
const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', function () {
  const el = document.getElementById('canvas');
  c.fillStyle = "white";
  c.clearRect(0, 0, el.width, el.height);
  c.fillRect(0, 0, el.width, el.height);
  console.log("clearing");
})



// el.addEventListener("pointerdown", start, false);
// el.addEventListener("pointermove", draw, false);
// el.addEventListener("pointerup", end, false);
// el.addEventListener("pointercancel", cancel, false);



//=================================




function handleStart(evt) {
  evt.preventDefault();
  console.log(evt.target.offsetLeft, evt.target.offsetTop);
  const el = document.getElementById('canvas');
  const ctx = el.getContext('2d');
  const touches = evt.changedTouches;
  // const offsetTop = evt.originalTarget.offsetTop;
  // const offsetLeft = evt.originalTarget.offsetLeft;

  for (let i = 0; i < touches.length; i++) {
    // log(`touchstart: ${i}.`);
    ongoingTouches.push(copyTouch(touches[i]));
    const color = colorForTouch(touches[i]);
    // log(`color of touch with id ${touches[i].identifier} = ${color}`);
    ctx.beginPath();
    ctx.moveTo(touches[i].pageX - 12, touches[i].pageY - 277, 4, 0, 2 * Math.PI);  // a circle at the start
    // ctx.moveTo(0, 0);
    ctx.fillStyle = color;
    ctx.fill();
    // console.log(touches[i].pageY);
  }
}


function handleMove(evt) {
  evt.preventDefault();
  // let offsetTop = evt.originalTarget.offsetTop;
  // let offsetLeft = evt.originalTarget.offsetLeft;
  const el = document.getElementById('canvas');
  const ctx = el.getContext('2d');
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const color = colorForTouch(touches[i]);
    const idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX - 12, ongoingTouches[idx].pageY - 277);
      // ctx.moveTo(0, 0);
      ctx.lineTo(touches[i].pageX - 12, touches[i].pageY - 277);
      // ctx.lineTo(500, 550);
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
    } else {
      log('can\'t figure out which touch to continue');
    }
  }
}


function handleEnd(evt) {
  evt.preventDefault();
  log("touchend");
  // let offsetTop = evt.originalTarget.offsetTop;
  // let offsetLeft = evt.originalTarget.offsetLeft;
  const el = document.getElementById('canvas');
  const ctx = el.getContext('2d');
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const color = colorForTouch(touches[i]);
    let idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY - 277);
      ctx.lineTo(touches[i].pageX - 12, touches[i].pageY - 277);
      ctx.fillRect(touches[i].pageX - 12 - 4, touches[i].pageY - 4 - 277, 8, 8);  // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else {
      log('can\'t figure out which touch to end');
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  log('touchcancel.');
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1);  // remove it; we're done
  }
}

function colorForTouch(touch) {
  let r = touch.identifier % 16;
  let g = Math.floor(touch.identifier / 3) % 16;
  let b = Math.floor(touch.identifier / 7) % 16;
  r = r.toString(16); // make it a hex digit
  g = g.toString(16); // make it a hex digit
  b = b.toString(16); // make it a hex digit
  const color = `#${0}${0}${0}`;
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


function log(msg) {
  // const container = document.getElementById('log');
  // container.textContent = `${msg} \n${container.textContent}`;
}
