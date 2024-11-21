import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Load a texture for the planet
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('path/to/planet_texture.jpg'); // Replace with your texture path

// Create a material using the texture
const material = new THREE.MeshStandardMaterial({ map: texture });

// Create the planet mesh
const planet = new THREE.Mesh(geometry, material);
scene.add(planet);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the planet
  planet.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

