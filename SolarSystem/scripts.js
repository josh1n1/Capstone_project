import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

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

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture) // Imports the sun texture to the shape
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const sunLight = new THREE.PointLight(0xffffff, 25000, 0);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
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

const defaultPositions = {
    mercury: mercury.obj.position.clone(),
    venus: venus.obj.position.clone(),
    earth: earth.obj.position.clone(),
    mars: mars.obj.position.clone(),
    jupiter: jupiter.obj.position.clone(),
    saturn: saturn.obj.position.clone(),
    uranus: uranus.obj.position.clone(),
    neptune: neptune.obj.position.clone(),
    pluto: pluto.obj.position.clone()
};

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
        mercury.obj.rotateY(0.040);
        venus.obj.rotateY(0.035);
        earth.obj.rotateY(0.032);
        mars.obj.rotateY(0.025);
        jupiter.obj.rotateY(0.024);
        saturn.obj.rotateY(0.015);
        uranus.obj.rotateY(0.011);
        neptune.obj.rotateY(0.007);
        pluto.obj.rotateY(0.0045);
    };
    renderer.render(scene, camera);
}

function orbitPositions() {
    gsap.to(mercury.obj.position, {
        x: defaultPositions.mercury.x,
        y: defaultPositions.mercury.y,
        z: defaultPositions.mercury.z,
        duration: 2
    }); gsap.to(venus.obj.position, {
        x: defaultPositions.venus.x,
        y: defaultPositions.venus.y,
        z: defaultPositions.venus.z,
        duration: 2
    }); gsap.to(earth.obj.position, {
        x: defaultPositions.earth.x,
        y: defaultPositions.earth.y,
        z: defaultPositions.earth.z,
        duration: 2
    }); gsap.to(mars.obj.position, {
        x: defaultPositions.mars.x,
        y: defaultPositions.mars.y,
        z: defaultPositions.mars.z,
        duration: 2
    }); gsap.to(jupiter.obj.position, {
        x: defaultPositions.jupiter.x,
        y: defaultPositions.jupiter.y,
        z: defaultPositions.jupiter.z,
        duration: 2
    }); gsap.to(saturn.obj.position, {
        x: defaultPositions.saturn.x,
        y: defaultPositions.saturn.y,
        z: defaultPositions.saturn.z,
        duration: 2
    }); gsap.to(uranus.obj.position, {
        x: defaultPositions.uranus.x,
        y: defaultPositions.uranus.y,
        z: defaultPositions.uranus.z,
        duration: 2
    }); gsap.to(neptune.obj.position, {
        x: defaultPositions.neptune.x,
        y: defaultPositions.neptune.y,
        z: defaultPositions.neptune.z,
        duration: 2
    }); gsap.to(pluto.obj.position, {
        x: defaultPositions.pluto.x,
        y: defaultPositions.pluto.y,
        z: defaultPositions.pluto.z,
        duration: 2
    }); 
}

function alignPlanets() {
    const planetDistance = 50;
    const numPlanets = 9;
    const angleStep = (2 * Math.PI) / numPlanets;

    gsap.to(mercury.obj.position, {
        x: Math.cos(0 * angleStep) * planetDistance,
        z: Math.sin(0 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
    gsap.to(venus.obj.position, {
        x: Math.cos(1 * angleStep) * planetDistance,
        z: Math.sin(1 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
    gsap.to(earth.obj.position, {
        x: Math.cos(2 * angleStep) * planetDistance,
        z: Math.sin(2 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
    gsap.to(mars.obj.position, {
        x: Math.cos(3 * angleStep) * planetDistance,
        z: Math.sin(3 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
    gsap.to(jupiter.obj.position, {
        x: Math.cos(4 * angleStep) * planetDistance,
        z: Math.sin(4 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
    gsap.to(saturn.obj.position, {
        x: Math.cos(5 * angleStep) * planetDistance,
        z: Math.sin(5 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
    gsap.to(uranus.obj.position, {
        x: Math.cos(6 * angleStep) * planetDistance,
        z: Math.sin(6 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
    gsap.to(neptune.obj.position, {
        x: Math.cos(7 * angleStep) * planetDistance,
        z: Math.sin(7 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
    gsap.to(pluto.obj.position, {
        x: Math.cos(8 * angleStep) * planetDistance,
        z: Math.sin(8 * angleStep) * planetDistance,
        duration: 2,
        ease: 'power1.out'
    });
}

// BUTTON FUNCTIONS
let orbitRotation = document.getElementById("orbitRotation");
let viewPlanets = document.getElementById("viewPlanets");
let orbitEnabled = true;
const solarDesc = document.getElementById("solar-desc");


function orbitFunction() {
    solarDesc.style.display = 'block';
    orbitEnabled = true;
    orbitPositions();
} orbitRotation.addEventListener('click', () => {
    orbitFunction();
});
function planetsFunction() {
    solarDesc.style.display = 'none';
    orbitEnabled = false;
    alignPlanets();
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
    orbitEnabled = false;
    planetsFunction();
});

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
