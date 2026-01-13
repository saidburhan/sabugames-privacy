import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log("Script starting...");

// --- Global Variables ---
let scene, camera, renderer, controls;
let raycaster, pointer;
let interactables = []; // Tiles that can be clicked
let cubeGroup; // Global reference for animation
let isCelebrating = false; // Flag for celebration spin
let facesData = {
    top: [],
    front: [],
    back: [],
    left: [],
    right: []
};
let isDragging = false;
let pointerDownPos = { x: 0, y: 0 };
let currentLevelData = null;

// --- Colors ---
const COLOR_BASE = 0x22222a;
const COLOR_TOP_PATTERN = 0x4cc9f0; // Blue for Top
const COLOR_USER_PAINT = 0x4bf0a5; // Green for User
const COLOR_WRONG = 0xff4d4d;
const COLOR_FRAME = 0xffaa00; // Gold/Yellow

// --- Audio System (Web Audio API for SFX, HTML5 for Music) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const soundManager = {
    isMuted: false,
    bgMusic: null,

    init: function () {
        // Initialize Background Music
        this.bgMusic = new Audio('Windswept.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.2; // Low volume background
    },

    startAmbience: function () {
        if (this.bgMusic && !this.isMuted) {
            this.bgMusic.play().catch(e => console.log("Audio play blocked until interaction", e));
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    },

    toggleMute: function () {
        this.isMuted = !this.isMuted;
        const btn = document.getElementById('mute-btn');

        if (this.isMuted) {
            if (this.bgMusic) this.bgMusic.pause();
            if (btn) btn.textContent = '🔇';
        } else {
            if (this.bgMusic) this.bgMusic.play().catch(e => console.log(e));
            if (audioCtx.state === 'suspended') audioCtx.resume();
            if (btn) btn.textContent = '🔊';
        }
    },

    playClick: function (isPaint) {
        if (this.isMuted) return;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (isPaint) {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } else {
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        }
    },

    playSuccess: function () {
        if (this.isMuted) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((note, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.type = 'sine';
            osc.frequency.value = note;

            const now = audioCtx.currentTime + (i * 0.1);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

            osc.start(now);
            osc.stop(now + 1.0);
        });
    },

    playFail: function () {
        if (this.isMuted) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }
};

// --- Initialization ---
function init() {
    soundManager.init();

    // UI Setup
    try {
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                document.getElementById('tutorial-overlay').classList.add('hidden');
                soundManager.startAmbience();
            });
        }

        document.getElementById('check-btn').addEventListener('click', checkSolution);
        document.getElementById('reset-btn').addEventListener('click', clearSideFaces);
        document.getElementById('new-game-btn').addEventListener('click', generateNewLevel);

        const muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => soundManager.toggleMute());
        }

        const helpBtn = document.getElementById('help-btn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                document.getElementById('tutorial-overlay').classList.remove('hidden');
            });
        }

    } catch (e) {
        console.error("UI Setup Error:", e);
    }

    // 3D Setup
    try {
        scene = new THREE.Scene();
        scene.background = null;

        // 2. Camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        updateCameraPosition();
        const canvas = document.getElementById('game-canvas');
        if (!canvas) throw new Error("Canvas not found");

        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 5;
        controls.maxDistance = 20;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight2.position.set(-5, -2, -5);
        scene.add(dirLight2);

        raycaster = new THREE.Raycaster();
        pointer = new THREE.Vector2();

        window.addEventListener('resize', onWindowResize);
        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointermove', onPointerMove);

        createReflectiveCube();
        generateNewLevel();
        createStarField(); // Ensure stars are created

        animate();

    } catch (err) {
        console.error("3D Error:", err);
        alert("Oyun başlatılırken bir hata oluştu: " + err.message);
    }
}

function updateCameraPosition() {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        // Further back and higher for mobile to fit cube
        // Increase distance significantly to ensure whole cube visible
        camera.position.set(14, 10, 14);
    } else {
        // Standard desktop position
        camera.position.set(8, 6, 8);
    }
    camera.lookAt(0, 0, 0);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateCameraPosition();
}

// --- Game Loop ---
let time = 0;
let stars;
let glowingTiles = [];

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    controls.update();

    if (stars) {
        stars.rotation.y += 0.0005;
        stars.rotation.x += 0.0002;
    }

    if (isCelebrating && cubeGroup) {
        // Fast, exciting spin (Wilder speed, NO scaling)
        cubeGroup.rotation.y += 0.3;
        cubeGroup.rotation.z += 0.15;
        cubeGroup.rotation.x += 0.1;
    } else if (cubeGroup) {
        // Smoothly return rotation to 0
        cubeGroup.rotation.x = THREE.MathUtils.lerp(cubeGroup.rotation.x, 0, 0.1);
        cubeGroup.rotation.y = THREE.MathUtils.lerp(cubeGroup.rotation.y, 0, 0.1);
        cubeGroup.rotation.z = THREE.MathUtils.lerp(cubeGroup.rotation.z, 0, 0.1);
        cubeGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }

    if (glowingTiles.length > 0) {
        const intensity = (Math.sin(time * 10) * 0.5 + 0.5) * 2;
        glowingTiles.forEach(tile => {
            tile.material.emissiveIntensity = intensity;
        });
    }

    renderer.render(scene, camera);
}

