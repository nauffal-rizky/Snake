// PRESET
let foodX, foodY;
let obstacleA, obstacleB, obstacleC, obstacleD;

let snakeX = 10,
  snakeY = 10;

let velocityX = 0,
  velocityY = 0;

let snakeBody = [];
let hardMode = false;
let setIntervalId;
let intervalTime = 125;
let score = 0;
let highScoreEasy = localStorage.getItem('highscoreEasy') || 0;
let highScoreNormal = localStorage.getItem('highscoreNormal') || 0;
let highScoreHard = localStorage.getItem('highscoreHard') || 0;

// MAIN-MENU
const menu = document.querySelector('.main-menu');
const credits = document.querySelector('.credits');
const game = document.querySelector('.game');
const pauseNav = document.querySelector('.pause-nav');
const playBtn = menu.querySelector('.play-btn');
const backBtn = document.querySelector('.back-btn');
playBtn.addEventListener('click', () => {
  menu.classList.remove('show');
  credits.classList.remove('show');
  modeMenu.classList.add('show');
  backBtn.classList.remove('hide');
});

// MODE-SECTION
const modeMenu = document.querySelector('.mode-menu');
const modeBtn = modeMenu.querySelectorAll('.mode-btn');
const displayMode = game.querySelector('.game-mode');
const displayHighscore = game.querySelector('.highscore');
modeBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const mode = e.target.dataset.mode;

    modeMenu.classList.remove('show');
    backBtn.classList.add('hide');

    game.classList.add('show');
    pauseNav.classList.remove('hide');
    game.classList.add(`mode-${mode}`);

    // MANUAL
    const manual = document.querySelector('.manual');
    const closeManual = manual.querySelector('.manual-content i');
    manual.classList.remove('hide');
    window.addEventListener('click', (e) => {
      if (e.target === manual || e.target === closeManual) {
        manual.classList.add('hide');
      }
    });
    if (!manual.classList.contains('hide')) {
      setTimeout(() => {
        manual.classList.add('hide');
      }, 10000);
    }

    if (game.classList.contains('mode-easy')) {
      displayMode.innerText = mode;
      displayHighscore.innerText = `Highscore: ${highScoreEasy}`;

      intervalTime += 20;
      setIntervalId = setInterval(gameInit, intervalTime);
    } else if (game.classList.contains('mode-normal')) {
      displayMode.innerText = mode;
      displayHighscore.innerText = `Highscore: ${highScoreNormal}`;

      setIntervalId = setInterval(gameInit, intervalTime);
    } else if (game.classList.contains('mode-hard')) {
      displayMode.innerText = mode;
      displayHighscore.innerText = `Highscore: ${highScoreHard}`;

      intervalTime -= 55;
      setIntervalId = setInterval(gameInit, intervalTime);
      hardMode = true;
    }
  });
});
backBtn.addEventListener('click', () => {
  modeMenu.classList.remove('show');
  backBtn.classList.add('hide');
  menu.classList.add('show');
});

const hoverNav = pauseNav.querySelectorAll('.nav-toggle i');
hoverNav.forEach((nav) => {
  nav.addEventListener('mouseover', () => {
    nav.classList.add('hover');
  });
});

const pauseBtn = pauseNav.querySelector('.pause-btn');
const exitBtn = pauseNav.querySelector('.pause-exit');
exitBtn.addEventListener('click', () => {
  clearInterval(setIntervalId);
  hardMode = false;

  game.classList.remove('show');
  game.setAttribute('class', 'game');

  pauseNav.classList.add('hide');
  menu.classList.add('show');
});

// Escape = Pause
window.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    pauseNav.classList.toggle('paused');
  }

  if (pauseNav.classList.contains('paused')) {
    pauseBtn.setAttribute('class', 'fa-solid fa-play pause-btn');
  } else {
    pauseBtn.setAttribute('class', 'fa-solid fa-pause pause-btn');
  }
});

// GAMEPLAY
const changeFoodPosition = (bodyPositionA, bodyPositionB) => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;

  if (foodX === bodyPositionA && foodY === bodyPositionB) {
    return false;
  } else {
    return foodX, foodY;
  }
};
changeFoodPosition();
const changeObstaclePosition = () => {
  obstacleA = Math.floor(Math.random() * 30) + 1;
  obstacleB = Math.floor(Math.random() * 30) + 1;
  obstacleC = Math.floor(Math.random() * 30) + 1;
  obstacleD = Math.floor(Math.random() * 30) + 1;
};
if (!hardMode) {
  setInterval(changeObstaclePosition, 3000);
}

const playground = game.querySelector('.playground');
const displayScore = game.querySelector('.score');

