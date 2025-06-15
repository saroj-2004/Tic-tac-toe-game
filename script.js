
const moveSound = new Audio('sounds/move.mp3');
const winSound = new Audio('sounds/win.mp3');
const drawSound = new Audio('sounds/draw.wav'); 

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);
    moveSound.play();

    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        winSound.play();
        updateScore(currentPlayer);
    } else if (!board.includes("")) {
        status.textContent = "It's a draw!";
        gameActive = false;
        drawSound.play();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    for (let combo of winConditions) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.querySelector(`.cell[data-index='${a}']`).classList.add('win');
            document.querySelector(`.cell[data-index='${b}']`).classList.add('win');
            document.querySelector(`.cell[data-index='${c}']`).classList.add('win');
            return true;
        }
    }
    return false;
}

function updateScore(player) {
    if (player === "X") {
        scoreX++;
        scoreXEl.textContent = scoreX;
    } else {
        scoreO++;
        scoreOEl.textContent = scoreO;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O", "win");
    });
}

function showSection(id) {
    document.querySelectorAll('.page-section').forEach(div => {
        div.style.display = 'none';
    });
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
