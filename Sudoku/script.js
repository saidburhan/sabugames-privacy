
// State
let currentLevelIndex = 0;
let userGrid = Array(81).fill(0);
let initialGrid = Array(81).fill(0);
let solutionGrid = Array(81).fill(0); // Store computed solution
let selectedCellIndex = -1;
let isSolvedView = false; // Flag to block input during "Show Solution"

// Elements
const boardEl = document.getElementById('sudoku-board');
const levelDisplayEl = document.getElementById('level-display');
const modalEl = document.getElementById('completion-modal');
const nextLevelBtn = document.getElementById('next-level-btn');
const messageArea = document.getElementById('message-area');

// Init
function init() {
    loadLevel(currentLevelIndex);
    setupControls();
}

function loadLevel(index) {
    if (index >= GAME_LEVELS.length) {
        alert("Tüm bölümler tamamlandı! 1. Bölüme dönülüyor.");
        currentLevelIndex = 0;
        index = 0;
    }

    const levelString = GAME_LEVELS[index];
    userGrid = levelString.split('').map(c => parseInt(c));
    initialGrid = [...userGrid];

    // Compute solution immediately
    solutionGrid = [...initialGrid];
    if (!solveSudoku(solutionGrid)) {
        console.error("Unsolvable puzzle!");
    }

    levelDisplayEl.textContent = index + 1;
    selectedCellIndex = -1;
    modalEl.classList.add('hidden');

    renderBoard();
}

function renderBoard() {
    boardEl.innerHTML = '';

    userGrid.forEach((val, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (initialGrid[index] !== 0) {
            cell.classList.add('fixed');
            cell.textContent = val;
        } else {
            if (val !== 0) {
                cell.classList.add('user-filled');
                cell.textContent = val;
            }
        }

        if (index === selectedCellIndex && !isSolvedView) {
            cell.classList.add('selected');
        }

        if (selectedCellIndex !== -1 && val !== 0 && val === userGrid[selectedCellIndex] && !isSolvedView) {
            cell.classList.add('highlighted');
        }

        cell.addEventListener('click', () => {
            if (!isSolvedView) selectCell(index);
        });
        boardEl.appendChild(cell);
    });
}

function selectCell(index) {
    selectedCellIndex = index;
    renderBoard();
}

function setupControls() {
    // Numpad
    document.querySelectorAll('.num-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const num = parseInt(btn.dataset.num);
            inputNumber(num);
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (selectedCellIndex === -1 || isSolvedView) return;

        if (e.key >= '1' && e.key <= '9') {
            inputNumber(parseInt(e.key));
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            deleteNumber();
        } else if (e.key === 'ArrowUp') moveSelection(-9);
        else if (e.key === 'ArrowDown') moveSelection(9);
        else if (e.key === 'ArrowLeft') moveSelection(-1);
        else if (e.key === 'ArrowRight') moveSelection(1);
    });

    // Delete
    document.getElementById('btn-delete').addEventListener('click', deleteNumber);

    // Clear
    document.getElementById('btn-clear').addEventListener('click', () => {
        if (isSolvedView) return;
        if (confirm("Tahtayı temizlemek istediğinize emin misiniz?")) {
            userGrid = [...initialGrid];
            renderBoard();
        }
    });

    // Solve & Check
    document.getElementById('btn-solve').addEventListener('click', showSolution);
    document.getElementById('btn-check').addEventListener('click', checkBoard);

    // Next Level
    nextLevelBtn.addEventListener('click', () => {
        currentLevelIndex++;
        loadLevel(currentLevelIndex);
    });
}

function moveSelection(step) {
    const newIndex = selectedCellIndex + step;
    if (newIndex >= 0 && newIndex < 81) {
        selectedCellIndex = newIndex;
        renderBoard();
    }
}

function inputNumber(num) {
    if (selectedCellIndex === -1 || isSolvedView) return;

    // Cannot edit fixed cells
    if (initialGrid[selectedCellIndex] !== 0) {
        animateShake(selectedCellIndex);
        return;
    }

    userGrid[selectedCellIndex] = num;
    renderBoard();

    checkCompletion();
}

function deleteNumber() {
    if (selectedCellIndex === -1 || isSolvedView) return;
    if (initialGrid[selectedCellIndex] !== 0) return;

    userGrid[selectedCellIndex] = 0;
    renderBoard();
}

function animateShake(index) {
    const cells = boardEl.children;
    if (cells[index]) {
        cells[index].classList.remove('error-cell');
        void cells[index].offsetWidth; // trigger reflow
        cells[index].classList.add('error-cell');
    }
}

// New Features

function showSolution() {
    if (isSolvedView) return;

    const backupGrid = [...userGrid];

    userGrid = [...solutionGrid];
    isSolvedView = true;
    renderBoard();

    setTimeout(() => {
        userGrid = backupGrid;
        isSolvedView = false;
        renderBoard();
    }, 3000);
}

function checkBoard() {
    if (isSolvedView) return;

    const cells = boardEl.children;
    userGrid.forEach((val, index) => {
        // If it's a user entry (not fixed) and is not empty
        if (initialGrid[index] === 0 && val !== 0) {
            if (val === solutionGrid[index]) {
                cells[index].classList.add('correct-check');
            } else {
                cells[index].classList.add('incorrect-check');
            }
        }
    });

    setTimeout(() => {
        Array.from(cells).forEach(cell => {
            cell.classList.remove('correct-check', 'incorrect-check');
        });
    }, 1000);
}

// Validation Logic
function checkCompletion() {
    if (userGrid.includes(0)) return;

    // Strict check against computed solution
    let isCorrect = true;
    for (let i = 0; i < 81; i++) {
        if (userGrid[i] !== solutionGrid[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        setTimeout(() => {
            modalEl.classList.remove('hidden');
        }, 300);
    }
}

// Solver Algorithm (Backtracking)
function solveSudoku(grid) {
    for (let i = 0; i < 81; i++) {
        if (grid[i] === 0) {
            for (let num = 1; num <= 9; num++) {
                if (isValidMove(grid, i, num)) {
                    grid[i] = num;
                    if (solveSudoku(grid)) {
                        return true;
                    }
                    grid[i] = 0;
                }
            }
            return false;
        }
    }
    return true;
}

function isValidMove(grid, index, num) {
    const r = Math.floor(index / 9);
    const c = index % 9;

    // Row
    for (let i = 0; i < 9; i++) {
        if (grid[r * 9 + i] === num) return false;
    }
    // Col
    for (let i = 0; i < 9; i++) {
        if (grid[i * 9 + c] === num) return false;
    }
    // Box
    const startRow = Math.floor(r / 3) * 3;
    const startCol = Math.floor(c / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[(startRow + i) * 9 + (startCol + j)] === num) return false;
        }
    }
    return true;
}

// Start
init();
