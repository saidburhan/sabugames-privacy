import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// --- Scene Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5, 4, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 20;
scene.add(dirLight);

// --- The Cube ---
const cubeSize = 3;
const half = cubeSize / 2;

// 1. Wireframe Cube
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeEdgesGeometry = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x555555 });
const cubeLines = new THREE.LineSegments(cubeEdgesGeometry, lineMaterial);
scene.add(cubeLines);

// 2. Corner Spheres
const cornerGeometry = new THREE.SphereGeometry(0.12, 32, 32);
const cornerMaterial = new THREE.MeshStandardMaterial({
    color: 0x34495e,
    metalness: 0.3,
    roughness: 0.4
});

// Graph Data - Vertices
const vertices = [
    new THREE.Vector3(-half, -half, -half), // 0
    new THREE.Vector3(half, -half, -half),  // 1
    new THREE.Vector3(half, -half, half),   // 2
    new THREE.Vector3(-half, -half, half),  // 3
    new THREE.Vector3(-half, half, -half),  // 4
    new THREE.Vector3(half, half, -half),   // 5
    new THREE.Vector3(half, half, half),    // 6
    new THREE.Vector3(-half, half, half)    // 7
];

vertices.forEach(pos => {
    const mesh = new THREE.Mesh(cornerGeometry, cornerMaterial);
    mesh.position.copy(pos);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
});

// Graph Data - Edges
const edges = [
    { id: 0, v: [0, 1] }, { id: 1, v: [1, 2] }, { id: 2, v: [2, 3] }, { id: 3, v: [3, 0] }, // Bottom Loop
    { id: 4, v: [4, 5] }, { id: 5, v: [5, 6] }, { id: 6, v: [6, 7] }, { id: 7, v: [7, 4] }, // Top Loop
    { id: 8, v: [0, 4] }, { id: 9, v: [1, 5] }, { id: 10, v: [2, 6] }, { id: 11, v: [3, 7] } // Pillars
];

// Connectivity Map
const vertexConnections = Array(8).fill(null).map(() => []);
edges.forEach((edge, edgeIndex) => {
    vertexConnections[edge.v[0]].push({ edgeIndex: edgeIndex, neighbor: edge.v[1] });
    vertexConnections[edge.v[1]].push({ edgeIndex: edgeIndex, neighbor: edge.v[0] });
});

// --- Handles ---
const handleGeometry = new THREE.SphereGeometry(0.15, 32, 32);
const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x9b59b6,
    roughness: 0.1,
    metalness: 0.2
});
const handles = [];

const initialEdges = [5, 6, 10];
initialEdges.forEach((edgeIdx) => {
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.castShadow = true;
    handle.receiveShadow = true;

    // Start at middle
    const edge = edges[edgeIdx];
    const vStart = vertices[edge.v[0]];
    const vEnd = vertices[edge.v[1]];
    handle.position.copy(vStart).lerp(vEnd, 0.5);

    handle.userData = {
        isHandle: true,
        currentEdgeIndex: edgeIdx,
        t: 0.5
    };
    scene.add(handle);
    handles.push(handle);
});

// --- Section (Triangle) ---
const sectionMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
    depthTest: true,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
});
const sectionGeometry = new THREE.BufferGeometry();
const sectionMesh = new THREE.Mesh(sectionGeometry, sectionMaterial);
scene.add(sectionMesh);

const borderMaterial = new THREE.LineBasicMaterial({ color: 0xc0392b, linewidth: 3 });
const borderGeometry = new THREE.BufferGeometry();
const borderLines = new THREE.LineLoop(borderGeometry, borderMaterial);
scene.add(borderLines);

// --- Labels (CSS2D) ---
const labels = [];
// Create 3 labels for 3 edges: handles[0]-handles[1], handles[1]-handles[2], handles[2]-handles[0]
// We assign a, b, c arbitrarily initially
const labelConfig = [
    { id: 'lbl-c', name: 'c' },
    { id: 'lbl-a', name: 'a' },
    { id: 'lbl-b', name: 'b' }
];

labelConfig.forEach(conf => {
    const div = document.createElement('div');
    div.className = 'label';
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    div.style.padding = '2px 6px';
    div.style.borderRadius = '4px';
    div.style.fontSize = '14px';
    div.style.fontFamily = 'monospace';
    div.style.fontWeight = 'bold';
    div.style.color = '#c0392b';
    div.style.border = '1px solid #c0392b';
    div.textContent = conf.name;
    const label = new CSS2DObject(div);
    scene.add(label);
    labels.push(label);
});

