const c = document.getElementById("painting");
const clearBtn = document.getElementById("clear");

c.addEventListener("mousedown", setLastCoords); // fires before mouse left btn is released
c.addEventListener("mousemove", freeForm);

const ctx = c.getContext("2d");


const background = new Image();
background.src = "./img/frame.png";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
}


function setLastCoords(e) {
  const { x, y } = c.getBoundingClientRect();
  lastX = e.clientX - x;
  lastY = e.clientY - y;
}

function freeForm(e) {
  if (e.buttons !== 1) return; // left button is not pushed yet
  penTool(e);
}

function penTool(e) {
  const { x, y } = c.getBoundingClientRect();
  const newX = e.clientX - x;
  const newY = e.clientY - y;

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(newX, newY);
  ctx.strokeStyle = "#1e365e";
  ctx.stroke();
  ctx.closePath();

  lastX = newX;
  lastY = newY;
}

let lastX = 0;
let lastY = 0;



clearBtn.addEventListener("click", clearcanvas);

function clearcanvas() {
  location.reload();
}


// Save | Download image
function downloadImage(data, filename = 'bean-painting.jpg') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

// Convert canvas to image
document.getElementById('btn-download').addEventListener("click", function(e) {
  var canvas = document.querySelector('#painting');
  var dataURL = canvas.toDataURL("image/jpeg", 1.0);
  downloadImage(dataURL, 'bean-painting.jpg');
});