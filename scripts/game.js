document.addEventListener('DOMContentLoaded', () => {
  let board = ['', '', '', '', '', '', '', '', ''];
  let playerTime = 0;
  let symbols = ['o', 'x'];
  let gameOver = false;

  let winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.addEventListener('click', handleClick);
  });

  function handleClick(event) {
    let square = event.target;
    let position = square.id;

    if (handleMove(position)) {
      setTimeout(() => {
        alert('Game Over - The Winner is ' + symbols[playerTime]);
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
    }
  }

  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    playerTime = 0;
    gameOver = false;
    updateSquares();
  }

  function handleMove(position) {
    if (gameOver) {
      return;
    }

    if (board[position] == '') {
      board[position] = symbols[playerTime];

      gameOver = isWin();

      if (gameOver == false) {
        playerTime = playerTime == 0 ? 1 : 0;
      }
    }

    return gameOver;
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

  function isBoardFull() {
    return board.every((cell) => cell !== '');
  }
});