// --- Geometry Generation ---
const FACE_SIZE = 5;
const TILE_SIZE = 0.9;

function createReflectiveCube() {
    cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const coreGeo = new THREE.BoxGeometry(4.8, 4.8, 4.8);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    cubeGroup.add(core);

    createFaceGroup(cubeGroup, 'top', new THREE.Vector3(0, 2.5, 0), new THREE.Euler(-Math.PI / 2, 0, 0));
    createFaceGroup(cubeGroup, 'front', new THREE.Vector3(0, 0, 2.5), new THREE.Euler(0, 0, 0));
    createFaceGroup(cubeGroup, 'back', new THREE.Vector3(0, 0, -2.5), new THREE.Euler(0, Math.PI, 0));
    createFaceGroup(cubeGroup, 'right', new THREE.Vector3(2.5, 0, 0), new THREE.Euler(0, Math.PI / 2, 0));
    createFaceGroup(cubeGroup, 'left', new THREE.Vector3(-2.5, 0, 0), new THREE.Euler(0, -Math.PI / 2, 0));

    createTopFrame(cubeGroup);
}

function createFaceGroup(parent, name, pos, rot) {
    const faceGroup = new THREE.Group();
    faceGroup.position.copy(pos);
    faceGroup.rotation.copy(rot);
    faceGroup.name = name;
    parent.add(faceGroup);

    facesData[name] = Array.from({ length: 5 }, () => Array(5).fill(false));

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const geometry = new THREE.BoxGeometry(TILE_SIZE, TILE_SIZE, 0.2);
            const material = new THREE.MeshStandardMaterial({
                color: COLOR_BASE, roughness: 0.2, metalness: 0.1
            });
            const tile = new THREE.Mesh(geometry, material);

            tile.position.x = (c - 2) * 1.0;
            tile.position.y = (2 - r) * 1.0;
            tile.position.z = 0;
            tile.userData = { face: name, r: r, c: c, isPainted: false, isInteractable: true };

            if (name === 'top') {
                tile.userData.isInteractable = false;
            }

            faceGroup.add(tile);
            interactables.push(tile);
        }
    }
}

function createTopFrame(parent) {
    const frameGroup = new THREE.Group();
    const thickness = 0.08;
    const length = 5.1;
    const offset = 2.5;
    const elevation = 0.05;

    const mat = new THREE.MeshStandardMaterial({
        color: 0xffaa00, roughness: 0.2, metalness: 0.1,
        emissive: 0xff5500, emissiveIntensity: 2.0
    });

    const edge1 = new THREE.Mesh(new THREE.BoxGeometry(length, thickness, thickness), mat);
    edge1.position.set(0, offset + elevation, offset);
    frameGroup.add(edge1);

    const edge2 = new THREE.Mesh(new THREE.BoxGeometry(length, thickness, thickness), mat);
    edge2.position.set(0, offset + elevation, -offset);
    frameGroup.add(edge2);

    const edge3 = new THREE.Mesh(new THREE.BoxGeometry(thickness, thickness, length), mat);
    edge3.position.set(-offset, offset + elevation, 0);
    frameGroup.add(edge3);

    const edge4 = new THREE.Mesh(new THREE.BoxGeometry(thickness, thickness, length), mat);
    edge4.position.set(offset, offset + elevation, 0);
    frameGroup.add(edge4);

    parent.add(frameGroup);
}

function createStarField() {
    console.log("Creating Starfield...");
    const geometry = new THREE.BufferGeometry();
    const count = 3000; // Increased count
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        // Distribute stars in a larger sphere
        const r = 50 + Math.random() * 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Vivid colors
        const colorType = Math.random();
        if (colorType > 0.9) {
            colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 0.4; // Goldish
        } else if (colorType > 0.7) {
            colors[i * 3] = 0.4; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1.0; // Cyan
        } else if (colorType > 0.5) {
            colors[i * 3] = 0.8; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 1.0; // Purple
        } else {
            colors[i * 3] = 1.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 1.0; // White
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.5, // Larger size
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        depthWrite: false // Fix transparency issues
    });

    stars = new THREE.Points(geometry, material);
    scene.add(stars);
    console.log("Starfield added to scene", stars);
}

// --- Interaction ---
function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onPointerDown(event) {
    isDragging = false;
    pointerDownPos.x = event.clientX;
    pointerDownPos.y = event.clientY;
}

