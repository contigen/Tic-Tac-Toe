`use strict`;
let circleTurn = true;
const CIRCLE_CLASS = `circle`;
const CROSS_CLASS = `cross`;
const WINNING_COMBINATIONS = [
  [0, 1, 2], // horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonal
  [2, 4, 6],
];
const message = document.getElementById(`message`);
const boardCells = document.querySelectorAll(`.cell`);
const restartButton = document.getElementById(`restart`);
const currentPlayer = document.getElementById(`player`);
restartButton.onclick = restartGame;
boardCells.forEach((item) =>
  item.addEventListener(`click`, clickCell, { once: true })
);
function clickCell(ev) {
  let clickedCell = ev.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
  const player = circleTurn ? `O` : `X`;
  setClass(clickedCell, currentClass);
  // check if there's a draw
  let isADraw = Array.from(boardCells).every((item) => {
    return (
      item.classList.contains(CIRCLE_CLASS) ||
      item.classList.contains(CROSS_CLASS)
    );
  });
  // to swap classes
  circleTurn = !circleTurn;
  if (checkForWin(currentClass)) {
    endGame(player);
  } else if (isADraw) {
    drawGame();
  }
}
function setClass(cell, whatClass) {
  cell.classList.add(whatClass);
}
function checkForWin(whatClass) {
  return WINNING_COMBINATIONS.some((combo) => {
    return combo.every((index) => {
      return boardCells[index].classList.contains(whatClass);
    });
  });
}
function restartGame() {
  // reset className to original class
  boardCells.forEach((item) => (item.className = `cell`));
  // re-assign function
  boardCells.forEach((item) =>
    item.addEventListener(`click`, clickCell, { once: true })
  );
  message.innerHTML = `&nbsp;`;
}
function drawGame() {
  message.innerText = `A Draw Game!`;
}
function endGame(player) {
  message.innerText = `Player ${player} wins!`;
  boardCells.forEach((item) => item.classList.add(`unclickable`));
}