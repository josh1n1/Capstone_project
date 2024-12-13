import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import starsTexture from './textures/stars.jpg';
import sunTexture from './textures/sun.jpg';
import mercuryTexture from './textures/mercury.jpg';
import venusTexture from './textures/venus.jpg';
import earthTexture from './textures/earth.jpg';
import marsTexture from './textures/mars.jpg';
import jupiterTexture from './textures/jupiter.jpg';
import saturnTexture from './textures/saturn.jpg';
import saturnRingTexture from './textures/saturn ring.png';
import uranusTexture from './textures/uranus.jpg';
import uranusRingTexture from './textures/uranus ring.png';
import neptuneTexture from './textures/neptune.jpg';
import plutoTexture from './textures/pluto.jpg';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 170);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333, 30);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.IcosahedronGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const sunLight = new THREE.PointLight(0xffffff, 25000, 0);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// DECLARING PLANETS
function isPlanetAttributes(size = 1, texture = '', ring = '', moon = '') {
    const planetGroup = new THREE.Group();
    const planetGeo = new THREE.IcosahedronGeometry(size, 30, 30);
    const planetMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    }); const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        }); const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetGroup.add(ringMesh);
    } if(moon) {
        const moonGeo = new THREE.IcosahedronGeometry(1, 30, 30);
        const moonMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(texture)
        }); const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.posiiton.x = Math.cos(startAngle) * distance;
        moonMesh.position.z = Math.sin(startAngle) * distance;
        planetGroup.add(moonMesh);
    }scene.add(planetGroup);
    return {planetMesh, planetGroup}
}

function animate() {
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
    if (orbitEnabled) {
        orbit.minPolarAngle = 0;
        orbit.maxPolarAngle = Math.PI;
        orbit.enableZoom = true;
        mercury.planetGroup.rotateY(0.040);
        venus.planetGroup.rotateY(0.035);
        earth.planetGroup.rotateY(0.032);
        mars.planetGroup.rotateY(0.025);
        jupiter.planetGroup.rotateY(0.024);
        saturn.planetGroup.rotateY(0.015);
        uranus.planetGroup.rotateY(0.011);
        neptune.planetGroup.rotateY(0.007);
        pluto.planetGroup.rotateY(0.0045);
    };
    renderer.render(scene, camera);
}

// mercury = isOrbit
// ORBIT ROTATION : For Position of Planet in the Invisible Center
function isOrbitPosition() {
    const mercuryObj = new THREE.Object3D();
    const venusObj = new THREE.Object3D();
    const earthObj = new THREE.Object3D();
    const marsObj = new THREE.Object3D();
    const jupiterObj = new THREE.Object3D();
    const saturnObj = new THREE.Object3D();
    const uranusObj = new THREE.Object3D();
    const neptuneObj = new THREE.Object3D();
    const plutoObj = new THREE.Object3D();

    mercuryObj.add(mercury.planetGroup);
    venusObj.add(venus.planetGroup);
    earthObj.add(earth.planetGroup);
    marsObj.add(mars.planetGroup);
    jupiterObj.add(jupiter.planetGroup);
    saturnObj.add(saturn.planetGroup);
    uranusObj.add(uranus.planetGroup);
    neptuneObj.add(neptune.planetGroup);
    plutoObj.add(pluto.planetGroup);

    mercury.planetGroup.position.x = 28;
    venus.planetGroup.position.x = 44;
    earth.planetGroup.position.x = 62;
    mars.planetGroup.position.x = 78;
    jupiter.planetGroup.position.x = 100;
    saturn.planetGroup.position.x = 138;
    uranus.planetGroup.position.x = 176;
    neptune.planetGroup.position.x = 200;
    pluto.planetGroup.position.x = 216;
} // ORBIT ROTATION : For Rotation of the Orbit
function isOrbitRotation() {
    mercury.mercuryObj.rotateY(0.040);
    venus.venusObj.rotateY(0.035);
    earth.earthObj.rotateY(0.032);
    mars.marsObj.rotateY(0.025);
    jupiter.jupiterObj.rotateY(0.024);
    saturn.saturnObj.rotateY(0.015);
    uranus.uranusObj.rotateY(0.011);
    neptune.neptuneObj.rotateY(0.007);
    pluto.plutoObj.rotateY(0.0045);
}
function isInformation(info) {
    if (info == 'solarInfo') {

    } else if (info == 'mercuryInfo') {

    } else if (info == 'venusInfo') {

    } else if (info == 'earthInfo') {

    }
}

