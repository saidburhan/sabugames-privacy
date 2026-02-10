import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Setup Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);
scene.fog = new THREE.Fog(0x1e1e1e, 20, 100);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xffaa00, 0.5);
pointLight.position.set(-10, 10, -10);
scene.add(pointLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2 - 0.1; // Don't go below ground
controls.minDistance = 10;
controls.maxDistance = 100;

// Materials
const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x0055ff,
    roughness: 0.2,
    metalness: 0.1
});
const pinMaterial = new THREE.MeshStandardMaterial({
    color: 0x0033aa,
    roughness: 0.5
});
const cylinderGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2, 32);

// Groups
const boardGroup = new THREE.Group();
scene.add(boardGroup);

const pins = [];
const cylinders = []; // Active cylinders on board

// Constants
const GRID_SIZE = 10;
const SPACING = 2.5;
const BOARD_SIZE = GRID_SIZE * SPACING + 2;

// Create Base
const baseGeometry = new THREE.BoxGeometry(BOARD_SIZE, 1, BOARD_SIZE);
// Shift slightly down so top surface is at y=0
const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
baseMesh.position.y = -0.5;
baseMesh.receiveShadow = true;
boardGroup.add(baseMesh);

// Create Pins (10x10)
// Center the grid
const offset = ((GRID_SIZE - 1) * SPACING) / 2;

for (let x = 0; x < GRID_SIZE; x++) {
    for (let z = 0; z < GRID_SIZE; z++) {
        const pinGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 16);
        const pin = new THREE.Mesh(pinGeo, pinMaterial);

        // Position
        const px = (x * SPACING) - offset;
        const pz = (z * SPACING) - offset;

        pin.position.set(px, 0.75, pz); // Height 1.5, so center at 0.75 puts bottom at 0
        pin.castShadow = true;
        pin.receiveShadow = true;

        // Metadata
        pin.userData = {
            isPin: true,
            occupied: false,
            gridX: x,
            gridZ: z
        };

        boardGroup.add(pin);
        pins.push(pin);
    }
}

// Raycaster & Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2); // Plane at y=2 for dragging
const planeIntersect = new THREE.Vector3();

// State
let draggedObject = null;
let isDraggingFromPalette = false;
let initialDragPos = new THREE.Vector3();
let previousPin = null;

// Event Listeners (Scene Interaction)
window.addEventListener('resize', onWindowResize);
document.addEventListener('pointermove', onPointerMove);
document.addEventListener('pointerup', onPointerUp);

// Canvas Pointer Down (Picking existing objects)
renderer.domElement.addEventListener('pointerdown', onCanvasPointerDown);

// Palette Interaction
const paletteItems = document.querySelectorAll('.palette-item:not(#trash-bin)');
paletteItems.forEach(item => {
    item.addEventListener('mousedown', (e) => {
        // e.preventDefault();
        const color = item.getAttribute('data-color');
        startDraggingNewCylinder(e, color);
    });
});

function startDraggingNewCylinder(event, colorHex) {
    isDraggingFromPalette = true;
    previousPin = null;
    controls.enabled = false;

    // Create new cylinder
    const color = new THREE.Color(colorHex);
    const mat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.2, metalness: 0.1 });
    const mesh = new THREE.Mesh(cylinderGeometry, mat);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { isCylinder: true };

    // Initially place it at mouse projection
    updateMouse(event);
    raycaster.setFromCamera(mouse, camera);

    // Intersect with drag plane
    if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
        mesh.position.copy(planeIntersect);
    } else {
        // Fallback in front of camera
        const vec = new THREE.Vector3(0, 0, -20).applyMatrix4(camera.matrixWorld);
        mesh.position.copy(vec);
    }

    scene.add(mesh);
    draggedObject = mesh;
}

function onCanvasPointerDown(event) {
    updateMouse(event);
    raycaster.setFromCamera(mouse, camera);

    // Filter objects that are cylinders
    const intersects = raycaster.intersectObjects(cylinders, false);

    if (intersects.length > 0) {
        const hit = intersects[0];
        if (hit.object.userData.isCylinder) {
            draggedObject = hit.object;
            controls.enabled = false;
            initialDragPos.copy(draggedObject.position);

            // If it was on a pin, free the pin
            if (draggedObject.userData.occupyingPin) {
                previousPin = draggedObject.userData.occupyingPin;
                draggedObject.userData.occupyingPin.userData.occupied = false;
                draggedObject.userData.occupyingPin = null;
            } else {
                previousPin = null;
            }
        }
    }
}

function onPointerMove(event) {
    updateMouse(event);

    if (draggedObject) {
        raycaster.setFromCamera(mouse, camera);
        if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
            draggedObject.position.copy(planeIntersect);
        }
    }
}

function onPointerUp(event) {
    if (draggedObject) {
        // Check for snap
        let closestPin = null;
        let minDist = Infinity;
        const SNAP_THRESHOLD = 1.5; // Slightly larger than radius

        for (const pin of pins) {
            // Get pin world position
            const pinPos = new THREE.Vector3();
            pin.getWorldPosition(pinPos);
            // Height offset if needed, or just XZ distance

            const dist = new THREE.Vector3(draggedObject.position.x, 0, draggedObject.position.z)
                .distanceTo(new THREE.Vector3(pinPos.x, 0, pinPos.z));

            if (dist < SNAP_THRESHOLD) {
                if (dist < minDist) {
                    minDist = dist;
                    closestPin = pin;
                }
            }
        }

        if (closestPin && !closestPin.userData.occupied) {
            // Snap
            // Snap to pin center X/Z. Y=1 (sitting on base).
            draggedObject.position.set(closestPin.position.x, 1, closestPin.position.z);
            closestPin.userData.occupied = true;
            draggedObject.userData.occupyingPin = closestPin;

            // Add to tracked cylinders if new
            if (!cylinders.includes(draggedObject)) {
                cylinders.push(draggedObject);
            }
        } else {
            // No valid snap

            // CHECK TRASH BIN
            const trashBin = document.getElementById('trash-bin');
            const trashRect = trashBin.getBoundingClientRect();
            // Mouse coordinates from the event need to be checked against trash rect
            // The event in onPointerUp gives clientX, clientY
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const isOverTrash = (
                mouseX >= trashRect.left &&
                mouseX <= trashRect.right &&
                mouseY >= trashRect.top &&
                mouseY <= trashRect.bottom
            );

            if (isOverTrash) {
                // Delete
                scene.remove(draggedObject);
                draggedObject.geometry.dispose();
                draggedObject.material.dispose();
                // Remove from cylinders array
                const index = cylinders.indexOf(draggedObject);
                if (index > -1) {
                    cylinders.splice(index, 1);
                }
            } else {
                if (isDraggingFromPalette) {
                    // Remove if failed to place new one
                    scene.remove(draggedObject);
                    draggedObject.geometry.dispose();
                    draggedObject.material.dispose();
                } else {
                    // Return to start
                    draggedObject.position.copy(initialDragPos);

                    // Re-occupy previous pin if it exists
                    if (previousPin) {
                        previousPin.userData.occupied = true;
                        draggedObject.userData.occupyingPin = previousPin;
                    }
                }
            }
        }
    }

    draggedObject = null;
    isDraggingFromPalette = false;
    previousPin = null;
    controls.enabled = true;
}

function updateMouse(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
