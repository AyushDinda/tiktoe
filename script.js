const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill("");
let current = "X";
let over = false;

function winnerInfo() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i];
    cell.classList.toggle("x", board[i] === "X");
    cell.classList.toggle("o", board[i] === "O");
    cell.disabled = over || Boolean(board[i]);
  });
}

function setStatus(text, isWin = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle("win", isWin);
}

function play(index) {
  if (over || board[index]) return;

  board[index] = current;
  const win = winnerInfo();

  if (win) {
    over = true;
    win.line.forEach((i) => cells[i].classList.add("winner"));
    setStatus(`${win.player} wins!`, true);
  } else if (board.every(Boolean)) {
    over = true;
    setStatus("It's a draw.");
  } else {
    current = current === "X" ? "O" : "X";
    setStatus(`${current}'s turn`);
  }

  render();
}

function reset() {
  board = Array(9).fill("");
  current = "X";
  over = false;
  cells.forEach((cell) => cell.classList.remove("winner"));
  setStatus("X's turn");
  render();
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => play(Number(cell.dataset.index)));
});

resetBtn.addEventListener("click", reset);
render();
