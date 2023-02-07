// instancias
const moleImg = new Image();
const buracoImg = new Image();

// DOM selector
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const scoreText = document.querySelector('#scoreText');
const body = document.querySelector('body');

// images import
canvas.style.backgroundImage = "url(../images/grass.png)";
body.style.cursor = "url(../images/hammerIdle.png), auto";
buracoImg.src = "../images/buraco.png";
moleImg.src = "../images/toupeirinha.png";

// variáveis
const buracos = 9;
const initialPosX = 40;
const initialPosY = 80;
const sizeX = 50;
const sizeY = 50;
const displayMoleInterval = 1500;
const clearMoleInterval = displayMoleInterval - 500;
const canvasWidth = canvas.offsetWidth - 2;
const canvasHeight = canvas.offsetHeight - 2;
const toupeiraOffset = 5;
const positions = {}

// inicializadores
let offsetX = 230;
let offsetY = 120;
let score = 0;
let index = 1;
scoreText.innerHTML = score;
let currentPosX = initialPosX;
let currentPosY = initialPosY;
let globalMolePosition = {};

// criação dos buracos horizontais
for (let i = 0; i < 3; i += 1) {
  ctx.beginPath();
  ctx.rect(currentPosX, currentPosY, sizeX, sizeY);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
  positions[index] = { initialX: currentPosX, initialY: currentPosY, finalX: currentPosX + sizeX, finalY: currentPosY + sizeY };
  index += 1;

  // criação dos buracos verticais
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

// randomiza a toupeira nos buracos
const setMolePosition = () => {
  const index =  Math.floor(Math.random() * 9 + 1);
  return positions[index];
}

// cria a toupeira
const drawToupeira = (color, ini, end, dim) => {
  ctx.beginPath();
  ctx.rect(ini + 5, end + 5, dim, dim);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// apaga a toupeira
const clearToupeira = () => {
  const { initialX, initialY } = drawToupeira();
  ctx.beginPath();
  ctx.rect(initialX + toupeiraOffset, initialY + toupeiraOffset, 40, 40);
  ctx.fillStyle = "#FF000";
  ctx.fill();
  ctx.closePath();
  return { initialX, initialY }
}

// spawna a topeira
setInterval((() => {
  const { initialX, initialY, finalX, finalY } = setMolePosition();
  globalMolePosition = { initialX, initialY, finalX, finalY };
  drawToupeira('#000', initialX, initialY, 40);
  ctx.drawImage(moleImg, initialX + 2.5, initialY + 2.5);
  const timeoutID = setTimeout((() => {
    drawToupeira('#FF0000', initialX - 5, initialY - 5, 50)
    globalMolePosition = {}
    clearTimeout(timeoutID)
  }), clearMoleInterval);
}), displayMoleInterval);

// conta a pontuação por clique
canvas.addEventListener('click', (evt) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = evt.clientX - rect.left;
  const mouseY = evt.clientY - rect.top;
  const { initialX, initialY, finalX, finalY } = globalMolePosition;
  if (mouseX >= initialX + toupeiraOffset && mouseX <= finalX - toupeiraOffset 
      && mouseY >= initialY + toupeiraOffset && mouseY <= finalY - toupeiraOffset
    ) {
      score += 1;
      // Para evitar farm de pontos, reseta a posição CONHECIDA da toupeira pelo mouse
      globalMolePosition = {};
      scoreText.innerHTML = score;
    }
});

// sprite do cursor
/*
body.addEventListener('mousedown', () => {
  body.style.cursor = "url(../images/hammerMove.png), auto";
})

body.addEventListener('mouseup', () => {
  body.style.cursor = "url(../images/hammerIdle.png), auto";
})*/