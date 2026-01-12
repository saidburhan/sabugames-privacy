
const puzzleData = {
    rows: [
        [3, 3],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1],
        [1, 1],
        [1, 1, 1],
        [2, 1, 2]
    ],
    cols: [
        [2, 2],
        [1, 2, 1],
        [1, 1],
        [2, 2],
        [1, 1],
        [1, 2, 1],
        [2, 2]
    ]
};

class NonogramGame {
    constructor(data, containerId) {
        this.rows = data.rows;
        this.cols = data.cols;
        this.rowCount = this.rows.length;
        this.colCount = this.cols.length;
        this.container = document.getElementById(containerId);

        // 0: empty, 1: filled, 2: crossed
        this.grid = Array(this.rowCount).fill().map(() => Array(this.colCount).fill(0));

        this.isDragging = false;
        this.dragMode = null; // 'fill', 'cross', 'clear'
        this.currentTool = 'fill'; // 'fill' or 'cross'

        this.init();
    }

    init() {
        this.renderLayout();
        this.setupEventListeners();
    }

    renderLayout() {
        // Use CSS Grid for perfect alignment
        // Columns: 1 auto-sized column for Row Clues, then N equal columns for cells
        // Rows: 1 auto-sized row for Col Clues, then M equal rows for cells

        this.container.style.display = 'grid';
        this.container.style.gridTemplateColumns = `auto repeat(${this.colCount}, 40px)`;
        this.container.style.gridTemplateRows = `auto repeat(${this.rowCount}, 40px)`;
        this.container.style.gap = '2px';

        // 1. Top-Left Spacer
        const spacer = document.createElement('div');
        this.container.appendChild(spacer);

        // 2. Column Clues (Top Row)
        this.cols.forEach(colClues => {
            const cell = document.createElement('div');
            cell.className = 'clue-cell clue-col';
            colClues.forEach(num => {
                const span = document.createElement('span');
                span.textContent = num;
                cell.appendChild(span);
            });
            this.container.appendChild(cell);
        });

        // 3. Row Clues + Grid Cells
        for (let r = 0; r < this.rowCount; r++) {
            // Row Clue
            const clueCell = document.createElement('div');
            clueCell.className = 'clue-cell clue-row';
            this.rows[r].forEach(num => {
                const span = document.createElement('span');
                span.textContent = num;
                clueCell.appendChild(span);
            });
            this.container.appendChild(clueCell);

            // Grid Cells
            for (let c = 0; c < this.colCount; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = r;
                cell.dataset.col = c;

                // Add border styling for 5-block readability if needed, but 7x7 is small enough

                this.container.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        // Mouse Down (Start Drag)
        this.container.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('cell')) {
                e.preventDefault();
                this.isDragging = true;
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);
                this.handleCellInteraction(r, c, true);
            }
        });

        // Mouse Over (Drag)
        this.container.addEventListener('mouseover', (e) => {
            if (this.isDragging && e.target.classList.contains('cell')) {
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);
                this.handleCellInteraction(r, c, false);
            }
        });

        // Mouse Up (End Drag)
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.dragMode = null;
        });

        // Right Click (Toggle Cross)
        this.container.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            // Optional: Quick switch to cross mode behavior or just strict cross
        });

        // Touch support (basic)
        this.container.addEventListener('touchstart', (e) => {
            // Prevent scrolling
            if (e.target.classList.contains('cell')) e.preventDefault();
        }, { passive: false });
    }

    handleCellInteraction(r, c, isStart) {
        const currentVal = this.grid[r][c];

        if (isStart) {
            // Determine action based on Tool and current state
            if (this.currentTool === 'fill') {
                // If clicking a filled cell, mode is 'clear'. Else 'fill'.
                this.dragMode = (currentVal === 1) ? 'clear' : 'fill';
            } else if (this.currentTool === 'cross') {
                // If clicking a crossed cell, mode is 'clear'. Else 'cross'.
                this.dragMode = (currentVal === 2) ? 'clear' : 'cross';
            }
        }

        // Apply dragMode
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
        // Find cell by linear index or query
        // Since we are using grid order: (r * (cols+1)) + c + 1 + (cols+1) 
        // Wait, querying by dataset is safer
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

        // Check Rows
        for (let r = 0; r < this.rowCount; r++) {
            const rowLine = this.grid[r].map(v => v === 1 ? 1 : 0);
            if (!this.checkLine(rowLine, this.rows[r])) isCorrect = false;
        }

        // Check Cols
        for (let c = 0; c < this.colCount; c++) {
            const colLine = [];
            for (let r = 0; r < this.rowCount; r++) colLine.push(this.grid[r][c] === 1 ? 1 : 0);
            if (!this.checkLine(colLine, this.cols[c])) isCorrect = false;
        }

        return isCorrect;
    }

    checkLine(line, clues) {
        // Convert line [1, 0, 1, 1] to groups [1, 2]
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

        if (groups.length !== clues.length) return false;
        for (let i = 0; i < groups.length; i++) {
            if (groups[i] !== clues[i]) return false;
        }
        return true;
    }
}

// UI Controllers
document.addEventListener('DOMContentLoaded', () => {
    const game = new NonogramGame(puzzleData, 'game-container');

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

    document.getElementById('btn-check').addEventListener('click', () => {
        if (game.validate()) {
            document.getElementById('modal-overlay').classList.remove('hidden');
        } else {
            alert('Henüz doğru değil, devam et!');
        }
    });

    document.getElementById('btn-close-modal').addEventListener('click', () => {
        document.getElementById('modal-overlay').classList.add('hidden');
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeBtn.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
});