function updateSection() {
    if (handles.length < 3) return;
    const p0 = handles[0].position;
    const p1 = handles[1].position;
    const p2 = handles[2].position;

    // Update Geometry
    const verticesArr = new Float32Array([
        p0.x, p0.y, p0.z,
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z
    ]);
    sectionGeometry.setAttribute('position', new THREE.BufferAttribute(verticesArr, 3));
    sectionGeometry.computeVertexNormals();
    sectionGeometry.attributes.position.needsUpdate = true;

    borderGeometry.setAttribute('position', new THREE.BufferAttribute(verticesArr, 3));
    borderGeometry.attributes.position.needsUpdate = true;

    // Call Math Update
    updateMath();
}

// --- Interaction Logic ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedHandle = null;
let dragPlane = new THREE.Plane();

renderer.domElement.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('resize', onResize);
renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
renderer.domElement.addEventListener('touchend', onMouseUp);

function getIntersects(event, objectList) {
    const rect = renderer.domElement.getBoundingClientRect();
    let clientX, clientY;
    if (event.changedTouches) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(objectList);
}

function onMouseDown(event) {
    const intersects = getIntersects(event, handles);
    if (intersects.length > 0) {
        controls.enabled = false;
        selectedHandle = intersects[0].object;
        const normal = new THREE.Vector3();
        camera.getWorldDirection(normal);
        normal.negate();
        dragPlane.setFromNormalAndCoplanarPoint(normal, selectedHandle.position);

        // Determine start vertex if any
        const edge = edges[selectedHandle.userData.currentEdgeIndex];
        const t = selectedHandle.userData.t;
        selectedHandle.userData.startVertex = -1;
        if (t < 0.05) selectedHandle.userData.startVertex = edge.v[0];
        else if (t > 0.95) selectedHandle.userData.startVertex = edge.v[1];
    }
}

function onTouchStart(event) {
    event.preventDefault();
    onMouseDown(event);
}

function onMouseMove(event) {
    if (!selectedHandle) return;

    // Get mouse ray intersection with drag plane
    const rect = renderer.domElement.getBoundingClientRect();
    let clientX, clientY;
    if (event.changedTouches) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const targetPoint = new THREE.Vector3();

    if (raycaster.ray.intersectPlane(dragPlane, targetPoint)) {
        const h = selectedHandle;

        // --- 1. Edge Switching (Only if started at a vertex) ---
        if (h.userData.startVertex !== -1) {
            // Check connected edges to pick the best one matching drag direction
            const vertexPos = vertices[h.userData.startVertex];
            const dragVec = new THREE.Vector3().subVectors(targetPoint, vertexPos);

            const connections = vertexConnections[h.userData.startVertex];
            let bestDot = -Infinity;
            let bestConn = null;

            // Find best aligned edge
            for (let conn of connections) {
                const neighborEdge = edges[conn.edgeIndex];
                const vNeighbor = vertices[conn.neighbor];
                const neighborDir = new THREE.Vector3().subVectors(vNeighbor, vertexPos).normalize();

                const dot = dragVec.dot(neighborDir);
                if (dot > bestDot) {
                    bestDot = dot;
                    bestConn = conn;
                }
            }

            if (bestConn) {
                h.userData.currentEdgeIndex = bestConn.edgeIndex;
            }
        }

        // --- 2. Projection on Current Edge ---
        const currEdge = edges[h.userData.currentEdgeIndex];
        const vA = vertices[currEdge.v[0]];
        const vB = vertices[currEdge.v[1]];

        const edgeVec = new THREE.Vector3().subVectors(vB, vA);
        const edgeLenSq = edgeVec.lengthSq();
        const vA_to_Target = new THREE.Vector3().subVectors(targetPoint, vA);

        let t = vA_to_Target.dot(edgeVec) / edgeLenSq;

        // --- 3. Snap and Stop Logic ---
        const snapThreshold = 0.1;
        let snappedVertex = -1;

        if (t < snapThreshold) snappedVertex = currEdge.v[0];
        else if (t > 1 - snapThreshold) snappedVertex = currEdge.v[1];

        if (snappedVertex !== -1) {
            // We are in snap zone

            // Should we stop?
            // Stop ONLY if we have reached a DIFFERENT vertex than where we started the drag.
            if (snappedVertex !== h.userData.startVertex) {
                // Snap exactly
                const newT = (snappedVertex === currEdge.v[0]) ? 0 : 1;
                h.userData.t = newT;
                h.position.copy(vertices[snappedVertex]);
                updateSection();

                // STOP DRAGGING
                selectedHandle = null;
                // Controls stay disabled until mouseup
                return;
            } else {
                // We are at the start vertex (or returned to it).
                // Just stay snapped visually but allow movement.
                t = (snappedVertex === currEdge.v[0]) ? 0 : 1;
            }
        } else {
            // Not snapped
            t = Math.max(0, Math.min(1, t));
        }

        // Apply
        h.userData.t = t;
        h.position.copy(vA).lerp(vB, t);

        updateSection();
    }
}

