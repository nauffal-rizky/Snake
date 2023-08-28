const menu = document.querySelector(".main-menu");
const playBtn = menu.querySelector(".play-btn");
const modeMenu = document.querySelector(".mode-menu");
const modeBtn = modeMenu.querySelectorAll(".mode-btn");
const game = document.querySelector(".game");
const playground = document.querySelector(".playground");
const displayScore = document.querySelector(".score");
const displayHighscore = document.querySelector(".highscore");

let foodX, foodY;
let snakeX = 10,
	snakeY = 10;

let velocityX = 0,
	velocityY = 0;

let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("highscore") || 0;
displayHighscore.innerText = `Highscore: ${highScore}`;

window.addEventListener("DOMContentLoaded", () => {
	menu.classList.add("show");
	playBtn.addEventListener("click", () => {
		menu.classList.remove("show");
		modeMenu.classList.add("show");
		modeBtn.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const mode = e.target.dataset.mode;
				console.log(mode);

				modeMenu.classList.remove("show");
				game.classList.add("show");
				game.classList.add(`mode-${mode}`);
			});
		});
	});
});

window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		console.log(`PAUSE`);
	}
});

const changeFoodPosition = () => {
	foodX = Math.floor(Math.random() * 30) + 1;
	foodY = Math.floor(Math.random() * 30) + 1;
};
changeFoodPosition();

const gameInit = () => {
	if (gameOver) return gameOverHandle();

	if (snakeX === foodX && snakeY === foodY) {
		// Jika bertabrakan dengan posisi food
		changeFoodPosition(); // Membuat food baru di lokasi yang baru
		snakeBody.push([foodX, foodY]); // Menambahkan array food

		score++; // Poin bertambah 1
		highScore = score >= highScore ? score : highScore; // Nentuin nilai highscore

		localStorage.setItem("highscore", highScore); // Masukkin highscore ke localstorage

		displayScore.innerText = `Score: ${score}`;
		displayHighscore.innerText = `Highscore: ${highScore}`;
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

	let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;

	for (let i = 0; i < snakeBody.length; i++) {
		htmlMarkup += `<div class="snake-head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;

		if (
			i !== 0 &&
			snakeBody[0][1] === snakeBody[i][1] &&
			snakeBody[0][0] == snakeBody[i][0]
		) {
			gameOver = true;
		}
	}
	playground.innerHTML = htmlMarkup;
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
		changeDirection({ key: key.dataset.key });
	});
});

const gameOverHandle = () => {
	clearInterval(setIntervalId);

	const alertContain = document.createElement("section");
	alertContain.innerHTML = `
		<article class="alert-content">
			<h1 class="alert-title">YOU LOSE!!!</h1>
			<div class="btn-container">
				<button class="retry-btn">Retry</button>
				<button class="exit-btn">Exit</button>
			</div>
		</article>
	`;
	alertContain.classList.add("alert-container");
	document.body.appendChild(alertContain);

	const retryBtn = alertContain.querySelector(".retry-btn");
	const exitBtn = alertContain.querySelector(".exit-btn");
	exitBtn.addEventListener("click", () => {
		window.location.reload();
	});
};

setIntervalId = setInterval(gameInit, 125);
document.addEventListener("keydown", changeDirection);
