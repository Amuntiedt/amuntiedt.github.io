import React, { useEffect } from 'react';
import * as Three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const ThreeScene = () => {
  useEffect(() => {
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new Three.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = Three.PCFSoftShadowMap;
    
    const container = document.getElementById('three-container');
    container.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 13;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = 3;
    controls.autoRotate = false;
    controls.target = new Three.Vector3(0, 0, 0);
    controls.update();
    
    const ambientLight = new Three.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionLight = new Three.DirectionalLight(0xffffff, 0.5);
    directionLight.position.set(10, 10, 10);
    scene.add(directionLight);
    
    const spotLight = new Three.SpotLight(0xffffff, 3, 100, Math.PI / 4, 0.5);
    spotLight.position.set(0, 25, 0);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    scene.add(spotLight);
    
    const targetObject = new Three.Object3D();
    targetObject.position.set(0, 0, 0);
    scene.add(targetObject);
    spotLight.target = targetObject;
    
    const backgroundGeometry = new Three.BufferGeometry();
    const counts = 3000;
    const positions = new Float32Array(counts * 3);
    for (let i = 0; i < counts * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    backgroundGeometry.setAttribute('position', new Three.BufferAttribute(positions, 3));
    const backgroundMaterial = new Three.PointsMaterial({ size: 0.01, sizeAttenuation: true });
    const background = new Three.Points(backgroundGeometry, backgroundMaterial);
    scene.add(background);
    
    const loader = new GLTFLoader();
    loader.setPath('/public/latlongglobe/');
    loader.load('scene.gltf', (gltf) => {
      const mesh = gltf.scene;
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
    });
    
    camera.position.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);
  
  return <div id="three-container" style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;
