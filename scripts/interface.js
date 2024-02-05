document.addEventListener('DOMContentLoaded', () => {
  let squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.addEventListener('click', handleClick);
  });
});

function handleClick(event) {
  let square = event.target;
  let position = square.id;

  if (handleMove(position)) {
    alert('Game Over - The Winner is ' + symbols[playerTime]);
    resetGameAndReload();
  } else if (isBoardFull()) {
    alert("Game Over - It's a Draw!");
    resetGameAndReload();
  }
  updateSquare(position);
}

function updateSquare(position) {
  let square = document.getElementById(position.toString());
  let symbol = board[position];
  square.innerHTML = `<div class='${symbol}'></div>`;
}

function resetGameAndReload() {
  resetGame();
  location.reload();
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  playerTime = 0;
  gameOver = false;
  updateSquares();
}

function updateSquares() {
  let squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    let position = square.id;
    let symbol = board[position];

    if (symbol != '') {
      square.innerHTML = `<div class='${symbol}'></div>`;
    }
  });
}

function isBoardFull() {
  return board.every((cell) => cell !== '') && !isWin();
}

function isWin() {
  for (let i = 0; i < winStates.length; i++) {
    let seq = winStates[i];

    let pos1 = seq[0];
    let pos2 = seq[1];
    let pos3 = seq[2];

    if (board[pos1] == board[pos2] && board[pos1] == board[pos3] && board[pos1] != '') {
      return true;
    }
  }

  return false;
}
