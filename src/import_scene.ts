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
    scene.add(gltf.scene)
})



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