const gameInit = () => {
  if (snakeX === foodX && snakeY === foodY) {
    // Jika bertabrakan dengan posisi food
    snakeBody.forEach((snake) => {
      changeFoodPosition(snake[0], snake[1]); // Membuat food baru di lokasi yang baru
    });
    snakeBody.push([foodX, foodY]); // Menambahkan array food

    score++; // Poin bertambah 1
    displayScore.innerText = `Score: ${score}`;

    if (game.classList.contains('mode-easy')) {
      highScoreEasy = score >= highScoreEasy ? score : highScoreEasy; // Nentuin nilai highscore
      localStorage.setItem('highscoreEasy', highScoreEasy); // Masukkin highscore ke localstorage
      displayHighscore.innerText = `Highscore: ${highScoreEasy}`;
    } else if (game.classList.contains('mode-normal')) {
      highScoreNormal = score >= highScoreNormal ? score : highScoreNormal; // Nentuin nilai highscore
      localStorage.setItem('highscoreNormal', highScoreNormal); // Masukkin highscore ke localstorage
      displayHighscore.innerText = `Highscore: ${highScoreNormal}`;
    } else if (game.classList.contains('mode-hard')) {
      highScoreHard = score >= highScoreHard ? score : highScoreHard; // Nentuin nilai highscore
      localStorage.setItem('highscoreHard', highScoreHard); // Masukkin highscore ke localstorage
      displayHighscore.innerText = `Highscore: ${highScoreHard}`;
    }
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY]; // First element

  snakeX += velocityX;
  snakeY += velocityY;

  // Mode
  if (game.classList.contains('mode-easy')) {
    /* No wall gameplay */
    if (snakeX < 1) {
      snakeX = 30;
    } else if (snakeY < 1) {
      snakeY = 30;
    } else if (snakeX > 30) {
      snakeX = 1;
    } else if (snakeY > 30) {
      snakeY = 1;
    }
  } else {
    /* with wall gameplay */
    if (snakeX <= 0 || snakeY <= 0 || snakeX > 30 || snakeY > 30) {
      gameOverHandle(`You just hit the wall...please be careful..`);
    }
  }

  let htmlMarkup = `
    <div class="food" style="grid-area: ${foodY} / ${foodX};"></div>
    `;

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="snake-head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;

    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] == snakeBody[i][0]) {
      gameOverHandle(`Don't be a cannibal..please...`);
    }
  }
  playground.innerHTML = htmlMarkup;

  // OBSTACLE
  let obstacle = `<div class="obstacle" style="grid-area: ${obstacleA} / ${obstacleB};"></div>`;

  if (score > 25) {
    obstacle += `<div class="obstacle" style="grid-area: ${obstacleC} / ${obstacleA};"></div>`;
    if (snakeX === obstacleA && snakeY === obstacleC) {
      gameOverHandle(`You just hit the "Obstacle", please be careful next time`);
    }
  }
  if (score > 30) {
    obstacle += `<div class="obstacle" style="grid-area: ${obstacleC} / ${obstacleD};"></div>`;
    if (snakeX === obstacleD && snakeY === obstacleC) {
      gameOverHandle(`You just hit the "Obstacle", please be careful next time`);
    }
  }
  if (score > 35) {
    obstacle += `<div class="obstacle" style="grid-area: ${obstacleD} / ${obstacleB};"></div>`;
    if (snakeX === obstacleB && snakeY === obstacleD) {
      gameOverHandle(`You just hit the "Obstacle", please be careful next time`);
    }
  }
  if (score > 20) {
    playground.innerHTML += obstacle;
    if (snakeX === obstacleB && snakeY === obstacleA) {
      gameOverHandle(`You just hit the "Obstacle", please be careful next time`);
    }
  }
};

const changeDirection = (e) => {
  // Velocity -1 means the snake can't go back
  if (e.key === 'ArrowUp' && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === 'ArrowDown' && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === 'ArrowRight' && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  gameInit();
  if (hardMode) {
    changeObstaclePosition();
  }
};

const controls = document.querySelectorAll('.controls i');
controls.forEach((key) => {
  key.addEventListener('click', () => {
    if (game.classList.contains('show')) {
      changeDirection({ key: key.dataset.key });
    }
  });
});

const gameOverHandle = (message) => {
  clearInterval(setIntervalId);

  const alertContain = document.createElement('section');
  alertContain.innerHTML = `
		<article class="alert-content">
			<h1 class="alert-title">YOU LOSE!!</h1>
      <p class="alert-message">${message}</p>
			<div class="btn-container">
				<button class="exit-btn">Exit</button>
			</div>
		</article>
	`;
  alertContain.classList.add('alert-container');
  document.body.appendChild(alertContain);

  const exitBtn = alertContain.querySelector('.exit-btn');
  exitBtn.addEventListener('click', () => {
    window.location.reload();
  });
};

document.addEventListener('keydown', (e) => {
  if (game.classList.contains('show')) {
    changeDirection({ key: e.key });
  }
});

window.addEventListener('click', (e) => {
  if (e.target == pauseBtn) {
    pauseBtn.setAttribute('class', 'fa-solid fa-play pause-btn');
    pauseNav.classList.toggle('paused');
  } else {
    pauseBtn.setAttribute('class', 'fa-solid fa-pause pause-btn');
    pauseNav.classList.remove('paused');
  }
  if (pauseNav.classList.contains('paused')) {
    pauseBtn.setAttribute('class', 'fa-solid fa-play pause-btn');
  } else {
    pauseBtn.setAttribute('class', 'fa-solid fa-pause pause-btn');
  }
});
