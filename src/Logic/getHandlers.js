import * as THREE from 'three';
import { gsap } from "gsap/gsap-core";
import { getData } from "../Data/getData.js";


export function getHandlers( scene, camera, renderer, controls, toSwitch ) {
    const canvas = renderer.domElement;

    //BUTTONS------------------/
    // Initialization----------/
    const sunHover = document.getElementById('sun');
    const mercuryHover = document.getElementById('mercury');
    const venusHover = document.getElementById('venus');
    const earthHover = document.getElementById('earth');
    const marsHover = document.getElementById('mars');
    const jupiterHover = document.getElementById('jupiter');
    const saturnHover = document.getElementById('saturn');
    const uranusHover = document.getElementById('uranus');
    const neptuneHover = document.getElementById('neptune');

    const planets = {
        earthHover: "Earth"
    }

    const container = document.getElementById('container');

    // Function ---------------/
    function showPlanetName(name, position) {
        const vector = new THREE.Vector3();
        vector.setFromMatrixPosition(planetPosition);
        vector.project(camera);

        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

        container.innerText = name;
        container.style.top = `${y}px`;
        container.style.left = `${x}px`;
        container.style.display = 'block';
    }
    function hidePlanetName() {
        container.style.display = 'none';
    }

    // Hover Listeners---------/

    sunHover.addEventListener('mouseover', () => {
        const name= planets.sunHover;
        const planet = scene.getObjectByName(name);
        if (planet) {
            showPlanetName(name, planet.matrixWorld);
        }
    }); earthHover.addEventListener('mouseover', hidePlanetName);

    // Button Listeners--------/

    //PLANET DETECTION---------/
    // Initialization----------/
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const info = document.getElementById( 'solar-desc' );

    // Camera Position---------/
    const originalCameraPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    
    
    canvas.addEventListener('click', ( event ) => {
        // Return if Resumed---/
        if (toSwitch) return;    // Return if the animation is not paused

        // Calculate mouse position in normalized device coordinates (-1 to +1)--/
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Setting Raycaster---/
        raycaster.setFromCamera(mouse, camera);

        // Find Intersects-----/
        const system = scene.getObjectByName('system');
        const intersects = raycaster.intersectObjects(system.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            // Finding Planet--/
            let planet = clickedObject;
            // Excluding Scene-/
            while (planet.parent !== scene && planet.parent !== null) {
                planet = planet.parent;
            }

            // Get the planet's name (assuming the name matches the key in planetData)
            const planetName = planet.name?.toLowerCase() || "sun";

            // Get Planet Data-/
            const data = getData[planetName] || {
                name: "Unknown",
                size: "N/A",
                distance: "N/A",
                description: "No information available.",
            };

            // Display information
            const name = planet.name || "Unknown";
            const size = planet.geometry?.parameters?.radius || "N/A";
            const distance = planet.distance || "N/A";

            info.innerHTML = `
                <h3>${name}</h3>
                <p>Size: ${size}</p>
                <p>Distance from Sun: ${distance}</p>
                <p>Description: ${data.description}</p>
            `;
            info.style.display = 'block';

            // Move the camera closer to the planet using GSAP
            const targetPosition = {
                x: planet.position.x,
                y: planet.position.y,
                z: planet.position.z + 5, // Adjust the distance as needed
            };

            gsap.to(camera.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 1, // Animation duration in seconds
                ease: "power2.out", // Easing function
                onUpdate: () => {
                    controls.update(); // Update controls during the animation
                },
            });

            // Add a button to reset the camera position
            const resetButton = document.createElement('button');
            resetButton.innerText = 'Reset Camera';
            resetButton.style.marginTop = '10px';
            resetButton.addEventListener('click', () => {
                gsap.to(camera.position, {
                    x: originalCameraPosition.x,
                    y: originalCameraPosition.y,
                    z: originalCameraPosition.z,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => {
                        controls.update(); // Update controls during the animation
                    },
                });
                resetButton.remove(); // Remove the reset button after use
            });

            info.appendChild(resetButton);
        } else {
            info.style.display = 'none';
        }
    });
}