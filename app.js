let foodX, foodY;
let specialFoodX, specialFoodY;

let snakeX = 10,
	snakeY = 10;

let velocityX = 0,
	velocityY = 0;

let snakeBody = [];
let gameOver = false;
let setIntervalId;
let intervalTime = 125;
let score = 0;
let highScoreEasy = localStorage.getItem("highscoreEasy") || 0;
let highScoreNormal = localStorage.getItem("highscoreNormal") || 0;
let highScoreHard = localStorage.getItem("highscoreHard") || 0;

const menu = document.querySelector(".main-menu");
const game = document.querySelector(".game");
const pauseContainer = document.querySelector(".pause-container");

const playBtn = menu.querySelector(".play-btn");
playBtn.addEventListener("click", () => {
	menu.classList.remove("show");
	modeMenu.classList.add("show");
});

const modeMenu = document.querySelector(".mode-menu");
const modeBtn = modeMenu.querySelectorAll(".mode-btn");
const displayMode = game.querySelector(".game-mode");
const displayHighscore = game.querySelector(".highscore");
modeBtn.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const mode = e.target.dataset.mode;

		modeMenu.classList.remove("show");
		game.classList.add("show");
		pauseContainer.classList.remove("hide");
		game.classList.add(`mode-${mode}`);

		if (game.classList.contains("mode-easy")) {
			displayMode.innerText = mode;
			displayHighscore.innerText = `Highscore: ${highScoreEasy}`;

			intervalTime += 20;
			setIntervalId = setInterval(gameInit, intervalTime);
		} else if (game.classList.contains("mode-normal")) {
			displayMode.innerText = mode;
			displayHighscore.innerText = `Highscore: ${highScoreNormal}`;

			setIntervalId = setInterval(gameInit, intervalTime);
		} else if (game.classList.contains("mode-hard")) {
			displayMode.innerText = mode;
			displayHighscore.innerText = `Highscore: ${highScoreHard}`;

			intervalTime -= 55;
			setIntervalId = setInterval(gameInit, intervalTime);
		}
	});
});

const playground = game.querySelector(".playground");
const displayScore = game.querySelector(".score");

const pauseNav = pauseContainer.querySelector(".pause-nav");
const hoverNav = pauseNav.querySelectorAll(".nav-toggle i");
hoverNav.forEach((nav) => {
	nav.addEventListener("mouseover", () => {
		nav.classList.add("hover");
	});
});

const pauseBtn = pauseNav.querySelector(".pause-btn");
/* Retry 
const retryBtn = pauseNav.querySelector('.pause-retry');
retryBtn.addEventListener('click', () => {
    console.log(`You clicked retry on pause container!!!`);
  });
  */

const exitBtn = pauseNav.querySelector(".pause-exit");
exitBtn.addEventListener("click", () => {
	window.location.reload();
});

window.addEventListener("DOMContentLoaded", () => {
	menu.classList.add("show");
});

// Escape = Pause
window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		pauseNav.classList.toggle("paused");
		pauseBtn.setAttribute("class", "fa-solid fa-play pause-btn");
	}

	if (pauseNav.classList.contains("paused")) {
		pauseBtn.setAttribute("class", "fa-solid fa-play pause-btn");
	} else {
		pauseBtn.setAttribute("class", "fa-solid fa-pause pause-btn");
	}
});

<<<<<<< HEAD
const changeFoodPosition = (bodyPositionA, bodyPositionB) => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;

  if (foodX === bodyPositionA && foodY === bodyPositionB) {
    console.log(`ALAMAAAKKK!!!`);
    return false;
  } else {
    return foodX, foodY;
  }
};
changeFoodPosition();

