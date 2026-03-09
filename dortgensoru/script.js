/**
 * İnteraktif Dörtgen Analizi - Sabit Kenar Mantığı
 */

const SCALE = 40; // 1 cm = 40 piksel
const TARGET_LENGTHS = {
    'ab': 12 * SCALE,
    'bc': 5 * SCALE,
    'cd': 7 * SCALE,
    'da': 9 * SCALE
};

// Başlangıç Noktaları (Matematiksel olarak tutarlı)
let points = {
    'A': { x: 250, y: 450 },
    'B': { x: 250 + 12 * SCALE, y: 450 },
    'C': { x: 670, y: 300 }, // Yaklaşık pozisyonlar, solver düzeltecek
    'D': { x: 450, y: 200 }
};

let activePointId = null;
let svgElement = document.getElementById('svg-canvas');

function init() {
    // İlk kurulumda kısıtları bir kez çalıştırarak şekli mükemmelleştir
    for (let i = 0; i < 500; i++) applyDistanceConstraints('A');
    updateVisuals();
    setupEventListeners();
}

function setupEventListeners() {
    ['a', 'b', 'c', 'd'].forEach(id => {
        const el = document.getElementById('point-' + id);
        el.addEventListener('pointerdown', (e) => {
            activePointId = id.toUpperCase();
            el.setPointerCapture(e.pointerId);
        });
    });

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', () => activePointId = null);
}

function handlePointerMove(e) {
    if (!activePointId) return;

    const rect = svgElement.getBoundingClientRect();
    const targetX = ((e.clientX - rect.left) / rect.width) * 1000;
    const targetY = ((e.clientY - rect.top) / rect.height) * 700;

    // Mevcut pozisyonu yedekle (Geri dönmek gerekebilir)
    const backup = JSON.parse(JSON.stringify(points));

    // Aktif noktayı taşı
    points[activePointId].x = targetX;
    points[activePointId].y = targetY;

    // Kısıtları çöz (Iterative Distance Constraint Solver)
    const iterations = 60;
    let solvable = true;

    for (let i = 0; i < iterations; i++) {
        solvable = applyDistanceConstraints(activePointId);
    }

    // Eğer tolerans dışı bir hata kaldıysa hareketi reddet (Taşınamaz hale getir)
    if (!isConfigurationValid()) {
        points = backup;
    } else {
        updateVisuals();
    }
}

/**
 * Kenar uzunluklarını korumak için noktaları birbirine çeker veya iter.
 */
function applyDistanceConstraints(lockedId) {
    const edges = [
        { p1: 'A', p2: 'B', len: TARGET_LENGTHS.ab },
        { p1: 'B', p2: 'C', len: TARGET_LENGTHS.bc },
        { p1: 'C', p2: 'D', len: TARGET_LENGTHS.cd },
        { p1: 'D', p2: 'A', len: TARGET_LENGTHS.da }
    ];

    edges.forEach(edge => {
        const p1 = points[edge.p1];
        const p2 = points[edge.p2];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return;

        const diff = (edge.len - dist) / dist;
        const offsetX = dx * diff;
        const offsetY = dy * diff;

        // Tutulan nokta ve A noktası (çapa) daha az hareket etmeli veya hiç etmemeli
        // Ancak tam serbestlik için sadece tutulan noktayı sabitliyoruz
        if (edge.p1 === lockedId) {
            p2.x += offsetX;
            p2.y += offsetY;
        } else if (edge.p2 === lockedId) {
            p1.x -= offsetX;
            p1.y -= offsetY;
        } else {
            // İki nokta da serbestse yarı yarıya paylaşırlar
            p1.x -= offsetX * 0.5;
            p1.y -= offsetY * 0.5;
            p2.x += offsetX * 0.5;
            p2.y += offsetY * 0.5;
        }
    });
}

/**
 * Şeklin matematiksel olarak geçerli olup olmadığını denetler.
 */
function isConfigurationValid() {
    const errorThreshold = 1.5; // piksel cinsinden hata payı
    const edges = [
        { p1: 'A', p2: 'B', len: TARGET_LENGTHS.ab },
        { p1: 'B', p2: 'C', len: TARGET_LENGTHS.bc },
        { p1: 'C', p2: 'D', len: TARGET_LENGTHS.cd },
        { p1: 'D', p2: 'A', len: TARGET_LENGTHS.da }
    ];

    return edges.every(edge => {
        const d = Math.sqrt(Math.pow(points[edge.p2].x - points[edge.p1].x, 2) +
            Math.pow(points[edge.p2].y - points[edge.p1].y, 2));
        return Math.abs(d - edge.len) < errorThreshold;
    });
}

function updateVisuals() {
    // SVG Elemanlarını Güncelle
    ['A', 'B', 'C', 'D'].forEach(id => {
        const dot = document.getElementById('point-' + id.toLowerCase());
        const text = document.getElementById('text-' + id.toLowerCase());
        dot.setAttribute('cx', points[id].x);
        dot.setAttribute('cy', points[id].y);
        text.setAttribute('x', points[id].x + 15);
        text.setAttribute('y', points[id].y - 15);
    });

    const d = `M ${points.A.x} ${points.A.y} L ${points.B.x} ${points.B.y} L ${points.C.x} ${points.C.y} L ${points.D.x} ${points.D.y} Z`;
    document.getElementById('quad-path').setAttribute('d', d);

    // Köşegenler
    updateLine('diag-ac', points.A, points.C);
    updateLine('diag-bd', points.B, points.D);

    // Hesaplamalar
    const ac = distPoints(points.A, points.C) / SCALE;
    const bd = distPoints(points.B, points.D) / SCALE;

    document.getElementById('val-ab').textContent = '12.00 cm (Sabit)';
    document.getElementById('val-bc').textContent = '5.00 cm (Sabit)';
    document.getElementById('val-cd').textContent = '7.00 cm (Sabit)';
    document.getElementById('val-da').textContent = '9.00 cm (Sabit)';

    document.getElementById('val-ac').textContent = ac.toFixed(2) + ' cm';
    document.getElementById('val-bd').textContent = bd.toFixed(2) + ' cm';
    document.getElementById('val-total').textContent = (ac + bd).toFixed(2) + ' cm';
}

function updateLine(id, p1, p2) {
    const el = document.getElementById(id);
    el.setAttribute('x1', p1.x); el.setAttribute('y1', p1.y);
    el.setAttribute('x2', p2.x); el.setAttribute('y2', p2.y);
}

function distPoints(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

document.addEventListener('DOMContentLoaded', init);
