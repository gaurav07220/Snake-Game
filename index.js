// variable decalarations
let settingBtn = document.querySelector(".setting-btn");
let settingBox = document.querySelector(".setting-box");
let playBoard = document.querySelector(".play-board");
let scoreEl = document.querySelector(".score");
let highScoreEl = document.querySelector(".high-score");
let controls = document.querySelectorAll(".control-new i");
let setBtn = document.getElementById("set-btn");


let detailEl = document.getElementById("detail-color");
let boardEl = document.getElementById("board-color");
let speedEl = document.getElementById("speed");
let snakeEl = document.getElementById("snake-color");
let foodEl = document.getElementById("food-color");
let container = document.querySelector(".container");

// toggle the sitting box by clicking setting icon
settingBtn.addEventListener("click", (e) => {
  settingBox.classList.toggle("active");
});

// creating snake food and snake
let i;
let gameOver = false;
let snakebody = [];
let foodX = 13;
let foodY = 10;
let snakeX = 5;
let snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let setIntervalId;
let score = 0;
let speed = 125;
let highScore = localStorage.getItem("high-score") || 0;
highScoreEl.innerHTML = `High Score : ${highScore}`;
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30 + 1);
  foodY = Math.floor(Math.random() * 30 + 1);
  // alert(foodX)
};

// getting details from local-storage

if (localStorage.getItem("details") !== null) {
  const allDetails = JSON.parse(localStorage.getItem("details"));
  boardEl.value = allDetails.boardColor;
  detailEl.value = allDetails.detailColor;
  snakeEl.value = allDetails.snakeColor;
  foodEl.value = allDetails.foodColor;
  speedEl.value = allDetails.speed;
 

  container.style.backgroundColor = detailEl.value;
  playBoard.style.backgroundColor = boardEl.value;
  snakeEl.style.backgroundColor;
  speed = allDetails.speed;
}

const handleGameOver = () => {
  alert("game over");
  clearInterval(setIntervalId);
  location.reload();
};

const snakeDirection = (e) => {
  if (e.key == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

controls.forEach((item) => {
  item.addEventListener("click", () =>
    snakeDirection({ key: item.dataset.key })
  );
});

const snakeGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area : ${foodY}/${foodX}"></div>`;

  if (snakeX == foodX && snakeY == foodY) {
    updateFoodPosition();
    snakebody.push([foodX, foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreEl.innerHTML = `Score : ${score}`;
    highScoreEl.innerHTML = `High Score : ${highScore}`;
  }

  for (i = snakebody.length - 1; i > 0; i--) {
    snakebody[i] = snakebody[i - 1];
  }

  snakebody[0] = [snakeX, snakeY];
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (i = 0; i < snakebody.length; i++) {
    html += `<div class="snake" style="grid-area : ${snakebody[i][1]}/${snakebody[i][0]}"></div>`;

    if (
      i !== 0 &&
      snakebody[0][1] === snakebody[i][1] &&
      snakebody[0][0] === snakebody[i][0]
    ) {
      gameOver = true;
     
    }
  }
  playBoard.innerHTML = html;

  if (localStorage.getItem("details") !== null) {
    document.querySelector(".food").style.backgroundColor = foodEl.value;
    document.querySelector(".snake").style.backgroundColor = snakeEl.value;
  }
};
updateFoodPosition();
setIntervalId = setInterval(snakeGame, speed);

document.addEventListener("keydown", snakeDirection);

// code for set game setting  acording to user

setBtn.addEventListener("click", (e) => {
  const setData = {
    detailColor: detailEl.value,
    boardColor: boardEl.value,
    foodColor: foodEl.value,
    snakeColor: snakeEl.value,
    speed: speedEl.value,
    active: true,
  };
  localStorage.setItem("details", JSON.stringify(setData));

  settingBtn.click();
  location.reload();
});
