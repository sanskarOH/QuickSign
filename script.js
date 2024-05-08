const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let selectedTool = 'pencil';
let pencilColor = '#000000';
let pencilSize = 2;

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseout', handleMouseOut);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);
document.getElementById('resetBtn').addEventListener('click', resetCanvas);
document.getElementById('downloadBtn').addEventListener('click', downloadImage);

function handleMouseDown(e) {
  if (selectedTool === 'pencil') {
    startDrawing(e);
  }
}

function handleMouseMove(e) {
  if (selectedTool === 'pencil') {
    draw(e);
  }
}

function handleTouchStart(e) {
  if (selectedTool === 'pencil') {
    startDrawing(e.touches[0]);
    e.preventDefault(); // Prevent default touch action
  }
}

function handleTouchMove(e) {
  if (selectedTool === 'pencil') {
    draw(e.touches[0]);
    e.preventDefault(); // Prevent default touch action
  }
}

function handleMouseUp() {
  endDrawing();
}

function handleTouchEnd() {
  endDrawing();
}

function handleMouseOut() {
  endDrawing();
}

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = pencilColor;
  ctx.lineWidth = pencilSize;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function endDrawing() {
  isDrawing = false;
}

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadImage() {
  // Temporarily store the canvas content
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');
  
  // Fill the temporary canvas with white background
  tempCtx.fillStyle = '#ffffff';
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw the canvas content onto the temporary canvas
  tempCtx.drawImage(canvas, 0, 0);
  
  // Convert the canvas content to a data URL
  const image = tempCanvas.toDataURL('image/png');

  // Create a link element and trigger download
  const link = document.createElement('a');
  link.href = image;
  link.download = 'signature.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function selectPencil() {
  selectedTool = 'pencil';
}

function handleColorChange(e) {
  pencilColor = e.target.value;
}

function handleSizeChange(e) {
  pencilSize = parseInt(e.target.value);
}

document.getElementById('colorPicker').addEventListener('input', handleColorChange);
document.getElementById('sizeRange').addEventListener('input', handleSizeChange);