const changeSpecialFoodPosition = (bodyPositionA, bodyPositionB) => {
  setTimeout(() => {
    specialFoodX = Math.floor(Math.random() * 35) + 1;
    specialFoodY = Math.floor(Math.random() * 35) + 1;
  }, 1000);

  if (specialFoodX === bodyPositionA && specialFoodY === bodyPositionB) {
    console.log(`ALAMAAAKKK!!!`);
    return false;
  } else {
    return foodX, foodY;
  }
=======
const changeFoodPosition = () => {
	foodX = Math.floor(Math.random() * 30) + 1;
	foodY = Math.floor(Math.random() * 30) + 1;
};
changeFoodPosition();

const changeSpecialFoodPosition = () => {
	setTimeout(() => {
		specialFoodX = Math.floor(Math.random() * 35) + 1;
		specialFoodY = Math.floor(Math.random() * 35) + 1;
	}, 3000);
>>>>>>> c31eda791ad02459fcb321f3ee0430c815be5815
};
changeSpecialFoodPosition();

const gameInit = () => {
	if (gameOver) return gameOverHandle();

<<<<<<< HEAD
  if (snakeX === foodX && snakeY === foodY) {
    // Jika bertabrakan dengan posisi food
    snakeBody.forEach((snake) => {
      changeFoodPosition(snake[0], snake[1]); // Membuat food baru di lokasi yang baru
    });
    snakeBody.push([foodX, foodY]); // Menambahkan array food
=======
	if (snakeX === foodX && snakeY === foodY) {
		// Jika bertabrakan dengan posisi food
		changeFoodPosition(); // Membuat food baru di lokasi yang baru
		snakeBody.push([foodX, foodY]); // Menambahkan array food
>>>>>>> c31eda791ad02459fcb321f3ee0430c815be5815

		score++; // Poin bertambah 1
		displayScore.innerText = `Score: ${score}`;

		if (game.classList.contains("mode-easy")) {
			highScoreEasy = score >= highScoreEasy ? score : highScoreEasy; // Nentuin nilai highscore
			localStorage.setItem("highscoreEasy", highScoreEasy); // Masukkin highscore ke localstorage
			displayHighscore.innerText = `Highscore: ${highScoreEasy}`;
		} else if (game.classList.contains("mode-normal")) {
			highScoreNormal = score >= highScoreNormal ? score : highScoreNormal; // Nentuin nilai highscore
			localStorage.setItem("highscoreNormal", highScoreNormal); // Masukkin highscore ke localstorage
			displayHighscore.innerText = `Highscore: ${highScoreNormal}`;
		} else if (game.classList.contains("mode-hard")) {
			highScoreHard = score >= highScoreHard ? score : highScoreHard; // Nentuin nilai highscore
			localStorage.setItem("highscoreHard", highScoreHard); // Masukkin highscore ke localstorage
			displayHighscore.innerText = `Highscore: ${highScoreHard}`;
		}
	}

<<<<<<< HEAD
  if (snakeX === specialFoodX && snakeY === specialFoodY) {
    snakeBody.forEach((snake) => {
      changeSpecialFoodPosition(snake[0], snake[1]);
    });
    snakeBody.push([specialFoodX, specialFoodY]); // Menambahkan array food
=======
	if (snakeX === specialFoodX && snakeY === specialFoodY) {
		changeSpecialFoodPosition();
		snakeBody.push([specialFoodX, specialFoodY]); // Menambahkan array food
>>>>>>> c31eda791ad02459fcb321f3ee0430c815be5815

		score++;
		displayScore.innerText = `Score: ${score}`;
	}

	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}

	snakeBody[0] = [snakeX, snakeY]; // First element

	snakeX += velocityX;
	snakeY += velocityY;

	if (game.classList.contains("mode-easy")) {
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
			gameOver = true;
		}
	}

	let htmlMarkup = `
    <div class="food" style="grid-area: ${foodY} / ${foodX};"></div>
  `;

	let specialMarkup = `
    <div class="special-food" style="grid-area: ${specialFoodY} / ${specialFoodX};"></div>
  `;

	for (let i = 0; i < snakeBody.length; i++) {
		htmlMarkup += `<div class="snake-head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;

		specialMarkup += `<div class="snake-head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;

		if (
			i !== 0 &&
			snakeBody[0][1] === snakeBody[i][1] &&
			snakeBody[0][0] == snakeBody[i][0]
		) {
			gameOver = true;
		}
	}

<<<<<<< HEAD
  if (score % 2 === 1) {
    playground.innerHTML = htmlMarkup + specialMarkup;
  } else {
    playground.innerHTML = htmlMarkup;
  }
=======
	if (score % 3 == 0 && score !== 0) {
		playground.innerHTML = htmlMarkup + specialMarkup;
	} else {
		playground.innerHTML = htmlMarkup;
	}
>>>>>>> c31eda791ad02459fcb321f3ee0430c815be5815
};

const changeDirection = (e) => {
	// Velocity -1 means the snake can't go back
	if (e.key === "ArrowUp" && velocityY != 1) {
		velocityX = 0;
		velocityY = -1;
	} else if (e.key === "ArrowDown" && velocityY != -1) {
		velocityX = 0;
		velocityY = 1;
	} else if (e.key === "ArrowLeft" && velocityX != 1) {
		velocityX = -1;
		velocityY = 0;
	} else if (e.key === "ArrowRight" && velocityX != -1) {
		velocityX = 1;
		velocityY = 0;
	}
	gameInit();
};

const controls = document.querySelectorAll(".controls i");
controls.forEach((key) => {
	key.addEventListener("click", () => {
		if (game.classList.contains("show")) {
			changeDirection({ key: key.dataset.key });
		}
	});
});

const gameOverHandle = () => {
	clearInterval(setIntervalId);

	const alertContain = document.createElement("section");
	alertContain.innerHTML = `
		<article class="alert-content">
			<h1 class="alert-title">YOU LOSE!!!</h1>
			<div class="btn-container">
				<button class="exit-btn">Exit</button>
			</div>
		</article>
	`;
	alertContain.classList.add("alert-container");
	document.body.appendChild(alertContain);

	/* Retry 
  const retryBtn = alertContain.querySelector('.retry-btn');
  retryBtn.addEventListener('click', () => {
    console.log('Retry!!!');
  });
  */

	const exitBtn = alertContain.querySelector(".exit-btn");
	exitBtn.addEventListener("click", () => {
		window.location.reload();
	});
};

<<<<<<< HEAD
document.addEventListener('keydown', (e) => {
  if (game.classList.contains('show')) {
    changeDirection({ key: e.key });
  }
=======
document.addEventListener("keydown", (e) => {
	if (game.classList.contains("show")) {
		changeDirection({ key: e.key });
	}
>>>>>>> c31eda791ad02459fcb321f3ee0430c815be5815
});

window.addEventListener("click", (e) => {
	if (e.target == pauseBtn) {
		pauseBtn.setAttribute("class", "fa-solid fa-play pause-btn");
		pauseNav.classList.toggle("paused");
	} else {
		pauseBtn.setAttribute("class", "fa-solid fa-pause pause-btn");
		pauseNav.classList.remove("paused");
	}
	if (pauseNav.classList.contains("paused")) {
		pauseBtn.setAttribute("class", "fa-solid fa-play pause-btn");
	} else {
		pauseBtn.setAttribute("class", "fa-solid fa-pause pause-btn");
	}
});
