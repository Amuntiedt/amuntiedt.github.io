import './style.css';

//Globe
import * as Three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//set scene and camera
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(4,5,11);
// camera.lookAt(0,0,0); 

const renderer = new Three.WebGLRenderer({antialias: true}); 
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
//Can I make the shadow responsive? Or it is about changing where the light is coming from? A front light vs a side light? 
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = Three.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
//document.getElementById('three-container').appendChild(renderer.domElement);

//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
//damping allows for smooth rotation
controls.enableDamping = true;
// false keeps object centered in view
controls.enablePan = false;
//zoom distance
controls.minDistance = 1; 
controls.maxDistance = 13;
//polar angle is how high or low user can tilt camera
controls.minPolarAngle = 0;
controls.maxPolarAngle = 3;
controls.autoRotate = false;
controls.target = new Three.Vector3(0,0,0);
controls.update()

//Ambient Light
const ambientLight = new Three.AmbientLight(0x404040);
scene.add(ambientLight);

//Directional light for additional illumination
const directionLight = new Three.DirectionalLight(0xffffff, 0.5);
directionLight.position.set(10,10,10);
scene.add(directionLight);

//Spotlight
const spotLight = new Three.SpotLight(0xffffff, 3, 100, Math.PI/4, 0.5);
spotLight.position.set(0,25,0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001; 
scene.add(spotLight);

//Target Object for spotlight
const targetObject = new Three.Object3D();
targetObject.position.set(0,0,0);
scene.add(targetObject);
spotLight.target = targetObject;

//Background, which is an array of white pixels which is so clever
const backgroundGeometry = new Three.BufferGeometry();
const counts = 3000;

const positions = new Float32Array(counts * 3);

for (let i = 0; i <counts * 3; i++) {
  positions[i] = (Math.random() -0.5)*10; 
}

backgroundGeometry.setAttribute(
  'position',
  new Three.BufferAttribute(positions, 3)
);

const backgroundMaterial = new Three.PointsMaterial();
backgroundMaterial.size = 0.01;
backgroundMaterial.sizeAttenuation = true;

const background = new Three.Points(backgroundGeometry, backgroundMaterial);
scene.add(background);

//Loader for globe!
const loader = new GLTFLoader()
loader.setPath('/public/latlongglobe/');
loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  }); 

  mesh.position.set(0,0,0);
  scene.add(mesh);
});

camera.position.set(0,0,1);
camera.lookAt(0,0,0);

function animate () {
  requestAnimationFrame(animate);
  controls.update();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();


//////////////////////////////Excess code//////////////////////////////
//Cube
// const geometry = new Three.BoxGeometry()
// const material = new Three.MeshStandardMaterial({color: 0x702963});
// const cube = new Three.Mesh(geometry, material);
// scene.add(cube);

// camera.position.set(0,5,5);
// camera.lookAt(0,0,0);

// //Ground Plane
// const groundGeometry = new Three.PlaneGeometry(20, 20, 32, 32);
// groundMesh.castShadow = false; 
// groundMesh.recieveShadow = true;
// //This makes the plane be horizontal
// groundGeometry.rotateX(-Math.PI / 2);
// const groundMaterial = new Three.MeshStandardMaterial({
//   color: 0x555555,
//   side: Three.DoubleSide
// });

// const groundMesh = new Three.Mesh(groundGeometry, groundMaterial);
// scene.add(groundMesh);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

// // import ReactDOM from 'reacter-dom/client';
// import App from './App';

// ReactDOM.createRoot(document.getElementById('Root')).render(<App />);
