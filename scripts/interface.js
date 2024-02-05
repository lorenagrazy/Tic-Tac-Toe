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
    setTimeout(() => {
      alert('Game Over - The Winner is ' + playerTime);
      askForRestart();
    }, 10);
  } else if (isBoardFull()) {
    setTimeout(() => {
      alert("Game Over - It's a Draw!");
      askForRestart();
    }, 10);
  }
  updateSquare(position);
}

function updateSquare(position) {
  let square = document.getElementById(position.toString());
  let symbol = board[position];
  square.innerHTML = `<div class='${symbol}'></div>`;
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

function askForRestart() {
  if (confirm('Do you want to play again?')) {
    resetGame();
    location.reload();
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  playerTime = 0;
  gameOver = false;
  updateSquares();
}

function isBoardFull() {
  return board.every((cell) => cell !== '');
}
