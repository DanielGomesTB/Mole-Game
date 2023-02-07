/*const posicoes = {
  1: 243px 30px
  2: 300px 20px
  3: 300px 20px
  4: 300px 20px
  5: 300px 20px
  6: 300px 20px
  7: 300px 20px
  8: 300px 20px
  9: 300px 20px


/*
  GAME LOOP:
    TOUPEIRA

*/

const canvas = document.querySelector('#myCanvas');
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

const positions = {
}

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

// toupeira
console.log(positions)
const exactPosition = () => {
  const index =  Math.floor(Math.random() * 9 + 1);
  return positions[index];
}


const drawToupeira = () => {
  // Randomiza numero
  // const index =  Math.floor(Math.random() * 9 + 1);
  // console.log(index)
  // Acessa objeto com numero
  // Retorna posições
  const { initialX, initialY } = exactPosition();
  ctx.beginPath();
  ctx.rect(initialX + 5, initialY + 5, 40, 40);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
  return { initialX, initialY }
}

const clearToupeira = () => {
  const { initialX, initialY } = drawToupeira();
  ctx.beginPath();
  ctx.rect(initialX + 5, initialY + 5, 40, 40);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

setInterval(() => {
  drawToupeira();
}, 10000)

setInterval(() => {
  clearToupeira()
}, 10000);