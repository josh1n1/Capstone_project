// ---------- IMPORT ----------
// Importing the Necessary Three.js Files
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// Importing the Planet Textures
import starsTexture from './img/stars.jpg';
import sunTexture from './img/sun.jpg';
import mercuryTexture from './img/mercury.jpg';
import venusTexture from './img/venus.jpg';
import earthTexture from './img/earth.jpg';
import marsTexture from './img/mars.jpg';
import jupiterTexture from './img/jupiter.jpg';
import saturnTexture from './img/saturn.jpg';
import saturnRingTexture from './img/saturn ring.png';
import uranusTexture from './img/uranus.jpg';
import uranusRingTexture from './img/uranus ring.png';
import neptuneTexture from './img/neptune.jpg';
import plutoTexture from './img/pluto.jpg';

const orbitRotation = document.getElementById("orbitRotation");
const viewPlanets = document.getElementById("viewPlanets");

// ---------- CANVAS ----------
// WebGLRenderer : Rendering high-performance within any compatible web browser
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// Appending it to the HTML Document
document.body.appendChild(renderer.domElement);

// ---------- SCENE ----------
const scene = new THREE.Scene();

// ---------- CAMERA ----------
const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
// Camera Control (Sets to Orbit)
const orbit = new OrbitControls(camera, renderer.domElement);
// Position of the Camera
camera.position.set(-90, 140, 170);
orbit.update();

// ---------- AMBIENT LIGHT ----------
const ambientLight = new THREE.AmbientLight(0x333333, 30);
scene.add(ambientLight);

// ---------- MESH ----------
// Background Stars
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

// Loads Textures
const textureLoader = new THREE.TextureLoader();

// Sun
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture) // Imports the sun texture to the shape
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);
//Sunlight
const sunLight = new THREE.PointLight(0xffffff, 25000, 0);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

//Planets' Functions
function createPlanete(size, texture, position, ring) {
    // Geometry Where they Rotate
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    // If the Planet has a Ring
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

// Planets
const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 900);
scene.add(pointLight);

function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

        // (For Future Edit) For the Orbit in which planet are rotating
        // const orbit=new THREE.RingGeometry(position,position)
        //     const orbitmaterial=new THREE.MeshBasicMaterial(
        //         {
        //             color: 0xaaaaaa, 
        //             wireframe: true,
        //             opacity: 0.5,
        //             transparent: true
        //         }
        //     )
        //     const orbitMesh=new THREE.Mesh(orbit,orbitmaterial)
        //     orbitMesh.rotation.x= -Math.PI/2
        //     planetMesh.add(orbit)
        //     scene.add(orbitMesh)