function onPointerUp(event) {
    const dx = event.clientX - pointerDownPos.x;
    const dy = event.clientY - pointerDownPos.y;
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
        handleTap();
    }
}

function handleTap() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(interactables);

    if (intersects.length > 0) {
        const hit = intersects[0].object;
        const data = hit.userData;
        if (data.face === 'top') return;
        toggleTile(hit);
    }
}

function toggleTile(tileMesh, forceState = null) {
    const data = tileMesh.userData;
    const newState = forceState !== null ? forceState : !data.isPainted;

    if (forceState === null) {
        soundManager.playClick(newState);
    }

    data.isPainted = newState;
    facesData[data.face][data.r][data.c] = newState;
    updateTileVisual(tileMesh);
}

function updateTileVisual(tileMesh) {
    const data = tileMesh.userData;
    if (data.isPainted) {
        const color = (data.face === 'top') ? COLOR_TOP_PATTERN : COLOR_USER_PAINT;
        tileMesh.material.color.setHex(color);
        tileMesh.material.emissive.setHex(0x111111);
    } else {
        tileMesh.material.color.setHex(COLOR_BASE);
        tileMesh.material.emissive.setHex(0x000000);
    }
}

// --- Logic (Generation & Validation) ---
function generateNewLevel() {
    clearAllFaces();
    const patternCount = 8 + Math.floor(Math.random() * 5);
    let count = 0;
    while (count < patternCount) {
        const r = Math.floor(Math.random() * 5);
        const c = Math.floor(Math.random() * 5);
        if (!facesData.top[r][c]) {
            const tile = findTile('top', r, c);
            if (tile) {
                // Important: Reset isPainted to TRUE for pattern
                tile.userData.isPainted = true;
                facesData.top[r][c] = true;
                updateTileVisual(tile);
                count++;
            }
        }
    }
}

function clearAllFaces() {
    glowingTiles = [];
    interactables.forEach(tile => {
        tile.userData.isPainted = false;
        if (tile.userData.face) {
            facesData[tile.userData.face][tile.userData.r][tile.userData.c] = false;
        }
        updateTileVisual(tile);
        tile.material.emissiveIntensity = 0;
        tile.material.color.setHex(COLOR_BASE);
    });
}

function clearSideFaces() {
    glowingTiles = [];
    interactables.forEach(tile => {
        if (tile.userData.face === 'top') return;
        toggleTile(tile, false);
        tile.material.emissiveIntensity = 0;
    });
}

function findTile(face, r, c) {
    return interactables.find(t => t.userData.face === face && t.userData.r === r && t.userData.c === c);
}

function checkSolution() {
    let allCorrect = true;
    let wrongTiles = [];
    let correctTiles = [];
    const top = facesData.top;

    const checkFace = (faceName, getExpected) => {
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                const expected = getExpected(r, c);
                const actual = facesData[faceName][r][c];
                const tile = findTile(faceName, r, c);

                if (expected !== actual) {
                    allCorrect = false;
                    wrongTiles.push(tile);
                } else if (actual === true) {
                    correctTiles.push(tile);
                }
            }
        }
    };

    checkFace('front', (r, c) => top[4 - r][c]);
    checkFace('back', (r, c) => top[r][4 - c]);
    checkFace('left', (r, c) => top[c][r]);
    checkFace('right', (r, c) => top[4 - c][4 - r]);

    if (allCorrect) {
        showToast('Tebrikler! Harika İş.', 'success');
        triggerSuccess(correctTiles);
        soundManager.playSuccess();
    } else {
        showToast('Hatalı yansımalar var!', 'error');
        wrongTiles.forEach(tile => {
            if (tile) {
                tile.material.color.setHex(COLOR_WRONG);
                setTimeout(() => updateTileVisual(tile), 1000);
            }
        });
        soundManager.playFail();
    }
}

function triggerSuccess(tiles) {
    // Confetti
    if (window.confetti) {
        const duration = 2500;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5, angle: 60, spread: 55, origin: { x: 0 },
                colors: ['#4cc9f0', '#4bf0a5', '#ffffff']
            });
            confetti({
                particleCount: 5, angle: 120, spread: 55, origin: { x: 1 },
                colors: ['#4cc9f0', '#4bf0a5', '#ffffff']
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }

    glowingTiles = tiles;
    isCelebrating = true;

    setTimeout(() => {
        isCelebrating = false;
        generateNewLevel();

        glowingTiles.forEach(t => t.material.emissiveIntensity = 0);
        glowingTiles = [];

        showToast("Harika! Yeni şekil belirdi...", "success");
        soundManager.playClick(true);

    }, 1500); // 1.5 seconds celebration (Shorter)
}

function showToast(msg, type) {
    const toast = document.getElementById('message-toast');
    toast.textContent = msg;
    toast.className = `toast ${type}`;
    setTimeout(() => {
        toast.className = 'toast hidden';
    }, 2000);
}



// Start
init();
