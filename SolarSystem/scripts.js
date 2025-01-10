import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import getSun from './src/getSun.js'
import getStarfield from './src/getStarfield.js';
import getNebula from './src/getNebula.js';
import getPlanet from './src/getPlanet.js';

// Three.js Boilerplate
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

// Create the info display element
const createSolarDesc = () => {
    let solarDesc = document.getElementById("solar-desc");
    if (!solarDesc) {
        solarDesc = document.createElement('div');
        solarDesc.id = 'solar-desc';
        solarDesc.style.position = 'fixed';
        solarDesc.style.top = '20px';
        solarDesc.style.right = '20px';
        solarDesc.style.padding = '20px';
        solarDesc.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        solarDesc.style.color = 'white';
        solarDesc.style.borderRadius = '10px';
        solarDesc.style.display = 'none';
        solarDesc.style.zIndex = '1000';
        document.body.appendChild(solarDesc);
    }
    return solarDesc;
};

// Initialize the solar-desc element
const solarDesc = createSolarDesc();

// Setup raycaster for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mesh Objects
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
    z: -50.5
}); 
scene.add(nebula1);

const nebula2 = getNebula({ 
    hue: 0.0, 
    numSprites: 10, 
    opacity: 0.2, 
    radius: 40, 
    size: 80, 
    z: 50.5
}); 
scene.add(nebula2);

const solarSystem = new THREE.Group();
solarSystem.userData.update = (t) => {
    solarSystem.children.forEach((child) => {
        child.userData.update?.(t);
    });
}; 
scene.add(solarSystem);

const sun = getSun();
solarSystem.add(sun);

const planets = [];

// Create planet objects
const mercury = getPlanet({ size: 0.1, distance: 1.25, img: 'mercurytex.jpg' });
const venus = getPlanet({ size: 0.2, distance: 1.65, img: 'venustex.jpg' });
const moon = getPlanet({ size: 0.075, distance: 0.4, img: 'moontex.png' });
const earth = getPlanet({ children: [moon], size: 0.225, distance: 2.0, img: 'earthtex.jpg' });
const mars = getPlanet({ size: 0.15, distance: 2.25, img: 'marstex.jpg' });
const jupiter = getPlanet({ size: 0.4, distance: 2.75, img: 'jupitertex.jpg' });

// Saturn with rings
const sRingGeo = new THREE.TorusGeometry(0.6, 0.15, 8, 64);
const sRingMat = new THREE.MeshStandardMaterial();
const saturnRing = new THREE.Mesh(sRingGeo, sRingMat); 
saturnRing.scale.z = 0.1; 
saturnRing.rotation.x = Math.PI * 0.5;
const saturn = getPlanet({ children: [saturnRing], size: 0.35, distance: 3.25, img: 'saturntex.jpg' });

// Uranus with rings
const uRingGeo = new THREE.TorusGeometry(0.5, 0.05, 8, 64);
const uRingMat = new THREE.MeshStandardMaterial();
const uranusRing = new THREE.Mesh(uRingGeo, uRingMat); 
uranusRing.scale.z = 0.1;
uranusRing.rotation.x = Math.PI * 0.5;
const uranus = getPlanet({ children: [uranusRing], size: 0.3, distance: 3.75, img: 'uranustex.jpg' });

const neptune = getPlanet({ size: 0.3, distance: 4.25, img: 'neptunetex.jpg' });

// Planet data for information display
const planetData = {
    mercury: { name: "Mercury", description: "The smallest planet in our solar system.", distance: "57.91 million km" },
    venus: { name: "Venus", description: "Second planet from the Sun, known as Earth's twin.", distance: "108.2 million km" },
    earth: { name: "Earth", description: "Our home planet and the only one known to support life.", distance: "149.6 million km" },
    mars: { name: "Mars", description: "Known as the Red Planet due to its reddish appearance.", distance: "227.9 million km" },
    jupiter: { name: "Jupiter", description: "The largest planet in our solar system.", distance: "778.5 million km" },
    saturn: { name: "Saturn", description: "Famous for its stunning ring system.", distance: "1.429 billion km" },
    uranus: { name: "Uranus", description: "An ice giant with a unique sideways rotation.", distance: "2.871 billion km" },
    neptune: { name: "Neptune", description: "The farthest planet from the Sun.", distance: "4.495 billion km" },
};

// Click event handler
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planets, true);
    if (intersects.length > 0) {
        let planetObject = intersects[0].object;
        while (planetObject && !planetData[planetObject.name]) {
            planetObject = planetObject.parent;
        }

        if (planetObject && planetData[planetObject.name]) {
            const data = planetData[planetObject.name];
            solarDesc.style.display = 'block';
            solarDesc.innerHTML = `
                <h3>${data.name}</h3>
                <p>${data.description}</p>
                <p><strong>Distance from Sun:</strong> ${data.distance}</p>
            `;
        }
    } else {
        solarDesc.style.display = 'none';
    }
});

// Set planet names
mercury.name = "mercury";
venus.name = "venus";
earth.name = "earth";
mars.name = "mars";
jupiter.name = "jupiter";
saturn.name = "saturn";
uranus.name = "uranus";
neptune.name = "neptune";

// Add planets to the scene
planets.push(mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);
planets.forEach((planet) => solarSystem.add(planet));

// Rotation controls
let rotate = true;
let lastTime = 0;

function setRotationState(isRotating) {
    rotate = isRotating;
    
    if (isRotating) {
        // When starting rotation, update lastTime to current time
        // This prevents a sudden jump in position
        lastTime = performance.now() * 0.0002;
    }
    
    planets.forEach((planet) => {
        if (isRotating) {
            // Store current position before starting rotation
            planet.userData.lastPosition = {
                x: planet.position.x,
                y: planet.position.y,
                z: planet.position.z
            };
            planet.userData.startRotation?.();
        } else {
            planet.userData.stopRotation?.();
        }
    });
}

// Event listeners for rotation controls
document.getElementById("orbitRotation")?.addEventListener('click', () => {
    setRotationState(true);
});

document.getElementById("viewPlanets")?.addEventListener('click', () => {
    setRotationState(false);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0x333333, 2);
scene.add(ambientLight);

// Update animation loop
function animate(t = 0) {
    const time = rotate ? t * 0.0002 : lastTime;
    requestAnimationFrame(animate);
    
    if (rotate) {
        solarSystem.userData.update(time);
    }
    
    renderer.render(scene, camera);
    controls.update();
} 
animate();

// Window resize handler
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});