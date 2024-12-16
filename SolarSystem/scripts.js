import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import getSun from './src/getSun.js'
import getStarfield from './src/getStarfield.js';
import getNebula from './src/getNebula.js';
import getPlanet from './src/getPlanet.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 1000);
camera.position.set(0, 2.5, 4);
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

function initScene() {
    const starField = getStarfield({numStars: 10000, size: 0.50});
    scene.add(starField);

    const dirLight = new THREE.DirectionalLight(0x0099ff, 1);
    dirLight.position.set(0, 1, 0);
    scene.add(dirLight);

    const nebula1 = getNebula({
        hue: 0.6,
        numSprites: 10,
        opacity: 0.2,
        radius: 40,
        size: 80,
        z: -50.5,
    }); scene.add(nebula1);
    const nebula2 = getNebula({
        hue: 0.0,
        numSprites: 10,
        opacity: 0.2,
        radius: 40,
        size: 80,
        z: 50.5,
    });
    scene.add(nebula2);

    const solarSystem = new THREE.Group();
    solarSystem.userData.update = (t) => {
        solarSystem.children.forEach((child) => {
            child.userData.update?.(t);
        });
    }; scene.add(solarSystem);

    const sun = getSun();
    solarSystem.add(sun);

    const mercury = getPlanet({ size: 0.1, distance: 1.25, img: 'mercurytex.jpg' });
    solarSystem.add(mercury);

    const venus = getPlanet({ size: 0.2, distance: 1.65, img: 'venustex.jpg' });
    solarSystem.add(venus);

    const moon = getPlanet({ size: 0.075, distance: 0.4, img: 'moontex.png' });
    const earth = getPlanet({ children: [moon], size: 0.225, distance: 2.0, img: 'earthtex.jpg' });
    solarSystem.add(earth);

    const mars = getPlanet({ size: 0.15, distance: 2.25, img: 'marstex.jpg' });
    solarSystem.add(mars);

    const jupiter = getPlanet({ size: 0.4, distance: 2.75, img: 'jupitertex.jpg' });
    solarSystem.add(jupiter);

    const sRingGeo = new THREE.TorusGeometry(0.6, 0.15, 8, 64);
    const sRingMat = new THREE.MeshStandardMaterial();
    const saturnRing = new THREE.Mesh(sRingGeo, sRingMat);
    saturnRing.scale.z = 0.1;
    saturnRing.rotation.x = Math.PI * 0.5;
    const saturn = getPlanet({ children: [saturnRing], size: 0.35, distance: 3.25, img: 'saturntex.jpg' });
    solarSystem.add(saturn);

    const uRingGeo = new THREE.TorusGeometry(0.5, 0.05, 8, 64);
    const uRingMat = new THREE.MeshStandardMaterial();
    const uranusRing = new THREE.Mesh(uRingGeo, uRingMat);
    uranusRing.scale.z = 0.1;
    const uranus = getPlanet({ children: [uranusRing], size: 0.3, distance: 3.75, img: 'uranustex.jpg' });
    solarSystem.add(uranus);

    const neptune = getPlanet({ size: 0.3, distance: 4.25, img: 'neptunetex.jpg' });
    solarSystem.add(neptune);

    function animate (t = 0) {
        const time = t * 0.0002;
        requestAnimationFrame(animate);
        solarSystem.userData.update(time);
        renderer.render(scene, camera);
        controls.update();
    } animate();
}

initScene();

const ambientLight = new THREE.AmbientLight(0x333333, 2);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
