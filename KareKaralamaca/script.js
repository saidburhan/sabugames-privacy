const levels = [
    // Level 1: 5x5 Frame (Dolu Çerçeve)
    {
        name: "Çerçeve",
        rows: [[5], [1, 1], [1, 1], [1, 1], [5]],
        cols: [[5], [1, 1], [1, 1], [1, 1], [5]]
    },
    // Level 2: 5x5 Plus (Artı)
    {
        name: "Artı",
        rows: [[1], [1], [5], [1], [1]],
        cols: [[1], [1], [5], [1], [1]]
    },
    // Level 3: 5x5 H Letter (H Harfi)
    {
        name: "H Harfi",
        rows: [[1, 1], [1, 1], [5], [1, 1], [1, 1]],
        cols: [[5], [1], [1], [1], [5]]
    },
    // Level 4: 5x5 Checkerboard (Dama)
    {
        name: "Dama",
        rows: [[1, 1, 1], [1, 1], [1, 1, 1], [1, 1], [1, 1, 1]],
        cols: [[1, 1, 1], [1, 1], [1, 1, 1], [1, 1], [1, 1, 1]]
    },
    // Level 5: 5x5 Hourglass (Kum Saati) - FIXED
    // Pattern:
    // ##### (5)
    // .###. (3)
    // ..#.. (1)
    // .###. (3)
    // ##### (5)
    {
        name: "Kum Saati",
        rows: [[5], [3], [1], [3], [5]],
        cols: [[1, 1], [2, 2], [5], [2, 2], [1, 1]]
    },
    // Level 6: 6x6 Stairs 
    {
        name: "Merdiven 6",
        rows: [[1], [2], [3], [4], [5], [6]],
        cols: [[6], [5], [4], [3], [2], [1]]
    },
    // Level 7: 6x6 Box in Box
    {
        name: "Kutu Kutu",
        rows: [[6], [1, 1], [1, 2, 1], [1, 2, 1], [1, 1], [6]],
        cols: [[6], [1, 1], [1, 2, 1], [1, 2, 1], [1, 1], [6]]
    },
    // Level 8: 7x7 Grid
    {
        name: "Izgara",
        rows: [[7], [1, 1, 1, 1], [7], [1, 1, 1, 1], [7], [1, 1, 1, 1], [7]],
        cols: [[7], [1, 1, 1, 1], [7], [1, 1, 1, 1], [7], [1, 1, 1, 1], [7]]
    },
    // Level 9: 8x8 Diamond
    {
        name: "Elmas",
        rows: [[2], [4], [6], [8], [8], [6], [4], [2]],
        cols: [[2], [4], [6], [8], [8], [6], [4], [2]]
    },
    // Level 10: 8x8 Target (Hedef) - Verified
    {
        name: "Hedef",
        rows: [[8], [1, 1], [1, 4, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 4, 1], [1, 1], [8]],
        cols: [[8], [1, 1], [1, 4, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 4, 1], [1, 1], [8]]
    },

    // Level 11: 6x6 Complex (Gizemli Kutu)
    // Level 11: 6x6 Butterfly (Kelebek) - Verified
    {
        name: "Surat",
        rows: [[9], [1, 1], [1, 2, 2, 1], [1, 2, 2, 1], [1, 1], [1, 1], [1, , 5, 1], [1, 1], [9]],
        cols: [[9], [1, 1], [1, 2, 1, 1], [1, 2, 1, 1], [1, 1, 1], [1, 2, 1, 1], [1, 2, 1, 1], [1, 1], [9]]
    },

    // Level 12: 9x9 Lightning (Yıldırım) - Verified
    {
        name: "Yıldırım",
        rows: [[3, 1, 3], [1, 1, 1], [1, 5, 1], [5], [4, 4], [5], [1, 5, 1], [1, 1, 1], [3, 1, 3]],
        cols: [[3, 1, 3], [1, 1, 1], [1, 5, 1], [5], [4, 4], [5], [1, 5, 1], [1, 1, 1], [3, 1, 3]]
    },

    // Level 13: 10x10 Bow Tie (Papyon) - Verified
    {
        name: "Papyon",
        rows: [[1, 1], [2, 2], [3, 3], [4, 4], [10], [10], [4, 4], [3, 3], [2, 2], [1, 1]],
        cols: [[10], [8], [6], [4], [2], [2], [4], [6], [8], [10]]
    },
    // Level 14: 10x10 random
    {
        name: "random",
        rows: [[2, 1, 2, 1], [3, 2, 2], [2, 1, 2], [1, 2, 1], [4, 5], [1, 3, 3], [3, 3, 1], [7, 1], [1, 1, 1, 2], [2, 2, 2]],
        cols: [[1, 2, 2], [2, 2, 2, 1], [2, 6], [3, 4], [1, 1, 3], [2, 2, 2, 1], [3, 1, 3], [4, 2], [2, 2, 1], [3, 4]]
    },
    // Level 15: 10x10 Random A
    {
        name: "Rastgele A",
        rows: [[1, 3, 4], [1, 1, 2], [1, 8], [3, 2, 3], [1, 2], [4, 5], [1, 1, 1, 1], [2, 3, 1], [2, 4, 2], [5]],
        cols: [[7, 2], [1, 1, 2], [1, 2, 1, 1, 1], [1, 1, 5], [5, 2], [7], [1, 1, 1, 2], [1, 2, 1, 1], [4, 1, 1], [4, 4]]
    },
    // Level 16: 10x10 Random B
    {
        name: "Rastgele B",
        rows: [[3, 3], [1, 2, 2], [1, 1, 2, 1, 1], [3, 3, 1], [1, 3, 1], [2, 1], [3, 4], [2, 3], [6, 2], [8]],
        cols: [[1, 4, 2], [1, 1, 5], [4, 1, 2], [1, 4], [2, 1, 3], [5, 3], [1, 1, 1, 1], [1, 5, 2], [1, 1, 2], [3, 1]]
    },
    // Level 17: 10x10 Random C
    {
        name: "Rastgele C",
        rows: [[4, 1, 1], [5, 2], [1, 2, 1, 1], [1, 1, 1, 1], [1, 2, 1], [3, 2, 1, 1], [3, 3], [2, 3], [3], [5, 1]],
        cols: [[1, 2, 1, 1], [1, 2, 1], [7, 2], [3, 2, 1], [1, 2, 1, 1], [1, 3, 1], [4, 1, 1], [3], [3, 1, 1], [2, 2, 1]]
    },
    // Level 18: 10x10 Random D
    {
        name: "Rastgele D",
        rows: [[1, 1, 1, 1, 1], [2, 1, 1, 1], [3, 3, 1], [1, 1, 1], [1, 1, 1, 3], [1, 1, 1], [1, 1, 4], [1, 1], [5, 1], [1, 2, 1, 1]],
        cols: [[6, 3], [2, 1, 1], [1, 1, 1, 2], [1, 1, 2], [1, 2, 2], [2, 1], [1, 5], [2, 1, 1], [1, 1, 1, 1], [2, 1, 1]]
    },
    // Level 19: 10x10 Random E
    {
        name: "Rastgele E",
        rows: [[3, 1], [4, 3], [1, 3], [1, 4], [1, 1, 3], [1, 1, 1], [5, 1], [2, 1, 3], [1], [4, 2]],
        cols: [[2, 1, 1], [3, 4, 1], [2, 1, 1], [1, 2, 1, 2], [1, 1, 1], [1, 2, 3], [3], [2, 1, 1], [1, 4, 1], [1, 1, 1]]
    },
    // Level 20: 10x10 Random F
    {
        name: "Rastgele F",
        rows: [[8], [2, 1, 3], [2, 1], [4, 1, 1], [1], [3, 1, 4], [1, 1, 1, 1], [1, 1, 1], [4, 3], [2, 1, 1, 1]],
        cols: [[2, 1, 2], [4, 2, 2], [1, 1, 1, 2], [1, 1, 2], [7], [1, 3], [1, 1, 1, 1], [2, 2, 1], [2, 1, 1, 1, 1], [1, 2]]
    },
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

        // Initialize Sound Manager
        this.soundManager = new SoundManager();

        this.init();
    }

    init() {
        // Load saved level or default to 0
        const savedLevel = localStorage.getItem('kareKaralamaca_level');
        const startLevel = savedLevel ? parseInt(savedLevel) : 0;
        this.loadLevel(startLevel);
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

        this.levelIndicator.textContent = `Level ${index + 1} / ${levels.length}`;

        // Reset grid: 0 empty, 1 filled
        this.grid = Array(this.rowCount).fill().map(() => Array(this.colCount).fill(0));

        this.renderLayout();
    }

    renderLayout() {
        this.container.innerHTML = '';

        // Use CSS variables for responsive grid
        this.container.style.display = 'grid';
        this.container.style.setProperty('--col-count', this.colCount);
        this.container.style.setProperty('--row-count', this.rowCount);

        // 1. Spacer
        const spacer = document.createElement('div');
        this.container.appendChild(spacer);

        // 2. Col Clues
        this.cols.forEach(colClues => {
            const cell = document.createElement('div');
            cell.className = 'clue-cell clue-col';

            let hasClue = false;
            colClues.forEach(num => {
                if (num > 0) {
                    const span = document.createElement('span');
                    span.textContent = num;
                    cell.appendChild(span);
                    hasClue = true;
                }
            });

            if (!hasClue) {
                const span = document.createElement('span');
                span.textContent = '0';
                cell.appendChild(span);
            }
            this.container.appendChild(cell);
        });

        // 3. Row Clues + Cells
        for (let r = 0; r < this.rowCount; r++) {
            const clueCell = document.createElement('div');
            clueCell.className = 'clue-cell clue-row';

            let hasClue = false;
            this.rows[r].forEach(num => {
                if (num > 0) {
                    const span = document.createElement('span');
                    span.textContent = num;
                    clueCell.appendChild(span);
                    hasClue = true;
                }
            });

            if (!hasClue) {
                const span = document.createElement('span');
                span.textContent = '0';
                clueCell.appendChild(span);
            }
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
        // Prevent context menu on grid globally
        this.container.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        });

        // Mouse Events
        this.container.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('cell')) {
                // e.button: 0 (Left), 2 (Right)
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);

                let intention = 'fill';
                // Mouse logic: Right click always 'empty', Left click follows tool
                if (e.button === 2) {
                    intention = 'empty';
                } else if (e.button === 0) {
                    intention = this.currentTool; // 'fill' or 'empty'
                } else {
                    return; // Ignore middle click
                }

                this.isDragging = true;
                this.handleCellInteraction(r, c, true, intention);
            }
        });

        this.container.addEventListener('mouseover', (e) => {
            if (this.isDragging && e.target.classList.contains('cell')) {
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);
                this.handleCellInteraction(r, c, false); // Drag mode is already set
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.dragMode = null;
        });

        // Touch Events
        this.container.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('cell')) {
                e.preventDefault(); // Stop scroll
                this.isDragging = true;
                const r = parseInt(e.target.dataset.row);
                const c = parseInt(e.target.dataset.col);
                // Touch always uses currentTool
                this.handleCellInteraction(r, c, true, this.currentTool);
            }
        }, { passive: false });

        this.container.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                e.preventDefault();
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
    }

    handleCellInteraction(r, c, isStart, intention) {
        const currentVal = this.grid[r][c]; // 0:Empty, 1:Filled, 2:Crossed

        if (isStart) {
            // Determine dragMode based on start cell and intention
            if (intention === 'fill') {
                if (currentVal === 1) this.dragMode = 'erase';      // 1 -> 0
                else if (currentVal === 0) this.dragMode = 'fill';  // 0 -> 1
                else this.dragMode = 'none';                        // 2 -> Protected (Can't fill on lock)
            } else if (intention === 'empty') {
                if (currentVal === 2) this.dragMode = 'unlock';     // 2 -> 0
                else if (currentVal === 0) this.dragMode = 'lock';  // 0 -> 2
                else this.dragMode = 'none';                        // 1 -> Protected (Safe)
            }
        }

        if (!this.dragMode || this.dragMode === 'none') return;

        let newVal = currentVal;

        // Apply Drag Mode
        if (this.dragMode === 'fill') {
            if (currentVal === 0) newVal = 1;
        } else if (this.dragMode === 'erase') {
            if (currentVal === 1) newVal = 0;
        } else if (this.dragMode === 'lock') {
            if (currentVal === 0) newVal = 2;
        } else if (this.dragMode === 'unlock') {
            if (currentVal === 2) newVal = 0;
        }

        if (this.grid[r][c] !== newVal) {
            this.grid[r][c] = newVal;
            this.updateCellVisual(r, c);

            // Play Sound
            if (newVal === 1) this.soundManager.playPop();
            else if (newVal === 0) this.soundManager.playErase();
            else if (newVal === 2) this.soundManager.playClick();
        }
    }

    updateCellVisual(r, c) {
        const cell = this.container.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
        if (!cell) return;
        cell.classList.remove('filled', 'crossed');
        if (this.grid[r][c] === 1) cell.classList.add('filled');
        if (this.grid[r][c] === 2) cell.classList.add('crossed');
    }

    autoSolve() {
        // Backtracking solver
        const self = this;
        const R = this.rowCount;
        const C = this.colCount;

        function checkLine(line, clues) {
            let groups = [];
            let count = 0;
            for (let val of line) {
                if (val === 1) count++;
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

        // Helper to check partial validity
        function isValidSoFar() {
            // Check formatted rows/cols? 
            // Full checking is expensive.
            // Simplified: we solve it offline or just brute force small boards.
            // Since these are small 5x5 to 15x15, we can try a smart approach or just fill the intended pattern if known.
            // But we don't store pattern.
            // Let's implement a visual solver for small boards, but for 15x15 pure brute force might hang browser.
            // Strategy: Since I wrote the levels, I know they are valid.
            // To make this robust without crashing:
            // Let's just solve it row by row satisfying row clues, then check cols? No, that fails.

            // For this specific request, I will cheat slightly for performance:
            // Most levels are simple.
            // Let's try to verify row/col constraints.
            return true;
        }

        // ACTUAL SOLVER (Simple recursive with pruning)
        // Note: For 15x15 this might be slow in JS if not optimized.
        // A better way for "Show Solution" in a dev tool is to just know the answer.
        // Since I don't have the answer stored, I'll write a solver.

        // Optimization: Solve line by line?
        // Let's try a very basic "try to fill" approach.
        // If it's too slow (e.g. level 20), we might need the solution stored in data.
        // But let's try.

        // Actually, for instant feedback, let's just use the `checkLine` logic to brute force column by column?
        // Too complex for quick patch.

        // NEW PLAN: Since I defined the levels, I can also add a 'solution' property to them?
        // No, user wants it now.
        // I will implement a "Greedy + Backtrack" solver.

        let tempGrid = Array(R).fill().map(() => Array(C).fill(0));

        function solve(idx) {
            if (idx >= R * C) return true; // Solved

            const r = Math.floor(idx / C);
            const c = idx % C;

            // Try 1 (Fill)
            tempGrid[r][c] = 1;
            if (promising(r, c)) {
                if (solve(idx + 1)) return true;
            }

            // Try 0 (Empty)
            tempGrid[r][c] = 0;
            if (promising(r, c)) {
                if (solve(idx + 1)) return true;
            }

            return false;
        }

        function promising(r, c) {
            // Check row if complete
            if (c === C - 1) {
                if (!checkLine(tempGrid[r], self.rows[r])) return false;
            }
            // Check col if complete
            if (r === R - 1) {
                const col = [];
                for (let i = 0; i < R; i++) col.push(tempGrid[i][c]);
                if (!checkLine(col, self.cols[c])) return false;
            }
            return true;
        }

        this.container.style.opacity = '0.5';
        setTimeout(() => {
            if (solve(0)) {
                this.grid = tempGrid;
                // Render
                for (let r = 0; r < R; r++) {
                    for (let c = 0; c < C; c++) {
                        this.updateCellVisual(r, c);
                    }
                }
                this.soundManager.playWin();
            } else {
                alert("Çözüm bulunamadı (veya çok zor)!");
            }
            this.container.style.opacity = '1';
        }, 10);
    }

    reset() {
        this.grid = this.grid.map(row => row.map(() => 0));
        const cells = this.container.querySelectorAll('.cell');
        cells.forEach(c => c.classList.remove('filled', 'crossed'));
        this.soundManager.playErase(); // Sound for reset
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

class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3; // Volume control
        this.masterGain.connect(this.ctx.destination);
    }

    playTone(freq, type, duration, startTime = 0) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
    }

    playPop() {
        // High pitched sine pop for filling
        this.playTone(600, 'sine', 0.1);
    }

    playClick() {
        // Wooden click for crossing
        this.playTone(300, 'triangle', 0.05);
    }

    playErase() {
        // Soft low erasing sound
        this.playTone(150, 'sine', 0.1);
    }

    playWin() {
        // A major arpeggio
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
        notes.forEach((freq, i) => {
            this.playTone(freq, 'sine', 0.2, i * 0.1);
        });
        // Harmony
        setTimeout(() => this.playTone(523.25, 'triangle', 0.4), 0);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new NonogramGame('game-container');

    // Controls
    const btnFill = document.getElementById('tool-fill');
    const btnEmpty = document.getElementById('tool-empty');

    function updateTools(mode) {
        game.currentTool = mode;
        btnFill.classList.toggle('active', mode === 'fill');
        btnEmpty.classList.toggle('active', mode === 'empty');
    }

    btnFill.addEventListener('click', () => updateTools('fill'));
    btnEmpty.addEventListener('click', () => updateTools('empty'));

    document.getElementById('btn-reset').addEventListener('click', () => {
        showGenericModal('warning', 'Temizle', 'Tahtayı temizlemek istediğine emin misin?', () => {
            game.reset();
        });
    });

    const modalOverlay = document.getElementById('modal-overlay');
    const nextLevelBtn = document.getElementById('btn-next-level');

    document.getElementById('btn-check').addEventListener('click', () => {
        if (game.validate()) {
            triggerConfetti();
            game.soundManager.playWin(); // Play win sound
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
            showGenericModal('error', 'Hatalı!', 'Maalesef henüz çözüm doğru değil. Kontrol edip tekrar dene.');
        }
    });

    document.getElementById('btn-close-modal').addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });

    nextLevelBtn.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
        const nextIdx = game.currentLevelIndex + 1;
        game.loadLevel(nextIdx);
        // Save Progress
        localStorage.setItem('kareKaralamaca_level', nextIdx);
    });

    // Baştan Başla (Restart All) Button
    if (document.getElementById('btn-restart-all')) {
        document.getElementById('btn-restart-all').addEventListener('click', () => {
            showGenericModal('warning', 'Baştan Başla', 'Tüm ilerlemen sıfırlanacak ve Level 1\'e döneceksin. Emin misin?', () => {
                localStorage.removeItem('kareKaralamaca_level');
                game.loadLevel(0);
            });
        });
    }

    // Modal Utility
    function showGenericModal(type, title, message, onConfirm) {
        const overlay = document.getElementById('generic-modal-overlay');
        const iconContainer = document.getElementById('generic-modal-icon');
        const titleEl = document.getElementById('generic-modal-title');
        const msgEl = document.getElementById('generic-modal-message');
        const actionsEl = document.getElementById('generic-modal-actions');

        // Reset classes
        iconContainer.className = 'modal-icon ' + type;

        // Set Icon
        let iconHtml = '';
        if (type === 'warning') iconHtml = '<i class="fas fa-exclamation-triangle"></i>';
        else if (type === 'error') iconHtml = '<i class="fas fa-times-circle"></i>';
        else iconHtml = '<i class="fas fa-info-circle"></i>';

        iconContainer.innerHTML = iconHtml;
        titleEl.textContent = title;
        msgEl.textContent = message;

        // Build Buttons
        actionsEl.innerHTML = '';
        const closeBtn = document.createElement('button');
        closeBtn.className = 'action-btn secondary';
        closeBtn.textContent = onConfirm ? 'Vazgeç' : 'Kapat';
        closeBtn.onclick = () => overlay.classList.add('hidden');
        actionsEl.appendChild(closeBtn);

        if (onConfirm) {
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'action-btn primary';
            confirmBtn.textContent = 'Evet';
            confirmBtn.onclick = () => {
                overlay.classList.add('hidden');
                onConfirm();
            };
            actionsEl.appendChild(confirmBtn);
        }

        overlay.classList.remove('hidden');
    }

    // Help Modal
    const helpBtn = document.getElementById('btn-help');
    const helpModal = document.getElementById('help-modal-overlay');
    const closeHelpBtn = document.getElementById('btn-close-help');

    helpBtn.addEventListener('click', () => {
        helpModal.classList.remove('hidden');
    });

    closeHelpBtn.addEventListener('click', () => {
        helpModal.classList.add('hidden');
    });

    // Close help modal on outside click
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.classList.add('hidden');
        }
    });

    // Auto-open help on start
    helpModal.classList.remove('hidden');

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
