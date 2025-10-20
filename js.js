const images = [
  "img/cherry.png",
  "img/lemon.png",
  "img/grape.png",
  "img/watermelon.png",
  "img/star.png",
  "img/diamond.png"
];

let playerName = prompt("Введіть своє ім'я:");
if (!playerName || playerName.trim() === "") playerName = "Гравець";

const game = document.createElement("div");
game.id = "game";

const title = document.createElement("h1");
title.textContent = "Гра «Однорукий бандит»";

const name = document.createElement("p");
name.textContent = `Учасник: ${playerName}`;

const round = document.createElement("p");
round.id = "round";
round.textContent = "Ітерація: 1 з 3";

const slot = document.createElement("div");
slot.id = "slot";

const result = document.createElement("p");
result.className = "result";

const play = document.createElement("button");
play.textContent = "Крутити барабан";

const restart = document.createElement("button");
restart.textContent = "Почати знову";
restart.style.display = "none";

game.append(title, name, round, slot, result, play, restart);
document.body.appendChild(game);

let roundNum = 1;
let win = false;

function getRandomImages() {
  const grid = [];
  for (let i = 0; i < 3; i++) {
    const arr = [...images];
    arr.sort(() => Math.random() - 0.5);
    grid.push(arr.slice(0, 3));
  }
  return grid;
}

function playRound() {
  const grid = getRandomImages();
  slot.innerHTML = "";

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundImage = `url('${grid[row][col]}')`;
      slot.appendChild(cell);
    }
  } 

  const middleRow = [grid[0][1], grid[1][1], grid[2][1]];
  const names = middleRow.map(p => p.split("/").pop());
  if (names[0] === names[1] && names[1] === names[2]) {
    result.textContent = `Вітаємо, ${playerName}, Ви перемогли!`;
    win = true;
    endGame();
    return;
  }

  if (roundNum < 3) {
    roundNum++;
    round.textContent = `Ітерація: ${roundNum} з 3`;
  } else {
    result.textContent = `На жаль, ${playerName} програв, спробуйте ще раз!`;
    endGame();
  }
}

function endGame() {
  play.style.display = "none";
  restart.style.display = "inline-block";
}

play.onclick = playRound;
restart.onclick = () => location.reload();