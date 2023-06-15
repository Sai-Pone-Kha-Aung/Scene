import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import './style.css'

const sceneURL = './public/scene/scene (1).gltf'; // need to change the file path to
const objURL = './public/scene/obj/Studio_Scene_V3_obj.obj';
const mtlURL = './public/scene/obj/Studio_Scene_V3.mtl';

//Scene
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.01, 1000);
camera.position.set(0, 5, 15)
console.log(camera);

const scene = new THREE.Scene();

//Render

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

//Floor
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0x262424, depthWrite: false })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(2000, 20, 0xffffff, 0xffffff);
// grid.material.opacity = 0.2;
// grid.material.transparent = true;
scene.add(grid)

//Light
// const hemiLight = new THREE.HemisphereLight(0x404040, 0x444444);
// hemiLight.position.set(0, 300, 0);
// scene.add(hemiLight);

// const ambientLight = new THREE.AmbientLight(0x404040);
// scene.add(ambientLight);

// const dirLight = new THREE.DirectionalLight(0x404040, 1);
// dirLight.position.set(0, 200, 100);
// dirLight.castShadow = true;
// dirLight.shadow.camera.top = 180;
// dirLight.shadow.camera.bottom = -100;
// dirLight.shadow.camera.left = -120;
// dirLight.shadow.camera.right = 120;
// scene.add(dirLight);

//GLTFLoader

const gltfloader = new GLTFLoader();
const objloader = new OBJLoader();
const mtlloader = new MTLLoader();

gltfloader.load(sceneURL,function(gltf) {
    const model = gltf.scene;
    scene.add(model)
  
   
})

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // Calculate normalized device coordinates (NDC) of the mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Perform the raycasting
  const intersects = raycaster.intersectObjects(scene.children, true);

  // Process the intersection results
  if (intersects.length > 0) {
    // Handle intersections, e.g., highlight the object, etc.
  }
}

// Attach the event listener
window.addEventListener('mousemove', onMouseMove, false);

let isDragging = false;
let selectedObject = null;

function onMouseDown(event) {
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    isDragging = true;
    selectedObject = intersects[0].object;
    // Perform additional actions on the selected object, if needed
  }
}

function onMouseUp(event) {
  if (isDragging) {
    isDragging = false;
    selectedObject = null;
    // Perform additional actions after releasing the object, if needed
  }
}

 function onMove(event) {
  // ...existing raycasting code...

  if (isDragging) {
    // Update the position of the selected object based on the mouse movement
    
    const intersects = raycaster.intersectObject(scene, true);
    if (intersects.length > 0) {
      selectedObject.position.copy(intersects[0].point);
    }
  }
}

// Attach event listeners for mouse interaction
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('mousemove', onMove, false);
window.addEventListener('mousemove', onMouseMove, false);



// mtlloader.load(mtlURL, function (mtl) {
//     mtl.preload()
//     objloader.setMaterials(mtl);
//     objloader.load(objURL, function (obj) {
//         scene.add(obj)
//     })
// })


animate();
function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
