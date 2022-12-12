//Whac-a-mole GAME:

// || M O D E L:
const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const score = document.querySelector("#score");
const scoreParent = document.querySelector("#SpeedScoreContainer");
const leftTime = document.querySelector("#leftTime");
const leftTimeParent = document.querySelector("#leftTimeh3");
const timeSet = document.querySelector("#timeSet");
const setTimeBtn = document.querySelector("#submitBtn");
const playGame = document.querySelector("#playBtn");
const increaseSpeed = document.getElementById("increaseSpeed");
const decreaseSpeed = document.getElementById("decreaseSpeed");
const speed = document.getElementById("speed");

let result = 0;
let hitPosition = 0;
let time = 0;
let randomSquareTimer;
let countDownTimer;
let gameStart = false;
let gameOver = false;
let gameSpeed = 5;

function generateRandomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}

function countDown() {
  time--;
  leftTime.textContent = time;

  if (time === 0) {
    clearInterval(randomSquareTimer);
    clearInterval(countDownTimer);
    gameStart = false;
    gameOver = true;
    scoreParent.innerHTML = `
    <p class="gameOver">Game Over!</p>
    <p class="finalInfo">Your final Score is ${result}!</p>
    `;
    playGame.textContent = "Reload";
  }
}

// || C O N T R O L L E R:
playGame.addEventListener("click", () => {
  if (time && !gameStart && !gameOver) {
    gameStart = true;
    score.textContent = 0;
    result = 0;
    randomSquareTimer = setInterval(generateRandomSquare, gameSpeed * 100);
    countDownTimer = setInterval(countDown, 1000);
    playGame.textContent = "Restart";
  } else if (!time && !gameStart && !gameOver) {
    alert("Please, set Time Frame to play!");
  } else if (!time && !gameStart && gameOver) {
    location.reload();
  } else if (time && gameStart && !gameOver) {
    location.reload();
  }
});

setTimeBtn.addEventListener("click", () => {
  if (!gameStart && !gameOver) {
    let value = Number(timeSet.value);
    time = value;
    leftTime.textContent = time;
    timeSet.value = "";
  } else if (gameStart && !gameOver) {
    alert(
      "Sorry, you can't set new time during the Game\nPlease, first reload the page to start the Game over!"
    );
  } else if (!gameStart && gameOver) {
    alert("The Game is over!\nPlease, first hit 'play again' button!");
  }
});

increaseSpeed.addEventListener("click", () => {
    if (gameSpeed < 10 && !gameStart) {
      gameSpeed += 1;
      speed.textContent = gameSpeed;
      if (gameSpeed === 10) {
        speed.textContent = "max";
      }
    } else if  (gameStart) {
      alert("Please, set the speed before starting the Game!");
    } else if (gameSpeed === 1) {
      alert("The maximum Speed is already set!");
    }
  });

  decreaseSpeed.addEventListener("click", () => {
    if (gameSpeed > 1 && !gameStart) {
      gameSpeed -= 1;
      speed.textContent = gameSpeed;
      if (gameSpeed === 1) {
        speed.textContent = "min";
      }
    } else if  (gameStart) {
      alert("Please, set the speed before starting the Game!");
    } else if (gameSpeed === 1) {
      alert("The minimum Speed is already set!");
    }
  });

// || V I E W:
squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPosition && gameStart === true) {
      result++;
      score.textContent = result;
      hitPosition = 0;
    }
  });
});
