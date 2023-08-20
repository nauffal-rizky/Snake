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

const changeFoodPosition = () => {
	foodX = Math.floor(Math.random() * 30) + 1;
	foodY = Math.floor(Math.random() * 30) + 1;
};

const gameInit = () => {
	if (gameOver) return gameOverHandle();
	let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;

	if (snakeX === foodX && snakeY === foodY) {
		changeFoodPosition();
		snakeBody.push([foodX, foodY]);

		score++;
		highScore = score >= highScore ? score : highScore;

		localStorage.setItem("highscore", highScore);
		console.log(highScore);

		displayScore.innerText = `Score: ${score}`;
		displayHighscore.innerText = `Highscore: ${highScore}`;
	}

	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}

	snakeBody[0] = [snakeX, snakeY]; // First element

	snakeX += velocityX;
	snakeY += velocityY;

	/* No wall gameplay 
    if (snakeX < 1) {
      snakeX = 30;
    } else if (snakeY < 1) {
      snakeY = 30;
    } else if (snakeX > 30) {
      snakeX = 1;
    } else if (snakeY > 30) {
      snakeY = 1;
    }
  */

	/* with wall gameplay */
	if (snakeX <= 0 || snakeY <= 0 || snakeX > 30 || snakeY > 30) {
		gameOver = true;
	}

	// console.log(`X: ${snakeX}, Y: ${snakeY}`);

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
	alert(`YOU LOSE!!!`);
	window.location.reload();
};

changeFoodPosition();
setIntervalId = setInterval(gameInit, 125);
document.addEventListener("keydown", changeDirection);