// (ORBIT ROTATION) Planets
// function isOrbittingPlanets(size, texture, position, ring) {
//     const geo = new THREE.SphereGeometry(size, 30, 30);
//     const mat = new THREE.MeshStandardMaterial({
//         map: textureLoader.load(texture)
//     });
//     const mesh = new THREE.Mesh(geo, mat);
//     const obj = new THREE.Object3D();
//     obj.add(mesh);
//     if(ring) {
//         const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
//         const ringMat = new THREE.MeshStandardMaterial({
//             map: textureLoader.load(ring.texture),
//             side: THREE.DoubleSide
//         });
//         const ringMesh = new THREE.Mesh(ringGeo, ringMat);
//         obj.add(ringMesh);
//         ringMesh.position.x = position;
//         ringMesh.rotation.x = -0.5 * Math.PI;
//     }
//     scene.add(obj);
//     mesh.position.x = position;
//     obj.originalPosition = position;
//     return {mesh, obj}
// }

let mercury = isPlanetAttributes({size: 3.2, texture: mercuryTexture}); // 28
let venus = isPlanetAttributes({size: 5.8, texture: venusTexture}); // 44
let earth = isPlanetAttributes({size: 6, earthTexture}); // 62
let mars = isPlanetAttributes({size: 4, texture: marsTexture}); // 78
let jupiter = isPlanetAttributes({size: 12, texture: jupiterTexture}); // 100
let saturn = isPlanetAttributes({size: 10, texture: saturnTexture}
    // , {
    // innerRadius: 10,
    // outerRadius: 20,
    // texture: saturnRingTexture}
); // 138
let uranus = isPlanetAttributes({size: 7, texture: uranusTexture}
    // , {
    // innerRadius: 7,
    // outerRadius: 12,
    // texture: uranusRingTexture}
); // 176
let neptune = isPlanetAttributes({size: 7, texture: neptuneTexture}); // 200
let pluto = isPlanetAttributes({size: 2.8, texture: plutoTexture}); // 216

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 900);
scene.add(pointLight);

function resetPlanetPositions() {
        gsap.to(mercury.mesh.position, {
            x: planet.obj.originalPosition,
            y: 0,
            z: 0,
            duration: 2
        });
}

// BUTTON FUNCTIONS
let orbitRotation = document.getElementById("orbitRotation");
let viewPlanets = document.getElementById("viewPlanets");
let orbitEnabled = true;
const solarSystemInfo = document.getElementById("solar-desc");
let orbitRotationClicked = true;
let viewPlanetsClicked = false;

// BUTTON INPUT
if (orbitRotationClicked) {
    isOrbitPosition();
    isOrbitRotation();
    isInformation(solarInfo)
    renderer.setAnimationLoop(isOrbitRotation);
} else if (viewPlanetsClicked) {

}
function orbitFunction() {
    solarDesc.style.display = 'block';
    orbitEnabled = true;
} orbitRotation.addEventListener('click', () => {
    orbitRotationClicked = true;
});
function planetsFunction() {
    solarDesc.style.display = 'none';
    orbit.enableZoom = false;
    orbit.update();
    gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 170,
        duration: 5,
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      });
    orbit.minPolarAngle = Math.PI / 2;
    orbit.maxPolarAngle = Math.PI / 2;
} viewPlanets.addEventListener('click', () => {
    orbitRotationClicked = false;
});

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
