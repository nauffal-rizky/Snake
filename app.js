const playground = document.querySelector('.playground');

let foodX, foodY;
let snakeX = 10,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const gameInit = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
  }

  snakeX += velocityX;
  snakeY += velocityY;
  htmlMarkup += `<div class="snake-head" style="grid-area: ${snakeY} / ${snakeX};"></div>`;
  playground.innerHTML = htmlMarkup;
};

const changeDirection = (e) => {
  console.log(e);
  if (e.key === 'ArrowUp') {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === 'ArrowDown') {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === 'ArrowLeft') {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === 'ArrowRight') {
    velocityX = 1;
    velocityY = 0;
  }
  gameInit();
};

changeFoodPosition();
setInterval(gameInit, 125);
document.addEventListener('keydown', changeDirection);
