const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let touchEnabled = false; // Flag to toggle drawing on touch

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!isDrawing) return;
  if (!touchEnabled || e.pointerType === 'mouse') { // Draw only if touch is enabled or using a mouse
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
}

function endDrawing() {
  isDrawing = false;
}

function handleTouchStart(e) {
  if (!touchEnabled) { // Enable touch on first touch event
    touchEnabled = true;
  }
  isDrawing = true;
  [lastX, lastY] = [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
  e.preventDefault(); // Prevent scrolling on touch devices
}

function handleTouchMove(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
  ctx.stroke();
  [lastX, lastY] = [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
  e.preventDefault(); // Prevent scrolling on touch devices
}

function handleTouchEnd() {
  isDrawing = false;
}
