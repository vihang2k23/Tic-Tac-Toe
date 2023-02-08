const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 8],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initializeGame();
function initializeGame() {
  //   console.log("initializeGame");
  cells.forEach((cell) => {
    // console.log(cell, "celll----->");
    cell.addEventListener("click", cellClicked);
  });
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn `;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  //   console.log(cellIndex, "cellIndex");

  // When X 0r O win
  if (options[cellIndex] != "" || !running) {
    // console.log("running-------");
    return;
  }
  updateCell(this, cellIndex);
  //   changePlayer();
  checkWinner();
}
function updateCell(cell, index) {
  //   console.log(currentPlayer, "cell and index");
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  //   console.log(currentPlayer, "first");
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  //   console.log(currentPlayer, "first");

  statusText.textContent = `${currentPlayer}'s turn `;
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    console.log(condition, "condition");
    
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw !`;
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
