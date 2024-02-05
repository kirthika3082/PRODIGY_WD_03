const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    updateCell(index);
    checkWinner();
    togglePlayer();
  }
}

function updateCell(index) {
  const cell = document.getElementsByClassName('cell')[index];
  cell.innerText = board[index];
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      highlightWinnerCells(combination);
      alert(`Player ${currentPlayer} wins!`);
      break;
    }
  }

  if (!board.includes('') && gameActive) {
    gameActive = false;
    alert('It\'s a draw!');
  }
}

function highlightWinnerCells(combination) {
  combination.forEach(index => {
    const cell = document.getElementsByClassName('cell')[index];
    cell.classList.add('winner-cell');
  });
}



function restartGame() {
  board.fill('');
  currentPlayer = 'X';
  gameActive = true;


  const cells = document.getElementsByClassName('cell');
  for (const cell of cells) {
    cell.innerText = '';
    cell.classList.remove('winner-cell');
  }
}
