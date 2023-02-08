export const play = () => {
    // instancias
    const moleImg = new Image();
    const buracoImg = new Image();
    
    // DOM selector
    const canvas = document.querySelector('#myCanvas');
    const ctx = canvas.getContext("2d");
    const scoreText = document.querySelector('#scoreText');
    const body = document.querySelector('body');
    
    // import
    // canvas.style.backgroundImage = "url(../images/grass.png)";
    // document.documentElement.style.cursor = "url(../images/hammerIdle.png), auto";
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
    // const canvasWidth = canvas.offsetWidth;
    // const canvasHeight = canvas.offsetHeight;
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
    
    // ctx generico
    const setPath = (color, x, y, width, height) => {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
    
    // cria o campo do jogo
    const createField = () => {
       for (let i = 0; i < 3; i += 1) {
        ctx.drawImage(buracoImg, currentPosX += 20, currentPosY += 20);
        positions[index] = { 
          initialX: currentPosX, 
          initialY: currentPosY, 
          finalX: currentPosX + sizeX, 
          finalY: currentPosY + sizeY 
        };
        index += 1;
      
        // criação dos buracos verticais
        for (let j = 0; j < 2; j += 1) {
          currentPosY += offsetY;
          ctx.drawImage(buracoImg, currentPosX, currentPosY);
          positions[index] = { 
            initialX: currentPosX, 
            initialY: currentPosY, 
            finalX: currentPosX + sizeX, 
            finalY: currentPosY + sizeY 
          };
          index += 1;
        }
        currentPosY =  initialPosY;
        currentPosX += offsetX;
      }
      canvas.style.backgroundImage = "url(../images/grass.png)";
    }
    
    setTimeout(() => {
      createField()
    }, 100)
    
    // randomiza a toupeira nos buracos
    const setMolePosition = () => {
      const index =  Math.floor(Math.random() * 9 + 1);
      return positions[index];
    }
    
    // spawna a topeira
    setInterval((() => {
      const { initialX, initialY, finalX, finalY } = setMolePosition();
      globalMolePosition = { initialX, initialY, finalX, finalY };
      ctx.drawImage(moleImg, initialX + 2.5, initialY - 16);
      const timeoutID = setTimeout((() => {
        createField()
        ctx.clearRect(initialX, initialY - 20, 100, 140)
        ctx.drawImage(buracoImg, initialX, initialY);
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
      if (mouseX >= initialX && mouseX <= finalX 
          && mouseY >= initialY - 16 && mouseY <= finalY
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
    }