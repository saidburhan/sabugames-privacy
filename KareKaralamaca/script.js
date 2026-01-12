
const levels = [
    // Level 1: 5x5 Square Frame
    {
        name: "Çerçeve",
        rows: [[5], [1, 1], [1, 1], [1, 1], [5]],
        cols: [[5], [1, 1], [1, 1], [1, 1], [5]]
    },
    // Level 2: 5x5 Plus Sign
    {
        name: "Artı",
        rows: [[1], [1], [5], [1], [1]],
        cols: [[1], [1], [5], [1], [1]]
    },
    // Level 3: 5x5 Letter H
    {
        name: "H Harfi",
        rows: [[1, 1], [1, 1], [5], [1, 1], [1, 1]],
        cols: [[5], [1], [1], [1], [5]]
    },
    // Level 4: 5x5 Stairs
    {
        name: "Merdiven",
        rows: [[1], [2], [3], [4], [5]],
        cols: [[5], [4], [3], [2], [1]]
    },
    // Level 5: 7x7 Boat
    {
        name: "Gemi",
        rows: [[1], [3], [5], [7], [1, 1], [5], []],
        cols: [[1, 1], [2, 1], [3, 1], [7], [3, 1], [2, 1], [1, 1]]
    },
    // Level 6: The Original 7x7
    {
        name: "Bulmaca 6",
        rows: [[3, 3], [1, 1, 1], [1, 1, 1], [1, 1], [1, 1], [1, 1, 1], [2, 1, 2]],
        cols: [[2, 2], [1, 2, 1], [1, 1], [2, 2], [1, 1], [1, 2, 1], [2, 2]]
    },
    // Level 7: 7x7 Smile
    {
        name: "Gülümse",
        rows: [[1, 1], [1, 1], [], [1, 1], [1, 1], [3], []],
        cols: [[2], [2, 1], [1, 1], [1], [1, 1], [2, 1], [2]]
    },
    // Level 8: 10x10 Space Invader (Simplified)
    {
        name: "Uzaylı",
        rows: [[1, 1], [3], [7], [1, 1, 1, 1], [1, 1, 1, 1], [9], [1, 1], [1, 1], [], []],
        cols: [[4, 1], [1, 2, 1], [2, 2, 1], [2, 3], [2, 1], [2, 1], [2, 3], [2, 2, 1], [1, 2, 1], [4, 1]]
    },
    // Level 9: 8x8 Heart
    {
        name: "Kalp",
        rows: [[], [2, 2], [4, 4], [8], [8], [6], [4], [2]],
        cols: [[2], [4], [6], [7], [7], [6], [4], [2]]
    },
    // Level 10: 10x10 Spiral (or Box in Box)
    {
        name: "Kutu Kutu",
        rows: [[10], [1, 1], [1, 1], [1, 1], [1, 6, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1], [10]],
        cols: [[10], [1, 1], [1, 1], [1, 1], [1, 6, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1], [10]]
    }
];

class NonogramGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.levelIndicator = document.getElementById('level-indicator');
        this.currentLevelIndex = 0;

        this.grid = [];
        this.isDragging = false;
        this.dragMode = null;
        this.currentTool = 'fill';

        this.init();
    }

    init() {
        this.loadLevel(0);
        this.setupEventListeners();
    }

    loadLevel(index) {
        if (index < 0 || index >= levels.length) return;

        this.currentLevelIndex = index;
        const level = levels[index];
        this.rows = level.rows;
        this.cols = level.cols;
        this.rowCount = this.rows.length;
        this.colCount = this.cols.length;

        this.levelIndicator.textContent = `Level ${index + 1} / ${levels.length}`; //  - ${level.name}

        // Reset grid: 0 empty, 1 filled, 2 crossed
        this.grid = Array(this.rowCount).fill().map(() => Array(this.colCount).fill(0));

        this.renderLayout();
    }

    renderLayout() {
        this.container.innerHTML = ''; // Clear previous

        this.container.style.display = 'grid';
        this.container.style.gridTemplateColumns = `auto repeat(${this.colCount}, 40px)`;
        this.container.style.gridTemplateRows = `auto repeat(${this.rowCount}, 40px)`;
        // Gap removed in CSS

        // 1. Spacer
        const spacer = document.createElement('div');
        this.container.appendChild(spacer);

        // 2. Col Clues
        this.cols.forEach(colClues => {
            const cell = document.createElement('div');
            cell.className = 'clue-cell clue-col';
            colClues.forEach(num => {
                // If 0 (empty line), don't show text or show 0? Usually blank
                if (num > 0) {
                    const span = document.createElement('span');
                    span.textContent = num;
                    cell.appendChild(span);
                }
            });
            this.container.appendChild(cell);
        });

        // 3. Row Clues + Cells
        for (let r = 0; r < this.rowCount; r++) {
            const clueCell = document.createElement('div');
            clueCell.className = 'clue-cell clue-row';
            this.rows[r].forEach(num => {
                if (num > 0) {
                    const span = document.createElement('span');
                    span.textContent = num;
                    clueCell.appendChild(span);
                }
            });
            this.container.appendChild(clueCell);

            for (let c = 0; c < this.colCount; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                this.container.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        // Mouse Events
        this.container.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('cell')) {
                e.preventDefault();
                this.isDragging = true;
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);
                this.handleCellInteraction(r, c, true);
            }
        });

        this.container.addEventListener('mouseover', (e) => {
            if (this.isDragging && e.target.classList.contains('cell')) {
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);
                this.handleCellInteraction(r, c, false);
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.dragMode = null;
        });

        // Touch Events
        this.container.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('cell')) {
                // Prevent scrolling when touching the grid
                e.preventDefault();
                this.isDragging = true;
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);
                this.handleCellInteraction(r, c, true);
            }
        }, { passive: false });

        this.container.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                // Prevent scrolling
                e.preventDefault();

                // Get the element under the finger
                const touch = e.touches[0];
                const target = document.elementFromPoint(touch.clientX, touch.clientY);

                if (target && target.classList.contains('cell')) {
                    const r = parseInt(target.dataset.row);
                    const c = parseInt(target.dataset.col);
                    this.handleCellInteraction(r, c, false);
                }
            }
        }, { passive: false });

        document.addEventListener('touchend', () => {
            this.isDragging = false;
            this.dragMode = null;
        });

        // Prevent context menu on grid
        this.container.addEventListener('contextmenu', e => e.preventDefault());
    }

    handleCellInteraction(r, c, isStart) {
        const currentVal = this.grid[r][c];

        if (isStart) {
            if (this.currentTool === 'fill') {
                this.dragMode = (currentVal === 1) ? 'clear' : 'fill';
            } else if (this.currentTool === 'cross') {
                this.dragMode = (currentVal === 2) ? 'clear' : 'cross';
            }
        }

        let newVal = currentVal;
        if (this.dragMode === 'fill') newVal = 1;
        else if (this.dragMode === 'cross') newVal = 2;
        else if (this.dragMode === 'clear') newVal = 0;

        if (this.grid[r][c] !== newVal) {
            this.grid[r][c] = newVal;
            this.updateCellVisual(r, c);
        }
    }

    updateCellVisual(r, c) {
        const cell = this.container.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
        if (!cell) return;
        cell.classList.remove('filled', 'crossed');
        if (this.grid[r][c] === 1) cell.classList.add('filled');
        if (this.grid[r][c] === 2) cell.classList.add('crossed');
    }

    reset() {
        this.grid = this.grid.map(row => row.map(() => 0));
        const cells = this.container.querySelectorAll('.cell');
        cells.forEach(c => c.classList.remove('filled', 'crossed'));
    }

    validate() {
        let isCorrect = true;
        for (let r = 0; r < this.rowCount; r++) {
            const rowLine = this.grid[r].map(v => v === 1 ? 1 : 0);
            if (!this.checkLine(rowLine, this.rows[r])) isCorrect = false;
        }
        for (let c = 0; c < this.colCount; c++) {
            const colLine = [];
            for (let r = 0; r < this.rowCount; r++) colLine.push(this.grid[r][c] === 1 ? 1 : 0);
            if (!this.checkLine(colLine, this.cols[c])) isCorrect = false;
        }
        return isCorrect;
    }

    checkLine(line, clues) {
        // Filter out 0 clues (empty lines)
        const activeClues = clues.filter(c => c > 0);

        const groups = [];
        let count = 0;
        for (let v of line) {
            if (v === 1) count++;
            else if (count > 0) {
                groups.push(count);
                count = 0;
            }
        }
        if (count > 0) groups.push(count);

        if (groups.length !== activeClues.length) return false;
        for (let i = 0; i < groups.length; i++) {
            if (groups[i] !== activeClues[i]) return false;
        }
        return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new NonogramGame('game-container');

    // Controls
    const btnFill = document.getElementById('tool-fill');
    const btnCross = document.getElementById('tool-cross');

    btnFill.addEventListener('click', () => {
        game.currentTool = 'fill';
        btnFill.classList.add('active');
        btnCross.classList.remove('active');
    });

    btnCross.addEventListener('click', () => {
        game.currentTool = 'cross';
        btnCross.classList.add('active');
        btnFill.classList.remove('active');
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        if (confirm('Tahtayı temizlemek istediğine emin misin?')) {
            game.reset();
        }
    });

    const modalOverlay = document.getElementById('modal-overlay');
    const nextLevelBtn = document.getElementById('btn-next-level');

    document.getElementById('btn-check').addEventListener('click', () => {
        if (game.validate()) {
            triggerConfetti();
            modalOverlay.classList.remove('hidden');

            // Check if final level
            if (game.currentLevelIndex >= levels.length - 1) {
                nextLevelBtn.style.display = 'none';
                document.querySelector('.modal h2').textContent = 'Oyun Bitti!';
                document.querySelector('.modal p').textContent = 'Tüm levelleri tamamladın!';
            } else {
                nextLevelBtn.style.display = 'inline-flex';
                document.querySelector('.modal h2').textContent = 'Tebrikler!';
                document.querySelector('.modal p').textContent = 'Bulmacayı başarıyla tamamladın.';
            }
        } else {
            alert('Henüz doğru değil, hataları kontrol et!');
        }
    });

    document.getElementById('btn-close-modal').addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });

    nextLevelBtn.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
        game.loadLevel(game.currentLevelIndex + 1);
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeBtn.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
});

function triggerConfetti() {
    if (typeof confetti === 'function') {
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#6366f1', '#ef4444', '#22c55e'] // Use game colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#6366f1', '#ef4444', '#22c55e']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}