function onTouchMove(event) {
    event.preventDefault();
    onMouseMove(event);
}

function onMouseUp() {
    selectedHandle = null;
    controls.enabled = true;
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

// --- Math & UI Logic ---
const inputA = document.getElementById('cubeSizeInput');
const edgesOut = document.getElementById('math-edges');
const areaOut = document.getElementById('math-area');

function formatRoot(val) {
    const sq = val * val;
    const eps = 0.005;
    for (let i = 1; i <= 50; i++) {
        if (Math.abs(sq - i) < eps) {
            return (i === 1) ? "" : `\\sqrt{${i}}`;
        }
    }
    const sq2 = 2 * sq;
    if (Math.abs(Math.round(sq2) - sq2) < eps) {
        const k = Math.round(sq2);
        return `\\sqrt{\\frac{${k}}{2}}`;
    }
    return "";
}

function updateMath() {
    if (!handles || handles.length < 3) return;

    const p0 = handles[0].position;
    const p1 = handles[1].position;
    const p2 = handles[2].position;

    const d01_vis = p0.distanceTo(p1);
    const d12_vis = p1.distanceTo(p2);
    const d20_vis = p2.distanceTo(p0);

    const norm01 = d01_vis / 3;
    const norm12 = d12_vis / 3;
    const norm20 = d20_vis / 3;

    const L = parseFloat(inputA.value) || 1;

    const real01 = norm01 * L;
    const real12 = norm12 * L;
    const real20 = norm20 * L;

    // Update Label Positions (Midpoints)
    labels[0].position.copy(p0).lerp(p1, 0.5);
    labels[0].element.textContent = `c = ${real01.toFixed(2)}`;

    labels[1].position.copy(p1).lerp(p2, 0.5);
    labels[1].element.textContent = `a = ${real12.toFixed(2)}`;

    labels[2].position.copy(p2).lerp(p0, 0.5);
    labels[2].element.textContent = `b = ${real20.toFixed(2)}`;

    const s01 = formatRoot(norm01);
    const s12 = formatRoot(norm12);
    const s20 = formatRoot(norm20);

    const sides = [
        { label: "c", raw: norm01, val: real01, root: s01 },
        { label: "a", raw: norm12, val: real12, root: s12 },
        { label: "b", raw: norm20, val: real20, root: s20 }
    ];

    if (window.katex) {
        edgesOut.innerHTML = "";
        sides.forEach(s => {
            const div = document.createElement("div");
            let tex = "";
            if (s.root !== "") {
                const rootPart = (s.root === "") ? "" : s.root;
                if (Math.abs(L - 1) < 0.001) {
                    tex = `${s.label} = ${rootPart} \\approx ${s.val.toFixed(2)}`;
                } else {
                    tex = `${s.label} = ${L}${rootPart} \\approx ${s.val.toFixed(2)}`;
                }
            } else {
                tex = `${s.label} = ${s.val.toFixed(2)}`;
            }
            window.katex.render(tex, div, { throwOnError: false });
            edgesOut.appendChild(div);
        });

        const s = (norm01 + norm12 + norm20) / 2;
        const areaSq = s * (s - norm01) * (s - norm12) * (s - norm20);
        const areaNorm = Math.sqrt(Math.max(0, areaSq));
        const areaReal = areaNorm * L * L;

        const rootArea = formatRoot(areaNorm);

        areaOut.innerHTML = "";
        let aTex = "";
        if (rootArea !== "") {
            const r = (rootArea === "") ? "" : rootArea;
            if (Math.abs(L - 1) < 0.001) {
                aTex = `\\text{Alan} = ${r} \\approx ${areaReal.toFixed(2)}`;
            } else {
                aTex = `\\text{Alan} = ${L}^2 ${r} \\approx ${areaReal.toFixed(2)}`;
            }
        } else {
            aTex = `\\text{Alan} = ${areaReal.toFixed(2)}`;
        }
        window.katex.render(aTex, areaOut, { throwOnError: false });
    }
}

if (inputA) {
    inputA.addEventListener('input', updateMath);
}

// Initial draw
updateSection();
animate();
