const canvas = document.querySelector('#myCanvas');
const scoreText = document.querySelector('#scoreText');
let score = 0;
scoreText.innerHTML = score;
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.offsetWidth - 2;
const canvasHeight = canvas.offsetHeight - 2;
const buracos = 9;
const initialPosX = 40;
const initialPosY = 80;
let currentPosX = initialPosX;
let currentPosY = initialPosY;
let offsetX = 230;
let offsetY = 120;
let index = 1;
const sizeX = 50;
const sizeY = 50;
const displayMoleInterval = 1000;
const clearMoleInterval = displayMoleInterval - 500;
const toupeiraOffset = 5;
const positions = {
}
let globalExactPosition = {};

for (let i = 0; i < 3; i += 1) {
  ctx.beginPath();
  ctx.rect(currentPosX, currentPosY, sizeX, sizeY);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
  positions[index] = { initialX: currentPosX, initialY: currentPosY, finalX: currentPosX + sizeX, finalY: currentPosY + sizeY };
  index += 1;
  for (let j = 0; j < 2; j += 1) {
    currentPosY += offsetY;
    ctx.beginPath();
    ctx.rect(currentPosX, currentPosY, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    positions[index] = { initialX: currentPosX, initialY: currentPosY, finalX: currentPosX + sizeX, finalY: currentPosY + sizeY };
    index += 1;
  }
  currentPosY =  initialPosY;
  currentPosX += offsetX;
}

const exactPosition = () => {
  const index =  Math.floor(Math.random() * 9 + 1);
  return positions[index];
}

const drawToupeira = (cor, ini, fim) => {
  ctx.beginPath();
  ctx.rect(ini + 5, fim + 5, 40, 40);
  ctx.fillStyle = cor;
  ctx.fill();
  ctx.closePath();
}

const clearToupeira = () => {
  const { initialX, initialY } = drawToupeira();
  ctx.beginPath();
  ctx.rect(initialX + toupeiraOffset, initialY + toupeiraOffset, 40, 40);
  ctx.fillStyle = "#FF000";
  ctx.fill();
  ctx.closePath();
  return { initialX, initialY }
}

setInterval((() => {
  const { initialX, initialY, finalX, finalY } = exactPosition();
  globalExactPosition = { initialX, initialY, finalX, finalY };
  drawToupeira('#000', initialX, initialY)
  const timeoutID = setTimeout((() => {
    drawToupeira('#FF0000', initialX, initialY)
    clearTimeout(timeoutID)
  }), clearMoleInterval);
}), displayMoleInterval);


canvas.addEventListener('click', (evt) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = evt.clientX - rect.left;
  const mouseY = evt.clientY - rect.top;
  const { initialX, initialY, finalX, finalY } = globalExactPosition;
  console.log(globalExactPosition)
  if (mouseX >= initialX + toupeiraOffset && mouseX <= finalX - toupeiraOffset 
      && mouseY >= initialY + toupeiraOffset && mouseY <= finalY - toupeiraOffset
    ) {
      score += 1;
      // Para evitar farm de pontos, reseta a posição CONHECIDA da toupeira pelo mouse
      globalExactPosition = {};
      scoreText.innerHTML = score;
    }
});